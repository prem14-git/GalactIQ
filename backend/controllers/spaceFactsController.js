import axios from 'axios';

// NASA APOD API endpoint
const NASA_API_KEY = 'bg74fuWKK6LOVIW6fgfhTCgz4YDj4bQJTUu7AXTt';
const NASA_BASE_URL = 'https://api.nasa.gov/planetary/apod';

// Generate random date between 1995-06-16 and today
const generateRandomDate = () => {
  const startDate = new Date('1995-06-16');
  const endDate = new Date();
  const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTime);
  return randomDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
};

// GET /api/space-facts/random
export const getRandomSpaceFact = async (req, res) => {
  try {
    const randomDate = generateRandomDate();
    const response = await axios.get(`${NASA_BASE_URL}?date=${randomDate}&api_key=${NASA_API_KEY}`);
    
    const factData = {
      title: response.data.title,
      explanation: response.data.explanation,
      imageUrl: response.data.url,
      date: response.data.date,
      mediaType: response.data.media_type,
      copyright: response.data.copyright || 'NASA'
    };
    
    res.json(factData);
  } catch (error) {
    console.error('Error fetching space fact:', error);
    
    // Fallback response if NASA API fails
    const fallbackFacts = [
      {
        title: "The Universe is Expanding",
        explanation: "The universe is expanding at an accelerating rate, a discovery that earned the 2011 Nobel Prize in Physics. This expansion means that galaxies are moving away from each other, and the space between them is growing larger.",
        imageUrl: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=800",
        date: new Date().toISOString().split('T')[0],
        mediaType: "image",
        copyright: "NASA"
      },
      {
        title: "Black Holes",
        explanation: "Black holes are regions of spacetime where gravity is so strong that nothing, not even light, can escape. They form when massive stars collapse at the end of their life cycle.",
        imageUrl: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800",
        date: new Date().toISOString().split('T')[0],
        mediaType: "image",
        copyright: "NASA"
      },
      {
        title: "The Milky Way Galaxy",
        explanation: "Our Milky Way galaxy contains between 100-400 billion stars and is about 100,000 light-years across. It's just one of billions of galaxies in the observable universe.",
        imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
        date: new Date().toISOString().split('T')[0],
        mediaType: "image",
        copyright: "NASA"
      }
    ];
    
    const randomFallback = fallbackFacts[Math.floor(Math.random() * fallbackFacts.length)];
    res.json(randomFallback);
  }
};

// GET /api/space-facts/today
export const getTodaySpaceFact = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const response = await axios.get(`${NASA_BASE_URL}?date=${today}&api_key=${NASA_API_KEY}`);
    
    const factData = {
      title: response.data.title,
      explanation: response.data.explanation,
      imageUrl: response.data.url,
      date: response.data.date,
      mediaType: response.data.media_type,
      copyright: response.data.copyright || 'NASA'
    };
    
    res.json(factData);
  } catch (error) {
    console.error('Error fetching today\'s space fact:', error);
    res.status(500).json({ error: 'Failed to fetch today\'s space fact' });
  }
}; 