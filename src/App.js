// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import MasterReview from './components/MasterReview';
import BasicReview from './components/BasicReview';
import SearchReviews from './components/SearchReviews';
import TerpTraining from './components/TerpTraining';

console.log("New App Loaded");

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/master-review" component={MasterReview} />
        <Route path="/basic-review" component={BasicReview} />
        <Route path="/search" component={SearchReviews} />
        <Route path="/training" component={TerpTraining} />
        {/* Catch-all for unmatched routes */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
