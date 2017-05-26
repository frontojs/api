const headers = () => {
  const h = new Headers();

  h.append('Content-Type', 'application/json');

  const token = localStorage.getItem('token');

  if (token) {
    h.append('Authorization', `Bearer ${token}`);
  }

  return h;
};

const request = (endpoint, method, resource, body) => {
  const url = [endpoint, resource].join("");
  const options = { method, headers: headers() };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(new Request(url, options));
};

export default (endpoint) => {
  return {
    get(_path) {
      return request(endpoint, 'GET', _path);
    },

    post(_path, data = {}) {
      return request(endpoint, 'POST', _path, data);
    },

    patch(_path, data = {}) {
      return request(endpoint, 'PATCH', _path, data);
    },

    delete(_path) {
      return request(endpoint, 'DELETE', _path);
    },
  }
};
