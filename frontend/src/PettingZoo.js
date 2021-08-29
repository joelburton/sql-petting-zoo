import { NEVER_SEEN } from "./globals";
import { getQuizzes } from "./api";

import { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

import SiteNavbar from "./SiteNavbar";
import SiteFooter from "./SiteFooter";
import Homepage from "./Homepage";
import Quiz from "./Quiz";
import AnimalEmoji from "./AnimalEmoji";

import "./App.css";


/** Main component for application.
 *
 * - Load quizzes from API and stores in state
 * - Renders main page structure
 * - Renders route to homepage or quiz specified in URL
 *
 * App -> PettingZoo -> {SiteNavbar, Route:Homepage, Route:Quiz, SiteFooter}
 *
 */

function PettingZoo() {
  const [quizzes, setQuizzes] = useState(null);

  useEffect(function fetchDataForQuiz() {
        async function doFetch() {
          const response = await getQuizzes();
          console.debug("PettingZoo.fetchDataForQuiz.doFetch", response.data);
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

  /** Add a key to localStorage for each quiz, set to default info.
   *
   * We keep information in localStorage to remember:
   *
   * - solved: true/false - did this solve this w/o looking at solution?
   * - sql: if so, what was the sql they used?
   * - showingHint: have they ever peeked at the hint?
   * - showingSolution: have they ever peek at the solution?
   *
   * Does not override existing keys (which would be the case if they've been
   * to this site before.
   *
   */

  function setupLocalStorage(quizId, quiz) {
    // set up prev w/either what's there or starter state
    let prev = JSON.parse(localStorage.getItem(quizId)) || {};
    for (let questionId in quiz.questions) {
      if (prev[questionId] === undefined) {
        prev[questionId] = {
          solved: false,
          sql: null,
          showingHint: NEVER_SEEN,
          showingSolution: NEVER_SEEN,
        };
      }
    }
    localStorage.setItem(quizId, JSON.stringify(prev));
  }

  // Show loading message while AJAX is fetching data and don't let them use
  // any part of the site.
  if (!quizzes) return (
      <div className="d-flex flex-column min-vh-100 justify-content-center
          align-items-center fs-2">
        <AnimalEmoji className="fs-1" /> Loading&hellip;
      </div>
  );

  // Return page structure w/routes. Our routes are:
  // - Homepage: /
  // - Quiz: /:quizId/
  //
  // Everything else redirects to the homepage.
  return (
      <div className="PettingZoo">
        <SiteNavbar quizzes={ quizzes } />
        <Container>
          <Switch>
            <Route path="/" exact><Homepage quizzes={ quizzes || {} } /></Route>
            <Route path="/:quizId/" exact render={ routeProps => {
              const id = routeProps.match.params.quizId;
              const prev = JSON.parse(localStorage.getItem(id));
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
