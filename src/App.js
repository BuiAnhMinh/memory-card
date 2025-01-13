import React, { useState, useEffect } from 'react';
import CardGrid from './components/CardGrid';
import Scoreboard from './components/Scoreboard';
import { fetchLeagueChampions } from './services/api';
import './styles.css'

const App = () => {
  const [champions, setChampions] = useState([]);
  const [clickedChampions, setClickedChampions] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

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
      setCurrentScore(0);
      setClickedChampions([]);
    } else {
      // Update score and shuffle
      const newScore = currentScore + 1;
      setCurrentScore(newScore);
      setClickedChampions([...clickedChampions, id]);

      if (newScore > bestScore) setBestScore(newScore);
      shuffleChampions();
    }
  };

  const shuffleChampions = () => {
    setChampions(prevChampions => [...prevChampions].sort(() => Math.random() - 0.5));
  };

  return (
    <div>
      <Scoreboard currentScore={currentScore} bestScore={bestScore} />
      <CardGrid champions={champions} onCardClick={handleCardClick} />
    </div>
  );
};

export default App;
