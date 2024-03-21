module.exports = {
  analytics: {
    gaTrackingId: 'G-0X108W59H9',
  },
  apiPrefix: {
    '/api/v1': {
      prefix: process.env.API_PREFIX || 'https://dev.api.example.com',
    },
  },
  db: {
    connection: 'mongodb://',
    username: '',
    password: '',
    port: '27017',
    dbname: 'db-prod',
    host: 'localhost'
  }
};
