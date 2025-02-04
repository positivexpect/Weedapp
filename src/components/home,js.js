// src/components/Home.js
import React from 'react';
import { useHistory } from 'react-router-dom';
import NavBar from './NavBar';

const Home = () => {
  const history = useHistory();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to Terp Taster</h1>
      <div style={{ margin: '1rem' }}>
        <button onClick={() => history.push('/master-review')}>
          Master Review / Taste Score
        </button>
      </div>
      <div style={{ margin: '1rem' }}>
        <button onClick={() => history.push('/basic-review')}>
          Basic Review
        </button>
      </div>
      <div style={{ margin: '1rem' }}>
        <button onClick={() => history.push('/search')}>
          Search Reviews
        </button>
      </div>
      <div style={{ margin: '1rem' }}>
        <button onClick={() => history.push('/training')}>
          Terp Training Game
        </button>
      </div>
    </div>
  );
};

export default Home;
