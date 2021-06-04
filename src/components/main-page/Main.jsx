import { observer } from "mobx-react-lite";
import { Link, BrowserRouter } from "react-router-dom";

const Main = observer(({ store, history }) => {
  return (
    <div>
      <Link to="/game">Start</Link>
      <button>Settings</button>
      <button>Score</button>
    </div>
  );
});

export default Main;
