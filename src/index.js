import './css/styles.css';
import onSearch from './fetchCountries';
var debounce = require('lodash.debounce');
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputEl = document.querySelector('#search-box');
const content = document.querySelector('.country-info');

inputEl.addEventListener('input', debounce(inputEnter, DEBOUNCE_DELAY));

function inputEnter(e) {
  const input = e.target.value.trim();
  console.log(input);
  if (input === '') {
    content.innerHTML = '';
    return;
  }
  onSearch(input)
    .then(data => {
      sortingCountrysArray(data);
    })
    .catch(error);
}
function error() {
  content.innerHTML = '';
  Notiflix.Notify.failure('Oops, there is no country with that name');
}
function sortingCountrysArray(data) {
  if (data.length >= 10) {
    content.innerHTML = '';
    Notiflix.Notify.info(
      'Too many matches found. Please enter a more specific name.'
    );
  } else if (data.length >= 2 && data.length < 10) {
    content.innerHTML = '';
    return insertContent(data, createCountrys);
  } else if (data.length === 1) {
    content.innerHTML = '';
    return insertContent(data, createCountry);
  }
}

function createCountry(item) {
  return `<h2><img class='flag'src="${
    item.flags.svg
  }" alt='Flag of this country'>
${item.name.official}</h2>
  <ul class='list'
    <li><span class='descr'>Capital:</span> ${item.capital}</li>
    <li><span class='descr'>Population:</span> ${item.population}</li>
    <li><span class='descr'>Languages:</span> ${Object.values(
      item.languages
    )}</li>
  </ul>`;
}

function createCountrys(item) {
  return `<h2 class='list-countrys'><img class='flags'src="${item.flags.svg}" alt='Flag of this country'>
${item.name.official}</h2>`;
}

const generateContent = (array, fn) =>
  array.reduce((acc, item) => acc + fn(item), '');

const insertContent = (array, fn) => {
  const result = generateContent(array, fn);
  content.insertAdjacentHTML('beforeend', result);
};
