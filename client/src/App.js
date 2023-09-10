import React, { useState } from "react";
import Register from "./components/Register";
import Score from "./components/Score";
import { socket } from "./services/socketService";
import "./App.css";

function App() {
  const [score, setScore] = useState(undefined);
  const [socketError, setSocketError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegistration = (clientId) => {
    socket.emit("register", clientId);

    socket.on("score", (score) => {
      setIsRegistered(true);
      setScore(score);
      setSocketError("");
    });

    socket.on("error", (error) => {
      setSocketError(error);
    });
  };

  return (
    <div className="App">
      {!isRegistered && <Register register={handleRegistration} />}
      {socketError ? <p style={{ color: "red" }}>{socketError}</p> : ""}
      {score !== undefined ? <Score score={score} /> : ""}
    </div>
  );
}

export default App;
