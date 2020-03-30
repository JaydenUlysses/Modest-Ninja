const axios = require('axios');

const urlInitER = 'https://api.exchangeratesapi.io';
const urlInitCG = 'https://api.coingecko.com/api/v3';

const favCurrenciesER = ['USD', 'JPY', 'GBP', 'CHF'];
const favCurrenciesCG = ['eur'];

function fetchDataFrom(apiUrl) {
  const newRequest = axios.get(apiUrl);
  return newRequest;
}

function checkStatusCode(rawResponse) {
  if (rawResponse.status === 200) {
    // console.log('Status is OK.');
    return Promise.resolve(rawResponse);
  } if (rawResponse.status === 404) {
    throw new Error('Content was not found.');
  } else {
    throw new Error(`Error occured - status: ${rawResponse.status}`);
  }
}

function arrayContainsKey(array, key) {
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] === key) {
      return true;
    }
  }
  return false;
}

function getCurrenciesER(responseAllCurrencies, requiredCurrencies) {
  const result = {};
  Object.keys(responseAllCurrencies.rates).forEach((key) => {
    if (arrayContainsKey(requiredCurrencies, key)) {
      result[key] = responseAllCurrencies.rates[key];
    }
  });
  return result;
}

function getCurrenciesCG(responseAllCurrencies, requiredCurrencies) {
  const result = {};
  Object.keys(responseAllCurrencies.bitcoin).forEach((key) => {
    if (arrayContainsKey(requiredCurrencies, key)) {
      result[key] = responseAllCurrencies.bitcoin[key];
    }
  });
  return result;
}

exports.urlInitER = urlInitER;
exports.urlInitCG = urlInitCG;
exports.fetchDataFrom = fetchDataFrom;
exports.checkStatusCode = checkStatusCode;
exports.arrayContainsKey = arrayContainsKey;
exports.getCurrenciesER = getCurrenciesER;
exports.getCurrenciesCG = getCurrenciesCG;

// most recent data (exchange rate for 1 euro to all other currencies) from exchangerates API
fetchDataFrom(`${urlInitER}/latest`)
  .then((receivedResponse) => checkStatusCode(receivedResponse))
  .then((allcurrencies) => getCurrenciesER(allcurrencies.data, favCurrenciesER))
  .then((data) => console.log(data))
  .catch((error) => console.log(error));

// most recent data (value of 1 bitcoin in euro) from Coin Gecko API
fetchDataFrom(`${urlInitCG}/simple/price?ids=bitcoin&vs_currencies=eur`)
  .then((receivedResponse) => checkStatusCode(receivedResponse))
  .then((allcurrencies) => getCurrenciesCG(allcurrencies.data, favCurrenciesCG))
  .then((data) => console.log(data))
  .catch((error) => console.log(error));
