import React, { useState } from 'react';
import NavBar from '/NavBar';

const TerpTraining = () => {
  const terpeneProfiles = [
    { id: 1, name: 'Myrcene', flavor: 'Earthy' },
    { id: 2, name: 'Limonene', flavor: 'Citrusy' },
    { id: 3, name: 'Pinene', flavor: 'Pine' },
  ];

  const getRandomProfile = () =>
    terpeneProfiles[Math.floor(Math.random() * terpeneProfiles.length)];

  const [currentProfile, setCurrentProfile] = useState(getRandomProfile());
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleGuess = () => {
    if (guess.trim().toLowerCase() === currentProfile.flavor.toLowerCase()) {
      setFeedback('Correct!');
    } else {
      setFeedback(
        `Wrong! The correct flavor for ${currentProfile.name} is ${currentProfile.flavor}.`
      );
    }
    setGuess('');
    // Load a new random profile for the next round
    setCurrentProfile(getRandomProfile());
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Terp Training Game</h2>
      <p>
        Identify the flavor for terpene:{' '}
        <strong>{currentProfile.name}</strong>
      </p>
      <input
        type="text"
        placeholder="Your guess"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={handleGuess} style={{ marginLeft: '1rem' }}>
        Submit Guess
      </button>
      {feedback && (
        <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>{feedback}</p>
      )}
    </div>
  );
};

export default TerpTraining;
