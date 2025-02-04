import React, { useState } from 'react';
import NavBar from './NavBar';

const MasterReview = () => {
  const [inhaled, setInhaled] = useState('');
  const [exhaled, setExhaled] = useState('');
  const [score, setScore] = useState(null);
  const [feedback, setFeedback] = useState('');

  // Function to get current date/time in EST
  const getCurrentEST = () => {
    const date = new Date();
    const utc = date.getTime() + date.getTimezoneOffset() * 60000;
    // EST is UTC-5 (adjust if needed for daylight savings)
    const estDate = new Date(utc - 5 * 3600000);
    return estDate.toLocaleString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm("Are you sure you're done?")) {
      // Simulate score calculation
      const calculatedScore = inhaled === exhaled ? 100 : 50;
      setScore(calculatedScore);
      setFeedback(
        `Submitted on: ${getCurrentEST()}. Your score is ${calculatedScore}%.`
      );
      // Optionally clear the fields
      setInhaled('');
      setExhaled('');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Master Review / Taste Score</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Inhaled Terpenes: </label>
          <input
            type="text"
            value={inhaled}
            onChange={(e) => setInhaled(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Exhaled Terpenes: </label>
          <input
            type="text"
            value={exhaled}
            onChange={(e) => setExhaled(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
      {feedback && (
        <div
          style={{
            marginTop: '1rem',
            background: '#e0e0e0',
            padding: '1rem',
            borderRadius: '4px',
          }}
        >
          {feedback}
        </div>
      )}
    </div>
  );
};

export default MasterReview;
