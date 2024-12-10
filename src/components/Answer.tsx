import { useRef, useEffect } from "react";
import styles from "./Answer.module.css";
import bell from "../assets/sounds/bell.mp3";
import { Textfit } from "@ataverascrespo/react18-ts-textfit";

interface AnswerProps {
  index: number;
  answer: string;
  points: number;
  flipped: boolean;
  onFlip: () => void;
};

export function Answer({index, answer, points, flipped, onFlip}: AnswerProps) {
  const audioRef = useRef(new Audio(bell));

  // Play correct sound when answer is flipped ie: when state changes
  useEffect(() => {
    if (flipped) playCorrect();
    // console.log(`State of answer "${answer}" changed. Now: ${flipped}`);
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
        <div className={styles.front}>
          <div className={styles.square}>{index + 1}</div>
        </div>
        <div className={styles.back}>
          <Textfit 
            className={styles.text}
            max={36}
            forceSingleModeWidth={false}
            throttle={1000}>
            {answer.toUpperCase()}
          </Textfit>
          <p className={styles.points}>{points}</p>
        </div>
      </div>
    </div>
  );
}

export function AnswerBlank() {
  return (
    <div className={`${styles.wrapper} ${styles.dummy}`}>
      <div className={styles.innerWrapper}>
        <div className={styles.front}></div>
      </div>
    </div>
  );
}
