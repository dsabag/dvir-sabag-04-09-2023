import { io } from "../app.js";
import { generateRandomNum } from "../helpers/generateRandomNum.js";
import { config } from "../app.js";

export class Client {
  #mediator = null;
  constructor(id, socketId) {
    this.id = id;
    this.socketId = socketId;
  }

  setMediator(mediator) {
    this.#mediator = mediator;
  }

  receive(data) {
    io.to(this.socketId).emit("score", data);
  }

  sendData(clientId, data) {
    this.#mediator.sendDataToClient(clientId, data);
  }

  sendScore() {
    const { score_ranges } = config;
    const score = generateRandomNum(score_ranges.max, score_ranges.min);
    this.sendData(this.id, score);
  }
}
