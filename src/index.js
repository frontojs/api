export default (endpoint, options = { header: null, request: {}}) => {
  const headers = () => {
    const h = new Headers();

    h.append('Content-Type', 'application/json');
    if (options.header) options.header(h);
    return h;
  };

  const request = (endpoint, method, resource, body) => {
    const url = [endpoint, resource].join("");
    const reqOptions = { method, headers: headers(), ...options.request };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(new Request(url, reqOptions));
  };

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
