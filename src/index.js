export default (args = {endpoint: '', header: null, request: {}}) => {
  const headers = () => {
    const h = new Headers();

    h.append('Content-Type', 'application/json');
    if (args.header) args.header(h);
    return h;
  };

  const request = (endpoint, method, resource, body) => {
    const url = [endpoint, resource].join("");
    const options = { method, headers: headers(), ...args.request };

    if (body) {
      options.body = JSON.stringify(body);
    }

    return fetch(new Request(url, options));
  };

  return {
    get(_path) {
      return request(args.endpoint, 'GET', _path);
    },

    post(_path, data = {}) {
      return request(args.endpoint, 'POST', _path, data);
    },

    patch(_path, data = {}) {
      return request(args.endpoint, 'PATCH', _path, data);
    },

    delete(_path) {
      return request(args.endpoint, 'DELETE', _path);
    },
  }
};
