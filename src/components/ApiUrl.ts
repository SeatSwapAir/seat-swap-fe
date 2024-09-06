import axios from 'axios';

let tokenPromiseResolve: (value: string | null) => void;
let tokenPromise: Promise<string | null> = new Promise((resolve) => {
  tokenPromiseResolve = resolve;
});

const apiUrl = axios.create({
  baseURL: 'http://localhost:9090/api',
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json',
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    console.log('Setting Authorization header');
    apiUrl.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    console.log('Removing Authorization header');
    delete apiUrl.defaults.headers.common['Authorization'];
  }

  // Resolve the promise with the token value
  tokenPromiseResolve(token);

  // Create a new promise for future token changes
  tokenPromise = new Promise((resolve) => {
    tokenPromiseResolve = resolve;
  });

  console.log('Current headers:', apiUrl.defaults.headers.common);
};

// Intercept requests to wait for the token to be set before proceeding.
apiUrl.interceptors.request.use(
  async (config) => {
    console.log('Waiting for token...');
    const token = await tokenPromise; // Wait for the token to be set
    if (token) {
      console.log('Token available, attaching to request:', token);
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.log(
        'No token available, sending request without Authorization header'
      );
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiUrl;
