import "./App.css";
import Quiz from "./Quiz";
import { Redirect, Route, Switch } from "react-router-dom";
import { useEffect, useState } from "react";
import { NEVER_SEEN } from "./globals";
import SiteNavbar from "./SiteNavbar";
import { Container } from "react-bootstrap";
import SiteFooter from "./SiteFooter";
import { getQuizzes } from "./api";
import Homepage from "./Homepage";
import AnimalEmoji from "./AnimalEmoji";

function PettingZoo() {
  const [quizzes, setQuizzes] = useState(null);

  useEffect(function fetchDataForQuiz() {
      async function doFetch() {
        const response = await getQuizzes();
        console.log(response.data);
        const { quizzes } = response.data;

        for (let quizId in quizzes) {
          setupLocalStorage(quizId, quizzes[quizId]);
        }
        setQuizzes(quizzes);
      }

      // noinspection JSIgnoredPromiseFromCall
      doFetch();
    }, [],
  );

  function setupLocalStorage(quizId, quiz) {
    // set up prevResults w/either what's there or starter state
    let prevResults = JSON.parse(localStorage.getItem(quizId)) || {};
    for (let questionId in quiz.questions) {
      if (prevResults[questionId] === undefined) {
        prevResults[questionId] = {
          solved: false,
          sql: null,
          showingHint: NEVER_SEEN,
          showingSolution: NEVER_SEEN,
        };
      }
    }
    localStorage.setItem(quizId, JSON.stringify(prevResults));
  }

  if (!quizzes) return (
    <div
      className="d-flex flex-column min-vh-100 justify-content-center align-items-center fs-2">
      <AnimalEmoji className="fs-1" /> Loading&hellip;
    </div>
  );

  return (
    <div className="PettingZoo">
      <SiteNavbar quizzes={ quizzes } />
      <Container>
        <Switch>
          <Route path="/" exact><Homepage quizzes={ quizzes || {} } /></Route>
          <Route path="/:quizId/" exact render={ routeProps => {
            const id = routeProps.match.params.quizId;
            const prev = JSON.parse(localStorage.getItem(id));
            // console.log("Route", id, JSON.parse(localStorage.getItem("world")), prev, quizzes, quizzes[id]);
            return <Quiz quizId={ id } quiz={ quizzes[id] } prev={ prev } />;
          } }
          />
          <Redirect to="/"></Redirect>
        </Switch>
      </Container>
      <SiteFooter />
    </div>
  );
}

export default PettingZoo;
