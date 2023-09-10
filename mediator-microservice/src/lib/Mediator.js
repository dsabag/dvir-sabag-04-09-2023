import { validateId } from "../services/ValidatorService.js";
import { config, io } from "../app.js";

export class Mediator {
  #clients = [];

  getClients() {
    return this.#clients;
  }

  async register(client) {
    if (!validateId(client.id, config.allowed_clients)) {
      return io.to(client.socketId).emit("error", "Wrong Client ID");
    }

    this.#clients.push(client);
    client.setMediator(this);
  }

  unRegister(clientSocketId) {
    const clientIdx = this.#clients.findIndex(
      (client) => client.socketId === clientSocketId
    );
    if (clientIdx === -1) {
      return;
    }
    this.#clients.splice(clientIdx, 1);
  }

  sendDataToClient(clientId, data) {
    const client = this.#clients.find((client) => client.id === clientId);
    client.receive(data);
  }
}
