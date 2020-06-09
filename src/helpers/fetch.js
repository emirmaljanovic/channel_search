const CLIENT_ID = '';

const FETCH_HEADER = {
  'Client-ID': CLIENT_ID,
  'Accept': 'application/vnd.twitchtv.v5+json',
  'Content-Type': 'application/json; charset=utf-8'
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


export function debounce(func, wait, immediate) {
  var timeout;

  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};