import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import Game from "./game-page/Game";
import Main from "./main-page/Main";
import Score from "./score-page/Score";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/game" component={Game}></Route>
          <Route path="/score" component={Score}></Route>
          <Route path="/" component={Main}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
