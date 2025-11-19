// Get current year and last modified date
document.addEventListener('DOMContentLoaded', () => {
  // Set current year in footer
  document.getElementById('year').textContent = new Date().getFullYear();
  
  // Set last modified date
  document.getElementById('lastModified').textContent = document.lastModified;

  // Handle mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      navMenu.classList.remove('active');
    });
  });

  // Load weather data
  loadWeather();

  // Load spotlight members
  loadSpotlights();
});

function getWeatherDescription(code) {
  // WMO Weather interpretation codes
  const weatherCodes = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Foggy',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Heavy Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Slight Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    77: 'Snow Grains',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Hail',
    99: 'Thunderstorm with Hail'
  };
  
  return weatherCodes[code] || 'Unknown Weather';
}

async function loadWeather() {
  const weatherContainer = document.querySelector('.weather-container .current-weather');
  const forecastContainer = document.getElementById('forecast-container');
  
  try {
    // Springfield, Missouri coordinates
    const lat = 37.2081;
    const lon = -93.2723;
    
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America/Chicago&temperature_unit=fahrenheit`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.current || !data.daily) {
      throw new Error('Invalid weather data structure');
    }
    
    const current = data.current;
    const daily = data.daily;
    const weatherDesc = getWeatherDescription(current.weather_code);
    
    weatherContainer.innerHTML = `
      <div class="weather-current">
        <p class="weather-temp">${Math.round(current.temperature_2m)}°F</p>
        <p class="weather-desc">${weatherDesc}</p>
        <p class="weather-location">Right now in Springfield</p>
      </div>
    `;
    
    let forecastHTML = '<div class="forecast-items">';
    for (let i = 1; i <= 3; i++) {
      if (daily.time[i]) {
        const date = new Date(daily.time[i]);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        const maxTemp = Math.round(daily.temperature_2m_max[i]);
        const minTemp = Math.round(daily.temperature_2m_min[i]);
        const desc = getWeatherDescription(daily.weather_code[i]);
        
        forecastHTML += `
          <div class="forecast-day">
            <p class="forecast-date"><strong>${dayName}</strong></p>
            <p class="forecast-condition">${desc}</p>
            <p class="forecast-temps">High: ${maxTemp}°F | Low: ${minTemp}°F</p>
          </div>
        `;
      }
    }
    forecastHTML += '</div>';
    forecastContainer.innerHTML = forecastHTML;
    
  } catch (error) {
    console.error('Weather Error:', error);
    weatherContainer.innerHTML = `<p class="error-message">Unable to load weather data. Please try again later.</p>`;
    forecastContainer.innerHTML = '';
  }
}

async function loadSpotlights() {
  const spotlightsContainer = document.getElementById('spotlights-container');
  
  try {
    const response = await fetch('data/members.json');
    if (!response.ok) throw new Error('Unable to load member data');
    
    const members = await response.json();
    
    // Filter for gold and silver members
    const eligibleMembers = members.filter(member => 
      member.level === 'gold' || member.level === 'silver'
    );
    
    if (eligibleMembers.length === 0) {
      spotlightsContainer.innerHTML = '<p>No featured members available.</p>';
      return;
    }
    
    // Randomly select 2-3 members
    const spotlightCount = Math.min(3, Math.max(2, eligibleMembers.length));
    const selectedSpotlights = [];
    const shuffled = [...eligibleMembers].sort(() => Math.random() - 0.5);
    
    for (let i = 0; i < spotlightCount && i < shuffled.length; i++) {
      selectedSpotlights.push(shuffled[i]);
    }
    
    // Display spotlight cards
    let spotlightsHTML = '';
    selectedSpotlights.forEach(member => {
      spotlightsHTML += `
        <div class="spotlight-card">
          <img src="${member.image}" alt="${member.name}" class="spotlight-image">
          <div class="spotlight-info">
            <h3 class="spotlight-name">${member.name}</h3>
            <span class="spotlight-level ${member.level}">${member.level.charAt(0).toUpperCase() + member.level.slice(1)} Member</span>
            <p class="spotlight-address">${member.address}</p>
            <p class="spotlight-phone">Phone: <a href="tel:${member.phone}">${member.phone}</a></p>
            <p class="spotlight-website">Website: <a href="https://${member.website}" target="_blank">${member.website}</a></p>
          </div>
        </div>
      `;
    });
    
    spotlightsContainer.innerHTML = spotlightsHTML;
    
  } catch (error) {
    console.error('Error loading spotlights:', error);
    spotlightsContainer.innerHTML = '<p>Unable to load featured members.</p>';
  }
}
