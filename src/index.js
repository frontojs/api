const api = (args = {endpoint: '', header: null, request: {}}) => {
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
    endpoint: args.endpoint,
    header: args.header,
    request: args.request,
    get(_path) {
      return request(this.endpoint, 'GET', _path);
    },

    post(_path, data = {}) {
      return request(this.endpoint, 'POST', _path, data);
    },

    patch(_path, data = {}) {
      return request(this.endpoint, 'PATCH', _path, data);
    },

    delete(_path) {
      return request(this.endpoint, 'DELETE', _path);
    },
  }
};

const scopeTo = (rootApi, scopePath) => {
  const scopedApiEndpoint = rootApi.endpoint + scopePath;

  return api({
    endpoint: scopedApiEndpoint, 
    header: rootApi.header, 
    request: rootApi.request
  });
}

export { api, scopeTo };
