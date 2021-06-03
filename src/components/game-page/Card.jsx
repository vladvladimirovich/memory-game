import { observer } from "mobx-react-lite";
import styles from "./styles/card.module.css";

const Card = observer(({ store, id }) => {
  const card = store.gameField[id];
  const flip = card.flip;
  const className = styles.flipCardInner + (flip ? " " + styles.flipCardToggle : "");
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
            <p>BACK</p>
        </div>
        <div className={styles.flipCardBack}>
          <img src={img} alt=""></img>
        </div>
      </div>
    </div>
  );
});

export default Card;
