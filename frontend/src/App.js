import { BrowserRouter } from "react-router-dom";

import PettingZoo from "./PettingZoo";


/** Top of React component: set up browser router.
 *
 *
 * App -> PettingZoo
 *
 **/

function App() {
  return (
      <BrowserRouter>
        <PettingZoo />
      </BrowserRouter>
  );
}

export default App;
