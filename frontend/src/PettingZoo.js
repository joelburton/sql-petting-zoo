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

  function showLoading() {
    return <Route>Loading...</Route>;
  }

  function showRoutes() {
    return (
      <Route path="/:quizId/" render={ routeProps => {
        const id = routeProps.match.params.quizId;
        const prev = JSON.parse(localStorage.getItem(id));
        // console.log("Route", id, JSON.parse(localStorage.getItem("world")), prev, quizzes, quizzes[id]);
        return <Quiz quizId={ id } quiz={ quizzes[id] } prev={ prev } />;
      } }
      />
    );
  }

  return (
    <div className="PettingZoo">
      <SiteNavbar quizzes={quizzes || {}} />
      <Container>
        <Switch>
          { quizzes ? showRoutes() : showLoading() }
          <Route path="/"><Homepage quizzes={quizzes || {}} /></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Container>
      <SiteFooter />
    </div>
  );
}

export default PettingZoo;
