import React, { useState, useEffect } from 'react';
import CardGrid from './components/CardGrid';
import Scoreboard from './components/Scoreboard';
import { fetchLeagueChampions } from './services/api';
import './styles.css';

const App = () => {
  const [champions, setChampions] = useState([]);
  const [clickedChampions, setClickedChampions] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    const loadChampions = async () => {
      const data = await fetchLeagueChampions();
      setChampions(data);
    };

    loadChampions();
  }, []);

  const handleCardClick = (id) => {
    if (clickedChampions.includes(id)) {
      // Game over
      alert('Game Over!');
      resetGame();
    } else {
      // Update score and shuffle
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedChampions([...clickedChampions, id]);

      if (newScore > bestScore) setBestScore(newScore);

      if (newScore === 12) {
        // Player wins
        setGameWon(true);
      } else {
        shuffleChampions();
      }
    }
  };

  const shuffleChampions = () => {
    setChampions(prevChampions =>
      [...prevChampions].sort(() => Math.random() - 0.5)
    );
  };

  const resetGame = () => {
    setCurrentScore(0);
    setClickedChampions([]);
    setGameWon(false);
    shuffleChampions();
  };

  return (
    <div className="app">
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <CardGrid champions={champions} onCardClick={handleCardClick} />

      {gameWon && (
        <div className="congratulations">
          <h1>Congratulations! 🎉</h1>
          <p>You matched all the champions!</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}
    </div>
  );
};

export default App;
