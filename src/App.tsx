import "./App.css";
import Question from "./components/Question";

const exampleQuestion = {
  text: "Real Or Fictional, Name A Famous Man With Long Hair",
  answers: [
    { text: "Jesus", points: 41 },
    { text: "Fabio", points: 15 },
    { text: "Samson", points: 11 },
    { text: "Howard Stern", points: 8 },
    { text: "George Washington", points: 7 },
    { text: "Hercules", points: 7 },
    { text: "Albert Einstein", points: 7 },
  ],
};

function App() {
  return (
    <>
      <Question question={exampleQuestion}/>
    </>
  );
}

export default App;
