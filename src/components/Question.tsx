import { useState } from "react";
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

function Question({question}: QuestionProps) {
  const [flipStates, setFlipStates] = useState(Array.from({length: question.answers.length}).fill(false));
  const [totalPoints, setTotalPoints] = useState(0);
  
  // Runs when answer is clicked
  function handleFlip(index: number, points: number) {
    setFlipStates((prev) => (
      prev.map((flipped, i) => (i === index ? !flipped : flipped))  // State immutable so make a copy with map?
    ));

    // TODO: make this happen on state change, not onclick
    setTotalPoints((prev) => (
      flipStates[index] ? prev - points : prev + points
    ));
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.question}>{question.text}</h2>
      <p className={styles.points}>{totalPoints}</p>
      {question.answers.map((answer, index) => (
        <Answer 
          key={index}
          answer={answer.text} 
          points={answer.points}
          flipped={flipStates[index] as boolean}
          onFlip={() => handleFlip(index, answer.points)}
        />
      ))}
    </div>
  );
}

export default Question;