import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';

const FetchContext = createContext<{ authAxios: AxiosInstance | null }>({
  authAxios: null,
});
const { Provider } = FetchContext;

const FetchProvider = ({ children }: { children: ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { getAccessTokenSilently } = useAuth0();

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
    } catch (err) {
      console.log(err);
    }
  }, [getAccessTokenSilently]);

  useEffect(() => {
    getAccessToken();
  }, [getAccessToken]);

  const authAxios = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
  });

  authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  authAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const code = error && error.response ? error.response.status : 0;
      if (code === 401) {
        getAccessToken();
      }
      return Promise.reject(error);
    }
  );

  return (
    <Provider
      value={{
        authAxios,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
