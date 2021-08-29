import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Markdown from "react-remarkable";
import "./Question.css";

import { submitSql } from "./api";

import SqlEditor from "./SqlEditor";

import { HAS_SEEN, NEVER_SEEN, NOW_SHOWING } from "./globals";
import Results from "./Results";

/** Question in a quiz.
 *
 * @param quizId {string}
 * @param q: Question {title, body, initial, solution}
 * @param idx: ordinal number of question
 *
 */

function Question({ quizId, q, questionId, toggleSchema, prev }) {
  const [results, setResults] = useState(null);
  const [showingHint, setShowingHint] = useState(prev.showingHint);
  const [showingSolution, setShowingSolution] = useState(prev.showingSolution);
  const [solved, setSolved] = useState(prev.solved);
  const [showingExpected, setShowingExpected] = useState(false);

  function updateLS(changeObj) {
    const newLS = JSON.parse(localStorage.getItem(quizId));
    newLS[questionId] = { ...newLS[questionId], ...changeObj };
    console.log("updateLS", changeObj, newLS);
    localStorage.setItem(quizId, JSON.stringify(newLS));
  }

  async function submit(sql) {
    const { rows, cols, problems } = await submitSql(quizId, questionId, sql);
    setShowingExpected(false);
    setResults({ rows, cols, problems });
    if (!problems) {
      if (showingSolution === NEVER_SEEN || solved) {
        setSolved(true);
        updateLS({ solved: true, sql });
      } else {
        updateLS({ solved: false, sql: "(looked at solution)" });
      }
    }
  }

  function toggleHint() {
    if (showingHint === NOW_SHOWING) {
      setShowingHint(HAS_SEEN);
    } else {
      setShowingHint(NOW_SHOWING);
      updateLS({ showingHint: HAS_SEEN });
    }
  }

  function toggleSolution() {
    if (showingSolution === NOW_SHOWING) {
      setShowingSolution(HAS_SEEN);
      return;
    }
    setShowingSolution(NOW_SHOWING);
    updateLS({ showingSolution: HAS_SEEN });
    return q.solution;
  }


  return (
    <div className="Question row mt-5">
      <Col lg={ 6 }>
        <h3>
          { solved && <span className="me-1">✅</span> }
          { q.title }
        </h3>
        <Markdown children={ q.body } />
        <SqlEditor
          initial={ q.initial }
          submit={ submit }
          toggleHint={ q.hint && toggleHint }
          showingHint={ showingHint }
          toggleSolution={ q.solution && toggleSolution }
          showingSolution={ showingSolution }
          toggleSchema={ toggleSchema }
        />
        {
          showingHint === NOW_SHOWING &&
          <Markdown className="mt-3" children={ q.hint } />
        }
      </Col>
      { results && <Results
        expected={ showingExpected && q.expected }
        results={ results }
        solution={ q.solution }
        setShowingExpected={ setShowingExpected }
      />
      }
    </div>
  );
}

export default Question;