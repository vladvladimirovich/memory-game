import { observer } from "mobx-react-lite";
import styles from "./styles/card.module.css";
import { backSide } from "../../img/game-cards/images";

const Card = observer(({ store, id, width }) => {
  const card = store.gameField[id];
  const flip = card.flip;
  const className =
    styles.flipCardInner + (flip ? " " + styles.flipCardToggle : "");
  const img = card.image;

  return (
    <div
      className={styles.flipCard}
      onClick={() => {
        store.flipCard(id);
        console.log(id, flip);
      }}
    >
      <div className={className}>
        <div className={styles.flipCardFront}>
          <img
            className={styles.frontImage}
            src={img}
            alt=""
            draggable={false}
          ></img>
        </div>
        <div className={styles.flipCardBack}>
          <img src={backSide} alt="" draggable={false}></img>
        </div>
      </div>
    </div>
  );
});

export default Card;
