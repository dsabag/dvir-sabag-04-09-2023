import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { Mediator } from "./lib/Mediator.js";
import { Client } from "./lib/Client.js";
import { ConfigService } from "./services/configService.js";
import { CommunicationService } from "./services/CommunicationService.js";

const PORT = 8001;
const app = express();
app.use(express.json());
const httpServer = createServer(app);

export const config = await new ConfigService(
  "http://localhost:8000/config"
).fetchConfig();
const mediator = new Mediator();

const communicationService = new CommunicationService(
  mediator,
  config.polling_frequency
);

export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  socket.on("register", (clientId) => {
    if (mediator.getClients().some((client) => client.id == clientId)) {
      return;
    }

    const client = new Client(parseInt(clientId), socket.id);
    communicationService.addClient(client);
  });

  socket.on("disconnect", () => {
    communicationService.removeClient(socket.id);
  });
});

io.httpServer.listen(PORT, () => {
  console.log(
    "Server is Successfully Running,and App is listening on port " + PORT
  );
});
