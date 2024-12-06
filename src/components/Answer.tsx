import { useRef, useEffect } from "react";
import styles from "./Answer.module.css";
import bell from "../assets/sounds/bell.mp3";
import { Textfit } from "@ataverascrespo/react18-ts-textfit";

interface AnswerProps {
  answer: string;
  points: number;
  flipped: boolean;
  onFlip: () => void;
};

function Answer({answer, points, flipped, onFlip}: AnswerProps) {
  const audioRef = useRef(new Audio(bell));

  // Play correct sound when answer is flipped ie: when state changes
  useEffect(() => {
    if (flipped) playCorrect();
    console.log(`State of answer "${answer}" changed. Now: ${flipped}`);
  }, [flipped]);

  function playCorrect() {
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className={styles.wrapper} onClick={onFlip}>
      <div className={`${styles.innerWrapper} ${flipped && styles.flipped}`}>
        <div className={styles.front}>{"Click to Reveal"}</div>
        <div className={styles.back}>
          <Textfit 
            className={styles.text}
            mode="single"
            forceSingleModeWidth={false}>
            {answer.toUpperCase()}
          </Textfit>
          <p className={styles.points}>{points}</p>
        </div>
      </div>
    </div>
  );
}

export default Answer;
