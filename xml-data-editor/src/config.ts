// Konfigurationseinstellungen für verschiedene Umgebungen

interface Config {
  backendUrl: string;
}

const development: Config = {
  backendUrl: 'http://localhost:8082'
};

const production: Config = {
  backendUrl: 'https://your-production-backend-url.com'
};

const config = process.env.NODE_ENV === 'production' ? production : development;

export default config;
