import { submitSql } from "./api";
import { HAS_SEEN, NEVER_SEEN, NOW_SHOWING } from "./globals";

import { useState } from "react";
import { Col } from "react-bootstrap";
import Markdown from "react-remarkable";

import SqlEditor from "./SqlEditor";
import Results from "./Results";

import "./Question.css";


/** Question in a quiz.
 *
 * - quizId
 * - q: Question {title, body, initial, solution}
 * - questionId
 * - toggleSchema: fn that will toggle schema display on/off
 * - prev: from localStorage, previous interactions with this question
 *     (see explanation in PettingZoo)
 *
 * Quiz -> Question -> {SqlEditor, Results}
 *
 */

function Question({ quizId, question, questionId, toggleSchema, prev }) {
  // results is null until submitted to server, then will be
  //   {rows, cols, problems}
  const [results, setResults] = useState(null);

  // three-way state for never-seen/not-seeing/currently-seeing hints/solutions
  //   (is synced to localStorage)
  const [showingHint, setShowingHint] = useState(prev.showingHint);
  const [showingSolution, setShowingSolution] = useState(prev.showingSolution);

  // did user solve this without peeking? (is synced to localStorage)
  const [solved, setSolved] = useState(prev.solved);

  // are they currently viewing the expected outcome of query?
  const [showingExpected, setShowingExpected] = useState(false);

  /** Update localStorage for this question in quiz.
   *
   * - changeObj: properties to change
   *
   */

  function updateLocalStorage(changeObj) {
    const lsData = JSON.parse(localStorage.getItem(quizId));
    lsData[questionId] = { ...lsData[questionId], ...changeObj };
    localStorage.setItem(quizId, JSON.stringify(lsData));
  }

  /** Submit SQL to server and process results. */

  async function submitSqlToServer(sql) {
    // This will cause the results to disappear until the next load, which is
    // enough UX change for the user to know "something is happening".¡™
    setResults(null);
    const { rows, cols, problems } = await submitSql(quizId, questionId, sql);

    // Given that they just sent new SQL to server, hide the expected outcome
    //  (if they were even viewing it already)
    setShowingExpected(false);
    setResults({ rows, cols, problems });

    if (!problems) {
      if (showingSolution === NEVER_SEEN || solved) {
        setSolved(true);
        updateLocalStorage({ solved: true, sql });
      } else {
        updateLocalStorage({ solved: false, sql: "(peeked)" });
      }
    }
  }

  /** Toggle hint on/off and note that they've peeked at it. */

  function toggleHint() {
    if (showingHint === NOW_SHOWING) {
      setShowingHint(HAS_SEEN);
    } else {
      setShowingHint(NOW_SHOWING);
      updateLocalStorage({ showingHint: HAS_SEEN });
    }
  }

  /** Toggle solution on/off and note that they've peek at it.
   *
   * Returns the solution if they're viewing.
   *
   */

  function toggleSolution() {
    if (showingSolution === NOW_SHOWING) {
      setShowingSolution(HAS_SEEN);
      return;
    }
    setShowingSolution(NOW_SHOWING);
    updateLocalStorage({ showingSolution: HAS_SEEN });
    return question.solution;
  }


  return (
      <div className="Question row mt-5">
        <Col lg={ 6 }>
          <h3>
            { solved && <span className="me-1">✅</span> }
            { question.title }
          </h3>
          <Markdown children={ question.body } />

          <SqlEditor
              initial={ question.initial }
              submitSqlToServer={ submitSqlToServer }
              toggleHint={ question.hint && toggleHint }
              showingHint={ showingHint }
              toggleSolution={ question.solution && toggleSolution }
              showingSolution={ showingSolution }
              toggleSchema={ toggleSchema }
          />

          {
            showingHint === NOW_SHOWING &&
            <Markdown className="mt-3" children={ question.hint } />
          }
        </Col>

        { results && <Results
            expected={ showingExpected && question.expected }
            setShowingExpected={ setShowingExpected}
            results={ results }
            solution={ question.solution }
        />
        }
      </div>
  );
}

export default Question;