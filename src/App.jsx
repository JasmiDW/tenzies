/* eslint-disable react/no-unescaped-entities */
import './App.css'
import Die from './components/Die'
import { useState } from 'react'
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = useState(() => generateDice())

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
      <div className='container'>
        {diceValue}
      </div>
      <button className='roll-button' onClick={handleDice}>{gameWon ? 'New Game' : 'Roll'}</button>
    </main>
  )
}

export default App
 