import { useState } from "react";
import CountUp from "react-countup";
import { Answer, AnswerBlank } from "./Answer";
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

  function renderAnswers() {
    return (
      <div className={styles.answersWrapper}>
        {question.answers.map((answer, index) => (
          <Answer 
            key={index}
            answer={answer.text} 
            points={answer.points}
            flipped={flipStates[index] as boolean}
            onFlip={() => handleFlip(index)}
          />
        ))}
        {Array.from({length: (8 - question.answers.length)}).map((_, index) => (
          <AnswerBlank key={index}/>
        ))}
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.question}>{question.text}</h2>
      <CountUp
        className={styles.points}
        duration={1}
        end={totalPoints}
        preserveValue={true}
      />
      {renderAnswers()}
    </div>
  );
}

export default Question;