import { useState } from "react";
import styles from "./Answer.module.css";

interface AnswerProps {
  answer: string;
  points: number;
}

function Answer({answer, points}: AnswerProps) {
  const [flipped, setFlipped] = useState(false);

  function handleClick() {
    setFlipped(f => !f);
  }

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <span>{flipped ? answer : "Click to Reveal"}</span>
      <span>{flipped && points}</span>
    </div>
  );
}

export default Answer;
