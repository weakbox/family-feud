import { useState, useRef, useEffect } from "react";
import styles from "./Answer.module.css";
import bell from "../assets/sounds/bell.mp3";

interface AnswerProps {
  answer: string;
  points: number;
}

function Answer({answer, points}: AnswerProps) {
  const [flipped, setFlipped] = useState(false);
  const audioRef = useRef(new Audio(bell));

  // Play correct sound when answer is flipped ie: when state changes
  useEffect(() => {
    if (flipped) playCorrect();
    console.log(`State of answer "${answer}" changed. Now: ${flipped}`);
  }, [flipped]);

  function handleClick() {
    setFlipped((prev) => !prev);
  }

  function playCorrect() {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className={styles.wrapper} onClick={handleClick}>
      <div className={`${styles.innerWrapper} ${flipped && styles.flipped}`}>
        <div className={styles.front}>{"Click to Reveal"}</div>
        <div className={styles.back}>
          <p className={styles.text}>{answer.toUpperCase()}</p>
          <p className={styles.points}>{points}</p>
        </div>
      </div>
    </div>
  );
}

export default Answer;
