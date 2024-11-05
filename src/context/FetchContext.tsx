import {
  createContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosInstance } from 'axios';

const FetchContext = createContext<{
  authAxios: AxiosInstance | null;
  isTokenReady: boolean; // Add isTokenReady to the context
}>({
  authAxios: null,
  isTokenReady: false, // Provide a default value for isTokenReady
});
const { Provider } = FetchContext;

const FetchProvider = ({ children }: { children: ReactNode }) => {
  const [isTokenReady, setIsTokenReady] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string | undefined>();
  const { getAccessTokenSilently } = useAuth0();

  const getAccessToken = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      setAccessToken(token);
      setIsTokenReady(true);
    } catch (err) {
      console.log(err);
      setIsTokenReady(false);
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
      if (isTokenReady && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
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
        isTokenReady,
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
