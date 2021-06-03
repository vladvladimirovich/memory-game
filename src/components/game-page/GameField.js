import { observer } from "mobx-react-lite";
import Card from "./Card";

const GameField = observer(({ store }) => {
  const field = store.gameField;

  return field.map((card, id) => {
    return <Card key={id} id={id} store={store}></Card>;
  });
});

export default GameField;
