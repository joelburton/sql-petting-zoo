import React, { useState } from "react";
import Markdown from "react-remarkable";

import Question from "./Question";
import Schema from "./Schema";


function Quiz({ quizId, quiz, prev }) {
  const [showingSchema, setShowingSchema] = useState(false);

  function toggleSchema() {
    setShowingSchema(showing => !showing);
  }

  if (!quiz) return "err: no quiz?";

  return (
    <div className="Quiz">
      { showingSchema &&
      <Schema schema={ quiz.schema } toggleSchema={ toggleSchema } /> }
      <h1>{ quiz.title }</h1>
      <div className="lead"><Markdown children={ quiz.description } /></div>
      { Object.entries(quiz.questions).map(([id, q]) =>
        <Question
          key={ id }
          quizId={ quizId }
          questionId={ id }
          q={ q }
          prev={ prev[id] }
          toggleSchema={ toggleSchema } />,
      ) }
    </div>
  );
}

export default Quiz;