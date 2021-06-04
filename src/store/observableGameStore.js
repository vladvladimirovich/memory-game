import { action, autorun, computed, makeObservable, observable } from "mobx";

class ObservableGameStore {
  x = 0;
  y = 0;
  gameField = [];
  score = 0;

  scoreList = [];

  prevCard = null;
  inputLock = false;

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
      flipAllCardsTo: action,

      isWin: computed,
    });
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

    if (this.inputLock) {
      return;
    }

    // flip card if it's not flipped
    if (!card.flip) {
      if (this.prevCard === null) {
        this.prevCard = card;
        card.flip = true;
        return;
      }

      card.flip = true;

      // unflip cards if current card is not equal previous
      if (card.image !== this.prevCard.image) {
        this.inputLock = true;
        setTimeout(() => {
          this.decreaseScore(3);
          this.prevCard.flip = false;
          card.flip = false;
          this.prevCard = null;
          this.inputLock = false;
        }, 1000);
        return;
      }
      this.increaseScore(10);
      this.prevCard = null;
      return;
    }
  }
  flipAllCardsTo(flip) {
    for (let i = 0; i < this.gameField.length; ++i) {
      this.gameField[i].flip = flip;
    }
  }

  setGameField(gameField) {
    this.gameField = gameField;
  }

  initGameField(x, y, images) {
    // params validation
    // check if it's enough images for game field, and shrink field if it's not
    while (images.length * 2 < x * y) {
      if (x <= y) {
        y = Number(images.length / 2 / x);
      }
    }

    // check if game field is even and resize if not
    if ((x * y) % 2 !== 0) {
      if (x <= y) {
        y -= 1;
      } else {
        x -= 1;
      }
    }

    console.log(x, y);
    const fieldSize = x * y;

    let imagesForCards = images.slice(0, fieldSize / 2);
    let newGameField = imagesForCards.map((image) => {
      return {
        image: image,
        flip: false,
      };
    });

    newGameField = newGameField.concat(newGameField);
    console.log(newGameField);

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
    if (this.score - points < 0) {
      return
    }
    this.score -= points;
  }
  setScore(points) {
    this.score = points;
  }
}

const observableGameStore = new ObservableGameStore();

export default observableGameStore;
