import { Link } from "react-router-dom";
import Markdown from "react-remarkable";

function Homepage({quizzes}) {
  return (
    <div className="Homepage">
      <h1>Welcome</h1>
      <p className="lead">
        Welcome to SQL Petting Zoo, the world's leading site for combining
        live SQL lessons with adorable animal emoji. This site is in beta, but
        you are welcome to explore it.
      </p>

      { Object.entries(quizzes).map(([id, quiz]) => (
        <div className="mt-5" key={id}>
          <h2><Link className="text-decoration-none" to={`/${id}/`}>{ quiz.title }</Link></h2>
          <Markdown children={quiz.description} />
        </div>
      )) }
    </div>
  );
}

export default Homepage;