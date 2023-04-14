import {State} from 'country-state-city';

export const getStatesfromLibrary = async code => {
  let getState = new Promise((resolve, reject) => {
    let countries = [];
    let countryJson = State.getStatesOfCountry(code);
    if (!!countryJson) {
      resolve(countryJson);
    } else {
      reject();
    }
  });
  return getState;
};
