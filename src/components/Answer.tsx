import styles from "./Answer.module.css";

interface AnswerProps {
  answer: string;
  points: number;
}

function Answer({answer, points}: AnswerProps) {
  return (
    <div className={styles.wrapper}>
      <span>{answer}</span>
      <span>{points}</span>
    </div>
  );
}

export default Answer;
