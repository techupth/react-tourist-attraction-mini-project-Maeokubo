
import React, { useState, useEffect } from 'react';
import trips from '../../../server/db';

const TravelPlaceSearchPage = () => {
  // State Hooks
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    console.log(`Clicked category: ${category}`);
    
    // Check if the clicked category is already in the search term
    if (searchTerm.toLowerCase().includes(category.toLowerCase())) {
      // If it is, remove the category from the search term
      setSearchTerm((prevSearchTerm) => {
        const updatedSearchTerm = prevSearchTerm
          .toLowerCase()
          .replace(new RegExp(`${category.toLowerCase()}\\s*`), '');
        return updatedSearchTerm.trim();
      });
    } else {
      // If it's not, add the category to the search term
      setSearchTerm((prevSearchTerm) => {
        const newSearchTerm = prevSearchTerm ? `${prevSearchTerm} ${category}` : category;
        return newSearchTerm;
      });
    }
    // Store the clicked category in state
    setSelectedCategory(category);
  }

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
        
        const errorOccurred =  Math.random() > 0.5 ;
        if (errorOccurred) {
          setError("An error occurred");
          setSearchResults([]);
        } else {
          setSearchResults(places);
          setError(null); // Clear the error when the operation is successful
        }

        setLoading(false);
      }, 1000); // Simulating a delay of 1 second
    };

    simulateFetch();
  }  , [searchTerm, selectedCategory]);  
    

  const openLinkInNewTab = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
      <div style={{  color: '#0ea5e9', width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
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
                <div style={{ marginRight: '1.8rem'}}>
                  {place.photos && place.photos.length > 0 && (
                  <img src={place.photos[0]} alt="Place" style={{width: '20rem', height: '15rem', maxWidth: '20rem', borderRadius: '2rem' }} />           
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

                  <div className="flex gap-2 text-gray-500">
                    หมวด
                    {place.tags.map((tag, index) => (
                      <React.Fragment key={index}>
                        <a href="#" target="_blank" className={`flex gap-2 items-center text-gray-500 underline${tag === selectedCategory ? ' selected' : ''}`}
                        style={{ marginRight: '0.5rem' }}
                        onClick={() => handleCategoryClick(tag)}
                        >
                        {tag}
                        </a>
                        {index === place.tags.length - 2 && <span className="text-gray-500">และ</span>}
                      </React.Fragment>
                    ))}
                  </div>  

                  <div className='flex gap-4 mt-2 '>
                    {place.photos && Array.isArray(place.photos) && place.photos.slice(1).map((photo,index) => (
                      <img key={index} src={photo} alt={`Place Photo ${index + 1}`} className='w-16 h-16 rounded-md' />
                    ))}
                  </div>
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


