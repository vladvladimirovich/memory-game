import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import Score from "./Score";
import GameField from "./GameField";
import styles from "./styles/game.module.css";
import store from "../../store/observableGameStore";
import images from "../../img/game-cards/images";

const Game = observer(({ history }) => {
  useEffect(() => {
    store.initGameField(4, 3, images);
    setTimeout(() => store.flipAllCardsTo(true), 500)
    setTimeout(() => store.flipAllCardsTo(false), 3000);
  }, []);


  return (
    <div className={styles.game}>
      <Score points={store.score}></Score>
      <GameField store={store}></GameField>
    </div>
  );
});

export default Game;
