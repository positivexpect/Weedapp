import React, { useState } from 'react';

const BasicReview = () => {
  const [strain, setStrain] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(0);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission (you can later hook this up to an API)
    setSubmitted(true);
    // Optionally clear fields
    setStrain('');
    setLocation('');
    setRating(0);
    setNotes('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Basic Review</h2>
      {submitted && <p>Review submitted!</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Strain Name: </label>
          <input
            type="text"
            value={strain}
            onChange={(e) => setStrain(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location: </label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rating (0-10): </label>
          <input
            type="number"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            min="0"
            max="10"
            required
          />
        </div>
        <div>
          <label>Notes: </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Submit Basic Review</button>
      </form>
    </div>
  );
};

export default BasicReview;
