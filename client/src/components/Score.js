import { useState } from "react";

const Score = ({ score }) => {
  const [prevScore, setPrevScore] = useState(score);
  const [scoreColor, setScoreColor] = useState(null);

  if (prevScore !== score) {
    setPrevScore(score);
    setScoreColor(score > prevScore ? "green" : "red");
  }

  return (
    <section>
      <h1>
        The Score Is <div style={{ color: scoreColor }}>{score}</div>
      </h1>
    </section>
  );
};

export default Score;
