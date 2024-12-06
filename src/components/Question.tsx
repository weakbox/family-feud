import { useState } from "react";
import CountUp from "react-countup";
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
  
  // Runs when answer is clicked
  function handleFlip(index: number) {
    setFlipStates((prev) => (
      prev.map((flipped, i) => (i === index ? !flipped : flipped))  // State immutable so make a copy with map?
    ));
  }

  // Not super sure why TypeScript needs a type annotation here
  const totalPoints = flipStates.reduce((sum: number, flipState, index) => (
    flipState ? sum + question.answers[index].points : sum
  ), 0);

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.question}>{question.text}</h2>
      <CountUp
        className={styles.points}
        end={totalPoints}
        preserveValue={true}
      />
      {question.answers.map((answer, index) => (
        <Answer 
          key={index}
          answer={answer.text} 
          points={answer.points}
          flipped={flipStates[index] as boolean}
          onFlip={() => handleFlip(index)}
        />
      ))}
    </div>
  );
}

export default Question;