# Fronto Api

Basic wrapper for the fetch api, you can pass this object into a `fronto-connect` instance

## Basic Usage

``` js
import { Connect } from 'fronto-connect';
import api from 'fronto-api';

class Store extends Connect { 
  namespace = 'api/v1';
  resource = 'resource';
}

new Store(api(
  'https://endpoint', {
    header: (h) => {
      h.append('Some-Key', someValue);
    },
    request: {
      credentials: 'same-origin',
    }
  });
)
```