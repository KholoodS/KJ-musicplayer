// Replace with your actual Client ID
const CLIENT_ID = '3d130652e54449ada58a3c2c993d3396';
const REDIRECT_URI = 'http://127.0.0.1:5500/index.html'; // Make sure this matches your live server URL

// Spotify Web API endpoints
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

// After user logs in and authorizes, handle the redirect and retrieve access token
const handleRedirect = () => {
  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get('access_token');
  
  if (accessToken) {
    // Store access token and use it for API requests
    // You can implement better security practices to store tokens
    localStorage.setItem('access_token', accessToken);
    
    // Remove access token from URL
    window.location.hash = '';
    
    // Start using the access token
    getMyTopTracks(accessToken);
  }
};

// Retrieve user's top tracks using the access token
const getMyTopTracks = (accessToken) => {
  fetch(`${SPOTIFY_API_BASE}/me/top/tracks`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    // Process data and display on your app
    console.log(data);
  })
  .catch(error => {
    console.error('Error fetching top tracks:', error);
  });
};

// Handle login button click
const loginButton = document.getElementById('loginButton');
loginButton.addEventListener('click', () => {
  // Redirect user to Spotify for authorization
  window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
});

// Check if user has an access token in URL
if (window.location.hash) {
  handleRedirect();
}
