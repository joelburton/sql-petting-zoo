import axios from "axios";

/** Submit SQL for question to server to evaluate.
 *
 * @param quizId
 * @param questionNum
 * @param sql
 * @returns {Promise<{result, isCorrect}>}
 */

const BASE_URL = "http://localhost:5000/api";

async function submitSql(quizId, questionNum, sql) {
  const response = await fetch(
    `${ BASE_URL }/run/${ quizId }/${ questionNum }/`, {
      method: "POST",
      cache: "no-cache",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ sql }),
    });
  const { rows, cols, problems } = await response.json();
  console.log(rows, cols, problems)
  return { rows, cols, problems };
}

/** Get quiz object from server. */

async function getQuizzes(quizId) {
  return await axios.get(`${ BASE_URL }/`);
}

export { submitSql, getQuizzes }