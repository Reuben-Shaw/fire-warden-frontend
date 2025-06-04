const useLocalAPI = true;

const config = {
  useLocalAPI,
  apiBaseUrl: useLocalAPI
    ? 'http://localhost:7071/api'
    : 'https://fire-warden-api.azurewebsites.net/api'
};

export default config;