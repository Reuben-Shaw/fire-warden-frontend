const useLocalAPI = false;

const config = {
  useLocalAPI,
  apiBaseUrl: useLocalAPI
    ? 'http://localhost:7071/api'
    : 'https://fire-warden-api.azurewebsites.net.net/api'
};

export default config;