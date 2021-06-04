import { Route, Switch } from "react-router-dom";
import Game from "./game-page/Game";
import Main from "./main-page/Main";
import ScoreList from "./score-page/ScoreList";

function App() {
  return (
    <div className="app">
      <Switch>
        <Route path="/game" component={Game}></Route>
        <Route path="/score" component={ScoreList}></Route>
        <Route path="/" component={Main}></Route>
      </Switch>
    </div>
  );
}

export default App;
