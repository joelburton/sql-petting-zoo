import json
from typing import Dict

import psycopg2
# noinspection PyUnresolvedReferences
from psycopg2.errors import Error
from flask import Flask, Response, request
from flask_cors import CORS

from quiz import Quiz, DATABASE_URL

app = Flask(__name__)
CORS(app)

quizzes = Quiz.load_all(app.root_path)


@app.route("/api/")
def api_get() -> Response:
    """Get quizzes: {quizzes: [{title, body, questions, schema}]."""

    # An undocumented change in Flask is that jsonify now defaults to sorting
    # the keys of the output string. Our questions are in an order which should
    # be kept, so doing this ourselves. Do not "improve" this by changing it
    # to jsonify (or just returning an object, which modern Flask will
    # automatically jsonify).
    out_quizzes = {}

    for id, quiz in quizzes.items():
        out_quizzes[id] = {
            "id": id,
            "title": quiz.title,
            "description": quiz.description,
            "questions": quiz.questions,
            "schema": quiz.schema,
        }

    out = json.dumps({
        "quizzes": out_quizzes
    }, sort_keys=False)
    return Response(out, mimetype="application/json")


@app.route("/api/run/<quiz_id>/<question_id>/", methods=["POST"])
def api_run(quiz_id: str, question_id: str) -> Dict[str, str]:
    """Run SQL for quiz and return {results, problems}."""

    sql = request.json.get('sql')
    if not sql:
        return {
            "rows": [],
            "cols": [],
            "problems": f"You didn't send any SQL!",
        }

    quiz = quizzes[quiz_id]

    with psycopg2.connect(DATABASE_URL) as conn:
        with conn.cursor() as cur:
            try:
                # Mitigate DOS attacks/accidental terrible queries
                cur.execute("SET statement_timeout TO '100ms'")
                cur.execute(sql)
                cols = [c.name for c in cur.description or []]
                rows = cur.fetchall()
                outcome = {"cols": cols, "rows": rows}
                problems = quiz.get_problems(question_id, outcome)

            except Error as err:
                rows = [str(err)]
                cols = []
                problems = f"Ut oh! An error happened."
        # print("why not", quiz.questions[question_num]["expected"], outcome)

    # results = render_template("_results.html", cols=cols, rows=rows)
    return {
        # "results": results,
        "rows": rows,
        "cols": cols,
        "problems": problems,
    }


if __name__ == '__main__':
    app.run()
