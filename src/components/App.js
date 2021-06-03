import Game from "./game-page/Game";
import store from "../store/observableGameStore";
import { useEffect } from "react";
import images from "../img/game-cards/images";

function App() {
  useEffect(() => {
    store.initGameField(3, 3, images);
  });
  return <Game store={store}></Game>;
}

export default App;
