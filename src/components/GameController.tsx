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
    text: "Name Something You Would Allow The House Sitter To Use While At Your Place",
    answers: [
      { text: "Phone", points: 40 },
      { text: "TV", points: 35 },
      { text: "Bathroom", points: 12 },
      { text: "Computer", points: 8 },
      { text: "Washing/Drying Machine", points: 3 },
    ],
  },
  {
    text: "Name A Prop Used By Tap Dancers",
    answers: [
      { text: "Cane", points: 65 },
      { text: "Top Hat", points: 28 },
      { text: "Baton", points: 7 },
    ],
  },
  {
    text: "If You Drew Homer Simpson’s Name In A Secret Santa Exchange, What Would You Buy Him?",
    answers: [
      { text: "Beer", points: 67 },
      { text: "Donuts", points: 24 },
      { text: "Bowling Ball", points: 9 },
    ],
  },
  {
    text: "Name Something A Teenage Boy Might Ask His Dad For",
    answers: [
      { text: "Car", points: 61 },
      { text: "Money", points: 30 },
      { text: "Advice", points: 2 },
      { text: "Bike", points: 2 },
    ],
  },
  {
    text: "Name Something That Gets Rolled Out",
    answers: [
      { text: "Red Carpet", points: 40 },
      { text: "Dough", points: 35 },
      { text: "Yoga Mat", points: 10 },
      { text: "Sleeping Bag", points: 5 },
    ],
  },
  {
    text: "Which North Pole Resident Is Most Likely To Become Jealous Of Santa’s Power?",
    answers: [
      { text: "Elf", points: 45 },
      { text: "Jack Frost", points: 31 },
      { text: "Rudolph", points: 14 },
      { text: "Mrs. Claus", points: 8 },
    ],
  },
  {
    text: "Where Do You Like To Go Barefoot?",
    answers: [
      { text: "Beach", points: 43 },
      { text: "Park", points: 30 },
      { text: "Shower", points: 16 },
      { text: "Bed", points: 8 },
    ],
  },
  {
    text: "Name Something You Try To Prevent From Getting Flat",
    answers: [
      { text: "Tire", points: 40 },
      { text: "Hair", points: 33 },
      { text: "Soda", points: 20 },
      { text: "Beer", points: 5 },
    ],
  },
  {
    text: "Whose Phone Number Might A Child Know By Heart?",
    answers: [
      { text: "Emergency Department", points: 49 },
      { text: "Home Phone", points: 37 },
      { text: "Grandparents", points: 7 },
      { text: "Best Friend", points: 3 },
    ],
  },
  {
    text: "Name A Reason Why Workers Might Go On Strike",
    answers: [
      { text: "Better Pay", points: 69 },
      { text: "Want Benefits", points: 8 },
      { text: "No Contract", points: 6 },
      { text: "Better Hours", points: 3 },
    ],
  },
  {
    text: "Name Something People Put On Their Christmas Tree",
    answers: [
      { text: "Ornaments", points: 60 },
      { text: "Lights", points: 25 },
      { text: "Star", points: 10 },
      { text: "Tinsel", points: 5 },
    ],
  },
  {
    text: "What Do You Do When You Can't Sleep?",
    answers: [
      { text: "Watch TV", points: 40 },
      { text: "Read", points: 30 },
      { text: "Count Sheep", points: 20 },
      { text: "Have A Snack", points: 10 },
    ],
  },
  {
    text: "Name Something That Melts When It Gets Hot",
    answers: [
      { text: "Ice", points: 50 },
      { text: "Candle", points: 30 },
      { text: "Chocolate", points: 15 },
      { text: "Cheese", points: 5 },
    ],
  },
];

function GameController() {
  const [question, setQuestion] = useState(getRandomQuestion());
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

  function handleClick() {
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

  return (
    <div className={styles.wrapper}>
      <Question questionText={question.text} totalPoints={totalPoints}/>
      <div className={styles.pointsWrapper}>
        <Points totalPoints={50}/>
        {renderAnswers()}
        <Points totalPoints={23}/>
      </div>
      <button onClick={handleClick}>Change the Question</button>
    </div>
  );
}

export default GameController;
