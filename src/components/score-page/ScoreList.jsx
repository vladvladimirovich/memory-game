import { observable } from "mobx";
import { useEffect } from "react";
import store from "../../store/observableGameStore";

function ScoreList() {
  useEffect(() => {
      store.setScoreList();
      store.addToScoreList({name: "qwe", score: 500})
  },[]);
  const scoreList = store.getScoreList;
  const currentScore = store.getScore;

  return (
    <ul>
      {scoreList.map((score) => (
        <li key={score.id}>{score.name}</li>
      ))}
    </ul>
  );
}
export default ScoreList;
