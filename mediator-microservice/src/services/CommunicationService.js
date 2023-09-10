export class CommunicationService {
  #mediator;

  constructor(mediator, broadcastFrequency) {
    this.#mediator = mediator;
    this.#initializeBroadcast(broadcastFrequency);
  }

  #initializeBroadcast = (broadcastFrequency) => {
    this.broadcast();
    const interval = setInterval(() => {
      this.broadcast();
    }, broadcastFrequency);
  };

  addClient = (client) => {
    this.#mediator.register(client);
  };

  removeClient = (clientSocketId) => {
    this.#mediator.unRegister(clientSocketId);
  };

  broadcast = () => {
    this.#mediator.getClients().forEach((client) => {
      client.sendScore();
    });
  };
}
