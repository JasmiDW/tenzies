/* eslint-disable react/no-unescaped-entities */
import './App.css'
import Die from './components/Die'
import { useState, useEffect } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(() => generateDice())
  const [count, setCount] = useState(0)
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000); // Le timer augmente chaque seconde
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);


  let gameWon = (dice.every(die => die.isHeld) && dice.every(die => die.value === dice[0].value))


  function generateDice() {
    let dices = [];
  
    for (let i = 0; i < 10; i++) {
      dices.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id : nanoid()
      });
    }
    return dices;
  }

  function holdDice(id){
    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }
    setDice(prevHold => prevHold.map(item => {
      return item.id === id ? {...item, isHeld : !item.isHeld} : item
    }))
  }
  
  const diceValue = dice.map(diceObject => <Die value={diceObject.value} 
                                              key={diceObject.id} 
                                              id={diceObject.id} 
                                              isHeld={diceObject.isHeld} 
                                              hold={holdDice}
                                              />
  )

  function handleDice(){
    if (!gameWon){
      setCount(count + 1)
      setDice(prevHold => prevHold.map(item => {
        return item.isHeld !== true ? {...item, value: Math.ceil(Math.random() * 6)} : item
        
      }))
    } else {
      setDice(generateDice())
      
    }
  }

  return (
    <main>
      {gameWon && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Lancez les dés jusqu'à ce qu'ils soient tous identiques. Cliquez sur chaque dé pour le figer à sa valeur actuelle entre deux lancers.</p>
      <p>Nombre de tour joués: {count}</p>
      <div>Temps : {time} secondes</div>
      <div className='container'>
        {diceValue}
      </div>
      <button className='roll-button' onClick={handleDice}>{gameWon ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App
 