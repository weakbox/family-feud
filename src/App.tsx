import './App.css'
import Answer from './components/Answer'

function App() {
  return (
    <>
      <p>Real Or Fictional, Name A Famous Man With Long Hair</p>
      <Answer answer="Jesus" points={41}/>
      <Answer answer="Fabio" points={15}/>
      <Answer answer="Samson" points={11}/>
      <Answer answer="Howard Stern" points={8}/>
      <Answer answer="George Washington" points={7}/>
      <Answer answer="Hercules" points={7}/>
      <Answer answer="Albert Einstein" points={7}/>
    </>
  )
}

export default App
