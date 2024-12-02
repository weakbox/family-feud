import styles from "./Answer.module.css";

interface AnswerProps {
  answer: string;
  points: number;
}

function Answer({answer, points}: AnswerProps) {
  return (
    <>
      <p className={styles.wrapper}>{answer}</p>
      <p className={styles.wrapper}>{points}</p>
    </>
  );
}

export default Answer;