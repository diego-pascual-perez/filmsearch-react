const apiKey = 'f12ba140';
const urlServer = `http://www.omdbapi.com/?apikey=${apiKey}`;

exports.get = (obj = {}) => {
  return new Promise((resolve, reject) => {
    let urlParameters = Object.entries(obj)
      .map(e => encodeURIComponent(e[0]) + '=' + encodeURIComponent(e[1]))
      .join('&');

    fetch(urlServer + '&' + urlParameters)
      .then(res => res.json())
      .then(json => {
        if (json.Response === 'True') {
          resolve(json);
        } else {
          reject(json.Error);
        }
      })
      .catch(err => {
        console.log(err);
        reject('api error');
      });
  });
};
