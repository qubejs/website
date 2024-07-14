module.exports = {
  product: {
    name: 'REPM',
  },
  apiPrefix: {
    '/api/v1/': {
      prefix: process.env.API_PREFIX || 'https://app.service.homejrny.com',
    },
  },
  publicUrl: process.env.PUBLIC_URL || '',
  tenantCode: process.env.TENANT_CODE || 'nybblecore',
  reCaptcha: {
    siteKey: process.env.RECAPTCHA_SITE_KEY,
    secretKey: process.env.RECAPTCHA_SERVER_KEY,
  },
  email: {
    //email config
  },
  text: {
    enabled: false,
    loggerEnabled: false,
  },
  otp: {
    expiresIn: 60 * 5, // 5 minutes
  },

  analytics: {
    gaTrackingId: 'G-DSF2',
  },

  server: {
    host: 'http://dev.crm-sandbox.com',
  },
  cookie: {
    secret: 'sec',
    tokenKey: 'sec',
    checkLoginKey: 'df',
    secretKey: 'df',
    maxAge: 3 * 60 * 60 * 1000, // 3 hours
  },
 
  jwt: {
    secretKey: 'df',
    emailSecretKey: 'test',
  },
  session: {
    secure: true,
    timeout: '3h',
    emailTokenTimeout: '7d',
  },
  privateKey: 'test',
  db: {
    connection: 'mongodb://',
    username: '',
    password: '',
    port: '27017',
    dbname: 'crm-local',
    host: 'localhost',
  },
  log: 'debug',
};
