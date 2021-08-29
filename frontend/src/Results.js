import { Button, Col } from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";

import ResultTable from "./ResultTable";
import AnimalEmoji from "./AnimalEmoji";

import { xcode } from "react-syntax-highlighter/dist/esm/styles/hljs";
import "./Question.css";


/** Show results are for query.
 *
 * - expected: expected results (if not showing, this will be empty)
 * - setShowingExpected: fn to call to show expected output
 * - results: {rows, cols, problems}
 * - solution: shown after successful submit
 *
 * Question -> Results -> {AnimalEmoji, ResultTable, ResultTable}
 *
 */

function Results({ expected, setShowingExpected, results, solution }) {
  function showProblem() {
    return (
        <>
          <p className="fs-3 pt-3">
            <AnimalEmoji emoji="😿" className="fs-1" />
            &nbsp; { results.problems }
          </p>
          { !expected &&
          <Button
              variant="outline-secondary"
              size="sm"
              onClick={ () => setShowingExpected(true) }>
            Show expected data
          </Button>
          }
        </>
    );
  }

  function showSuccess() {
    return (
        <p className="fs-3 pt-3">
          <AnimalEmoji className="fs-1" />
          &nbsp; Well done! Congratulations!
        </p>
    );
  }

  return (
      <Col className="Question-results" lg={ 6 }>

        <ResultTable rows={ results.rows } cols={ results.cols } />

        { results.problems ? showProblem() : showSuccess() }

        { expected &&
        <ResultTable rows={ expected.rows } cols={ expected.cols } />
        }

        { !results.problems &&
        <div>Our solution was:
          <p className="small border mt-2 mb-0 pb-0 Question-solution">
            <SyntaxHighlighter
                language="pgsql"
                style={ xcode }
                children={ solution.trim() } />
          </p>
        </div>
        }

      </Col>
  );
}

export default Results;