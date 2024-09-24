'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

function renderCountry(data, className = '') {
  const html = `
      <article class="country ${className}">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
          <h3 class="country__name">${data.name}</h3>
          <h4 class="country__region">${data.region}</h4>
          <p class="country__row"><span>👫</span>${(data.population/1000000).toFixed(1)}</p>
          <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
          <p class="country__row"><span>💰</span>${data.currencies[0].code}</p>
        </div>
      </article>
  `

  countriesContainer.insertAdjacentHTML('beforeend', html)
  countriesContainer.style.opacity = 1;
}

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

function getDataCountry(country) {
  const response = fetch(`https://restcountries.com/v2/name/${country}`)
  .then(response => {
    if(!response.ok) throw new Error('Country not found!')
    return response.json()
  }).then(data => {
    renderCountry(data[0])
    const neighbour = data[0].borders[1];
    return fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
  }).then(response => {
    if(!response.ok) throw new Error('Country neighbour not found!')
    return response.json();
  }).then(data => {
    renderCountry(data, 'neighbour')
  })
  .catch(error => {
    return renderError(`${error.message} Please try again!`)
  })
}

btn.addEventListener('click', function(){
  getDataCountry('vietnam')
})