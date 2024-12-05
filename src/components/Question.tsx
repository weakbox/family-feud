import Answer from "./Answer";
import styles from "./Question.module.css";

interface Question {
  text: string;
  answers: {
    text: string;
    points: number;
  }[];
};

interface QuestionProps {
  question: Question;
};

function Question({ question }: QuestionProps) {
  return (
    <div className={styles.wrapper}>
      <h1>{question.text}</h1>
        {question.answers.map((answer, index) => (
        <Answer key={index} answer={answer.text} points={answer.points}/>
      ))}
    </div>
  );
}

export default Question;