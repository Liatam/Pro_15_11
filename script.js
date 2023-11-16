import { fetchCountry, fetchHome, fetchFlags, fetchSearchCountry, fetchCountryCode } from './functions.js';
let flagsArray = [];

const displayCountryInfo = (countryData, containerId) => {
  const countryInfoDiv = document.getElementById(containerId);
  const borderLinks = Array.isArray(countryData.borders) ? countryData.borders.map(border => `<a href="#" class="border-link" data-border="${border}">${border}</a>`).join(', ') : '';

  countryInfoDiv.innerHTML = `
  <div class="row" id="countryInfo">
    <div class="col"><img src="${countryData.flags.png}" alt="Flag"></div>
    <div class="col">
      <h2>${countryData.name.common}</h2>
      <p>Capital: ${countryData.capital[0]}</p>
      <p>Population: ${countryData.population}</p>
      <p>Languages: ${Object.values(countryData.languages).join(', ')}</p>
      <p>Borders: ${borderLinks}</p>
    </div>
    <iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?q=${countryData.latlng[0]},${countryData.latlng[1]}&hl=iw&z=5&amp;output=embed"></iframe>
  </div>
    `;
};

const addBorderLinkEventListeners = () => {
  const borders = document.querySelectorAll('.border-link');
  borders.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      displayBorderData(event.target.dataset.border);
    });
  });
};

const displayData = async (country) => {
  document.getElementById('home').innerHTML = ' ';
  const countryData = await fetchCountry(country);
  displayCountryInfo(countryData, 'countryCon');
  addBorderLinkEventListeners();
};

const displayBorderData = async (country) => {
  document.getElementById('home').innerHTML = ' ';
  const countryData = await fetchCountryCode(country);
  displayCountryInfo(countryData, 'countryCon');
  addBorderLinkEventListeners();
};

const displayHome = async () => {
  const homeData = await fetchHome();
  const homeInfoDiv = document.getElementById('home');
  homeInfoDiv.innerHTML = ' ';
  document.getElementById('countryCon').innerHTML = '';

  for (const country of homeData) {
    const borderLinks = Array.isArray(country.borders) ? country.borders.map(border => `<a href="#" class="border-link" data-border="${border}">${border}</a>`).join(', ') : '';

    homeInfoDiv.innerHTML += `
      <div class="col">
        <img src="${country.flags.png}" alt="Flag" width="320" height="200">
        <h2>${country.name.common}</h2>
        <p>Capital: ${country.capital[0]}</p>
        <p>Population: ${country.population}</p>
        <p>Languages: ${Object.values(country.languages).join(', ')}</p>
        <p>Borders: ${borderLinks}</p>
      </div>
    `;
  }

  addBorderLinkEventListeners();
};

const handleSearch = async (event) => {
  event.preventDefault();
  const searchInputValue = document.getElementById('searchInput').value;

  try {
    const countryData = await fetchSearchCountry(searchInputValue);
    if (countryData === null) {
      alert('Country not found');
    } else {
      displayCountryInfo(countryData, 'countryCon');
      addBorderLinkEventListeners();
    }
  } catch (error) {
    alert('An error occurred while fetching country data.');
  }
};


const displayFlags = async () => {
  // Fetch flags only if the array is empty
  if (flagsArray.length === 0) {
    flagsArray = await fetchFlags();
  }

  const carouselContainer = document.getElementById('flag-carousel');
  flagsArray.forEach(country => {
    const flagElement = document.createElement('div');
    flagElement.className = 'flag';
    flagElement.innerHTML = `<img src="${country.flags.png}" alt="${country.name.common} Flag">`;

    const flagImage = flagElement.querySelector('img');
    flagImage.addEventListener('click', () => {
      displayData(country.name.common);
    });
    carouselContainer.appendChild(flagElement);
  });

  function moveCarousel() {
    const firstFlag = carouselContainer.firstElementChild;
    carouselContainer.appendChild(firstFlag);
  }
  setInterval(moveCarousel, 1000);
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('homePage').addEventListener('click', displayHome);
  document.getElementById('usa').addEventListener('click', () => displayData('usa'));
  document.getElementById('thailand').addEventListener('click', () => displayData('thailand'));
  document.getElementById('israel').addEventListener('click', () => displayData('israel'));
  document.getElementById('france').addEventListener('click', () => displayData('france'));
  document.getElementById('uk').addEventListener('click', () => displayData('uk'));
  document.getElementById('searchForm').addEventListener('submit', handleSearch);
  displayHome();
  displayFlags();
});