import CountUp from "react-countup";
import styles from "./Question.module.css";

interface QuestionProps {
  questionText: string;
  totalPoints: number;
}

function Question({questionText, totalPoints}: QuestionProps) {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.question}>{questionText}</h2>
      <CountUp
        className={styles.points}
        duration={1}
        end={totalPoints}
        preserveValue={true}
      />
    </div>
  );
}

export default Question;
