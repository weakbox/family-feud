import { useState, useRef } from "react";
import styles from "./Answer.module.css";
import bell from "../assets/sounds/bell.mp3";

interface AnswerProps {
  answer: string;
  points: number;
}

function Answer({answer, points}: AnswerProps) {
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef(new Audio(bell));

  function handleClick() {
    if (!flipped) playCorrect();
    setFlipped((prev) => !prev);
  }

  function playCorrect() {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className={`${styles.wrapper} ${flipped ? styles.flipped : ""}`} onClick={handleClick}>
      <span>{flipped ? answer : "Click to Reveal"}</span>
      {flipped && <span>{points}</span>}
    </div>
  );
}

export default Answer;
