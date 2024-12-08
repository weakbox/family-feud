import Question from "./Question";
import styles from "./Question.module.css";

const question = {
  text: "Name Something You Would Allow The House Sitter To Use While At Your Place",
  answers: [
    { text: "Phone", points: 40 },
    { text: "TV", points: 35 },
    { text: "Bathroom", points: 12 },
    { text: "Computer", points: 8 },
    { text: "Washing/Drying Machine", points: 3 },
  ],
};

function GameController() {
  return (
    <Question question={question}/>
  );
}

export default GameController;