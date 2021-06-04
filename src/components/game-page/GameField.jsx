import { observer } from "mobx-react-lite";
import styles from "./styles/field.module.css";
import Card from "./Card";

const GameField = observer(({ store }) => {
  const field = store.gameField;
  const width = 100 / field.x;

  return (
    <div className={styles.field}>
      {field.map((card, id) => {
        return <Card width={width} key={id} id={id} store={store}></Card>;
      })}
    </div>
  );
});

export default GameField;
