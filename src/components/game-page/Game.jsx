import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Redirect } from "react-router-dom";
import Score from "./Score";
import GameField from "./GameField";
import styles from "./styles/game.module.css";
import store from "../../store/observableGameStore";
import images from "../../img/game-cards/images";

const Game = observer(({ history }) => {
  useEffect(() => {
    store.initGameField(4, 3, images);
  }, []);

  const isWin = store.isWin;
  console.log("isWin", isWin);

  if (isWin) {
    return <Redirect to="/score"></Redirect>;
  }

  return (
    <div className={styles.game}>
      <Score points={store.score}></Score>
      <GameField store={store}></GameField>
    </div>
  );
});

export default Game;
