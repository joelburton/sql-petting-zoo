import React, { useState } from "react";
import Markdown from "react-remarkable";

import Question from "./Question";
import Schema from "./Schema";


/** Quiz.
 *
 * - quizId
 * - quiz {title, description, questions}
 * - prev: from localStorage (see note in PettingZoo)
 *
 * PettingZoo -> "/:quizId/" -> Quiz -> {Schema, Question}
 *
 */

function Quiz({ quizId, quiz, prev }) {
  const [showingSchema, setShowingSchema] = useState(false);

  function toggleSchema() {
    setShowingSchema(showing => !showing);
  }

  if (!quiz) return "No such quiz!";

  return (
      <div className="Quiz">
        { showingSchema &&
        <Schema schema={ quiz.schema } toggleSchema={ toggleSchema } /> }
        <h1>{ quiz.title }</h1>
        <div className="lead"><Markdown children={ quiz.description } /></div>
        { Object.entries(quiz.questions).map(([id, question]) =>
            <Question
                key={ id }
                quizId={ quizId }
                questionId={ id }
                question={ question }
                prev={ prev[id] }
                toggleSchema={ toggleSchema } />,
        ) }
      </div>
  );
}

export default Quiz;