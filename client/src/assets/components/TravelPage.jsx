import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import trips from '../../../../server/db';

const TravelPlaceSearchPage = () => {
  // State Hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating a fetch from the API
    const simulateFetch = () => {
      setLoading(true);
      setError(null);

      // Simulate an asynchronous operation
      setTimeout(() => {
        const places = trips.filter(place =>
          place.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(places);
        setLoading(false);
      }, 1000); // Simulating a delay of 1 second
    };

    simulateFetch();
  }, [searchTerm]);

  const openLinkInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div style={{  color: '#0ea5e9', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontSize: '3rem', margin: '3rem', letterSpacing: '.1rem', textTransform: 'uppercase' }}>Where do you want to go?</p>
        <div style={{ width: '100%', maxWidth: '800px', padding: '0 20px' }}>
          <span style={{ letterSpacing: '.1rem', fontSize: '1.3rem', display: 'block', marginBottom: '10px', color: '#0a0a0a' }}>Experience is key</span>
          <form>
            <label>
              <input style={{ width: '100%', height: '3rem', textAlign: 'center', letterSpacing: '.1rem', borderBottom: '1px solid #9ca3af', }} type="text" placeholder="choose your destination..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </label>
          </form>

          {loading && <p>Loading...</p>}

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <ul>
            {searchResults.map((place) => (
              <li style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'flex-start' }} key={place.eid}>
                <div style={{ marginRight: '1rem' }}>
                  {place.photos && place.photos.length > 0 && (
                    <img src={place.photos[0]} alt="Place" style={{ maxWidth: '20rem', borderRadius: '2rem' }} />
                  )}
                </div>
                <div>
                  <h3 style={{ color: 'black', fontSize: '1.3rem', fontWeight: '600',width:'40rem' }}>{place.title}</h3>
                  {place.description && (
                    <p style={{ color: '#71717a' }}>
                      {place.description.length > 100 ? `${place.description.substring(0, 100)}...` : place.description}
                    </p>
                  )}
                  <button onClick={() => openLinkInNewTab(place.url)}>Read more</button>
                  <hr style={{ flex: '1',width: '15%', borderColor:'#0ea5e9' }} />
                </div>
                </li>
              ))}
            </ul>
        </div>
      </div>
    </>
  );
};

export default TravelPlaceSearchPage;

// tags, photos , icon  and responsive still not finish yet

