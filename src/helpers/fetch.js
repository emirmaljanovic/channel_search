export const REDIRECT_URI = 'http://localhost';
export const CLIENT_ID = '';

const FETCH_HEADER = {
  'Client-ID': CLIENT_ID,
  'Accept': 'application/vnd.twitchtv.v5+json',
  'Content-Type': 'application/json; charset=utf-8'
};

export const getTokenFromUrl = () => {
  const hasToken = window.location.href.indexOf('access_token') > -1;
  const token = hasToken ? window.location.href.substring(window.location.href.indexOf('access_token') + 13, window.location.href.indexOf('scope') - 1) : null;

  return token;
};

export const get = ({ url }) =>
  fetch(url, {
      method: 'GET',
      mode: "cors", // no-cors, cors, *same-origin
      headers: {
        ...FETCH_HEADER
      }
    })
    .then((response) => response.json())