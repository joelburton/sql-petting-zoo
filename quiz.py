from __future__ import annotations

import os
from dataclasses import dataclass
from pprint import pprint
from typing import Any, Dict, List

import psycopg2
import psycopg2.extensions
from psycopg2 import extensions

import yaml

# noinspection PyUnresolvedReferences
decToFloat = psycopg2.extensions.new_type(
    psycopg2.extensions.DECIMAL.values,
    'DEC2TEXT',
    lambda value, curs: str(value) if value is not None else "")
psycopg2.extensions.register_type(decToFloat, None)


@dataclass
class Quiz:
    """A quiz: questions for users to solve."""

    quizzes = {}

    id: str
    title: str
    description: str
    closed: bool
    questions: Dict[str, Dict]
    filepath: str
    db_name: str
    schema: str = ""

    _expected_attached: bool = False

    @classmethod
    def load_all(cls, dir_path: str) -> Dict[str: Quiz]:
        """Get all quizzes in directory and return {id: quiz}."""

        for fname in sorted(os.listdir(dir_path)):
            if fname.endswith(".yaml"):
                quiz = cls.load_quiz(fname)
                cls.quizzes[quiz.id] = quiz
        return cls.quizzes

    @classmethod
    def load_quiz(cls, filepath: str) -> Quiz:
        """Get quiz from YAML file and return new instance."""

        with open(filepath) as f:
            quiz_data = yaml.safe_load(f)
        quiz_data['filepath'] = filepath
        quiz = cls(**quiz_data)
        quiz.attach_expected()
        return quiz

    def attach_expected(self) -> None:
        """Run quiz answers and get expected outcome."""

        # Non-closed quizzes contain actual solution SQL in json, so we can
        # calculate the expected output and not embed it in the json. Closed
        # quizzes do not have this.

        if not self.closed:
            with psycopg2.connect(f"dbname={self.db_name}") as conn:
                with conn.cursor() as cur:
                    for question in self.questions.values():
                        cur.execute(question['solution'])
                        cols = [c.name for c in cur.description]
                        rows = cur.fetchall()
                        question['expected'] = {"cols": cols, "rows": rows}

        self._expected_attached = True

    def get_problems(self, id: str, output: Dict[str, list]) -> Any:
        """Compare student output to expected."""

        answer = self.questions[id]["expected"]

        num_cols = len(answer["cols"])
        num_cols_got = len(output["cols"])

        num_rows = len(answer["rows"])
        num_rows_got = len(output["rows"])

        if num_cols_got != num_cols:
            return f"Expected {num_cols} columns, but got {num_cols_got}."
        if num_rows_got != num_rows:
            return f"Expected {num_rows} rows, but got {num_rows_got}."
        if answer["rows"] != output["rows"]:
            return f"The output isn't right."
        return ""

    def export_closed_quiz(self, filename: str) -> None:
        """Export YAML of quiz w/expected but no solutions."""

        self.closed = True
        del self.filepath

        for question in self.questions.values():
            if 'solution' in question:
                del question['solution']

        quiz = dict(
            title=self.title,
            description=self.description,
            questions=self.questions,
            closed=self.closed,
        )

        with open(filename, "w") as f:
            yaml.dump(quiz, f)
