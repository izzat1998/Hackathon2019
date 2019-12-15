import axios from 'axios';
import { AsyncStorage } from 'react-native';

export function execute(promise) {
  return new Promise((resolve, reject) => {
    promise.then((response) => {
      resolve(response.data);
    })
      .catch((error) => {
        reject(error);
      });
  });
}

export default (url, method, data, token) => axios({
  method,
  url: `http://makhmudjon.me/api/${url}`,
  headers: `Bearer ${token}`,
  data
});
