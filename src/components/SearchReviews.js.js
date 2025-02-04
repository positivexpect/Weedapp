import React, { useState } from 'react';

const SearchReviews = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // Options: "all" or "master"

  // Dummy reviews data for testing
  const reviews = [
    { id: 1, type: 'master', strain: 'Blue Dream', location: 'CO' },
    { id: 2, type: 'basic', strain: 'OG Kush', location: 'CA' },
  ];

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.strain
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === 'all' || (filter === 'master' && review.type === 'master');
    return matchesSearch && matchesFilter;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Search Reviews</h2>
      <div>
        <input
          type="text"
          placeholder="Search by strain name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ marginLeft: '1rem' }}
        >
          <option value="all">All Reviews</option>
          <option value="master">Master Reviews Only</option>
        </select>
      </div>
      <div style={{ marginTop: '1rem' }}>
        {filteredReviews.map((review) => (
          <div
            key={review.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            <p>
              <strong>Strain:</strong> {review.strain}
            </p>
            <p>
              <strong>Location:</strong> {review.location}
            </p>
            <p>
              <strong>Type:</strong> {review.type}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchReviews;
