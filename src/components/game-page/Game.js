import { observer } from "mobx-react-lite";
import GameField from "./GameField";

const Game = observer(({ store }) => {

  return (<GameField store={store}></GameField>)
});

export default Game;
