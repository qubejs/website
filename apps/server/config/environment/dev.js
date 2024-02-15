module.exports =  {
  email: {
    enabled: true,
    loggerEnabled: false,
  },
  apiPrefix: {
    '/api/v1': {
      prefix: process.env.API_PREFIX || 'https://dev.api.example.com',
    },
  },
  server: {
    host: process.env.HOST_URL || 'https://dev.example.com',
  },
};
