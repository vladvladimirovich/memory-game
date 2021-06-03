import { action, autorun, computed, makeObservable, observable } from "mobx";

class ObservableGameStore {
  x = 0;
  y = 0;
  gameField = [];
  score = 0;
  prevCard = null;

  constructor() {
    makeObservable(this, {
      gameField: observable,
      score: observable,

      setGameField: action,
      initGameField: action,

      getScore: action,
      setScore: action,
      increaseScore: action,
      decreaseScore: action,

      flipCard: action,

      isWin: computed,
    });
    autorun(() => console.log(this.isWin));
  }

  get isWin() {
    console.log("isWIN");
    let win = true;
    for (let i = 0; i < this.gameField.length; ++i) {
      if (this.gameField[i].flip === false) {
        win = false;
        break;
      }
    }
    return win;
  }

  flipCard(id) {
    const card = this.gameField[id];
    if (!card.flip) {
      if (this.prevCard === null) {
        this.prevCard = card;
        card.flip = true;
        return;
      }
      card.flip = true;
      console.log(card.image, this.prevCard.image)
      if (card.image !== this.prevCard.image) {
        setTimeout(() => {
          this.prevCard.flip = false;
          card.flip = false;
          this.prevCard = null;
        }, 1000);
        return;
      }
      this.prevCard = null;
      return;
    }
  }

  setGameField(gameField) {
    this.gameField = gameField;
  }

  initGameField(x, y, images) {
    // params validation
    // check if it's enough images for game field, and shrink if it's not
    // if (images.length / 2 < x * y) {
    //   if (x <= y) {
    //     y = images.length / 2 / x;
    //   }
    // }

    // check if game field is even and resize if not
    if ((x * y) % 2 !== 0) {
      if (x <= y) {
        y -= 1;
      } else {
        x -= 1;
      }
    }

    const fieldSize = x * y;

    let imagesForCards = images.slice(0, fieldSize / 2);
    let newGameField = imagesForCards.map((image) => {
      return {
        image: image,
        flip: false,
      };
    });

    newGameField = newGameField.concat(newGameField);

    let rand, temp, i;
    for (i = newGameField.length - 1; i > 0; i--) {
      rand = Math.floor(Math.random() * (i + 1));
      temp = newGameField[i];
      newGameField[i] = newGameField[rand];
      newGameField[rand] = temp;
    }
    console.log(newGameField);
    this.gameField = newGameField;
    this.x = x;
    this.y = y;
  }

  getScore() {
    return this.score;
  }
  increaseScore(points) {
    this.score += points;
  }
  decreaseScore(points) {
    this.score -= points;
  }
  setScore(points) {
    this.score = points;
  }
}

const observableGameStore = new ObservableGameStore();

export default observableGameStore;
