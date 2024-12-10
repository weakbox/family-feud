import { useState } from "react";
import Question from "./Question";
import { Answer, AnswerBlank } from "./Answer";
import Points from "./Points";
import styles from "./GameController.module.css";

interface Question {
  text: string;
  answers: {
    text: string;
    points: number;
  }[];
};

const testQuestions = [
  {
    "text": "Name A Character Who’s Known For Almost Ruining Christmas.",
    "answers": [
      { "text": "Grinch", "points": 67 },
      { "text": "Ebenezer Scrooge", "points": 28 },
      { "text": "Charlie Brown", "points": 4 }
    ]
  },
  {
    "text": "What’s The Messiest Thing To Clean Up After The Christmas Holiday?",
    "answers": [
      { "text": "Kitchen", "points": 48 },
      { "text": "Tree", "points": 27 },
      { "text": "Wrapping Paper", "points": 15 },
      { "text": "Decorations", "points": 5 }
    ]
  },
  {
    "text": "What Complaints Do People Make About The Christmas Holiday?",
    "answers": [
      { "text": "Expense", "points": 27 },
      { "text": "Nosey/Pesky Relatives", "points": 24 },
      { "text": "Traffic/Traveling", "points": 20 },
      { "text": "Crowds", "points": 13 },
      { "text": "Holiday Food", "points": 10 }
    ]
  },
  {
    "text": "Other Than “Christmas”, Name A Word That’s In Almost Every Christmas Song.",
    "answers": [
      { "text": "Merry", "points": 39 },
      { "text": "Santa", "points": 22 },
      { "text": "Snow", "points": 17 },
      { "text": "Bells", "points": 9 },
      { "text": "Holiday", "points": 6 }
    ]
  },
  {
    "text": "Where Do You Hear Christmas Songs Throughout December?",
    "answers": [
      { "text": "Store", "points": 51 },
      { "text": "Radio", "points": 31 },
      { "text": "Place Of Worship", "points": 8 },
      { "text": "TV", "points": 6 },
      { "text": "Home", "points": 3 }
    ]
  },
  {
    "text": "Name Something Your House Is Full Of After Christmas.",
    "answers": [
      { "text": "Presents", "points": 34 },
      { "text": "Wrapping Paper", "points": 31 },
      { "text": "Food", "points": 15 },
      { "text": "Pine Needles", "points": 6 },
      { "text": "Boxes", "points": 5 },
      { "text": "People", "points": 4 }
    ]
  },
  {
    "text": "Name A Reason You May Not Be Able To Get Home For The Holidays.",
    "answers": [
      { "text": "Sick", "points": 17 },
      { "text": "Work", "points": 14 },
      { "text": "Broke", "points": 12 },
      { "text": "Far Away", "points": 4 },
      { "text": "Car Problems", "points": 3 },
      { "text": "Too Much Homework", "points": 2 }
    ]
  },
  {
    "text": "Name Something People Associate With “A Christmas Carol” By Charles Dickens.",
    "answers": [
      { "text": "Christmas", "points": 24 },
      { "text": "Tiny Tim", "points": 19 },
      { "text": "Scrooge", "points": 18 },
      { "text": "Bob Cratchit", "points": 11 },
      { "text": "Christmas Tree", "points": 9 },
      { "text": "Ghosts", "points": 8 },
      { "text": "Chains", "points": 6 }
    ]
  },
  {
    "text": "Name A Christmas Story That A Parent Might Read To Their Child.",
    "answers": [
      { "text": "Night Before Christmas", "points": 64 },
      { "text": "Rudolph The Red Nose", "points": 9 },
      { "text": "Grinch Stole Xmas", "points": 7 },
      { "text": "A Christmas Carol", "points": 6 },
      { "text": "Bible", "points": 4 },
      { "text": "Frosty The Snow Man", "points": 3 },
      { "text": "A Christmas Carol", "points": 2 }
    ]
  },
  {
    "text": "Name Something Kids Say They’d Do If They Were An Adult, But That Adults Rarely Do.",
    "answers": [
      { "text": "Stay Up Late", "points": 34 },
      { "text": "Party", "points": 20 },
      { "text": "Become Rich", "points": 13 },
      { "text": "Sleep In", "points": 10 },
      { "text": "No House Rules", "points": 8 },
      { "text": "Eat Junk Food", "points": 6 },
      { "text": "Travel", "points": 5 }
    ]
  }
];

function GameController() {
  const [question, setQuestion] = useState(getRandomQuestion());
  const [flipStates, setFlipStates] = useState(Array.from({length: question.answers.length}).fill(false));
  const [scores, setScores] = useState([0, 0]);

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
            index={index}
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

  function handleNewQuestion() {
    // Currently problem where answers are shown for a split second before flipping back over
    const newQuestion = getRandomQuestion();
    console.log(newQuestion);
    setQuestion(newQuestion);
    setFlipStates(Array.from({length: newQuestion.answers.length}).fill(false));
  }
  
  function getRandomQuestion() {
    const i = Math.floor(Math.random() * testQuestions.length);
    return testQuestions[i];
  }

  function handleAddPoints(team: 0 | 1, multiplier: number) {
    setScores((prev) =>
      prev.map((score, i) => (i === team ? score + totalPoints * multiplier : score))
    );
  }
  
  return (
    <div className={styles.wrapper}>
      <Question questionText={question.text} totalPoints={totalPoints} />
      <div className={styles.pointsWrapper}>
        <Points totalPoints={scores[0]} />
        {renderAnswers()}
        <Points totalPoints={scores[1]} />
      </div>
      <div className={styles.buttonWrapper}>
        <div
          className={styles.button}
          onClick={() => handleAddPoints(0, 3)}
          role="button"
        >
          Add x3
        </div>
        <div
          className={styles.button}
          onClick={() => handleAddPoints(0, 2)}
          role="button"
        >
          Add x2
        </div>
        <div
          className={styles.button}
          onClick={() => handleAddPoints(0, 1)}
          role="button"
        >
          Add x1
        </div>
        <div
          className={styles.button}
          onClick={handleNewQuestion}
          role="button"
        >
          New Question
        </div>
        <div
          className={styles.button}
          onClick={() => handleAddPoints(1, 1)}
          role="button"
        >
          Add x1
        </div>
        <div
          className={styles.button}
          onClick={() => handleAddPoints(1, 2)}
          role="button"
        >
          Add x2
        </div>
        <div
          className={styles.button}
          onClick={() => handleAddPoints(1, 3)}
          role="button"
        >
          Add x3
        </div>
      </div>
    </div>
  );  
}

export default GameController;
