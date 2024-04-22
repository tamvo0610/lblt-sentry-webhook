import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3000,
  },
  swagger: {
    enabled: true,
    title: 'Nest Mongo',
    description: 'Practice of Nest Mongo API description',
    version: '1.0',
    path: 'swagger',
  },
  mongoose: {
    dbName: '',
    dbUrl: '',
  },
  sentry: {
    dns: 'https://8c0eaf743fbd2061b79955a8b2b6060b@o4507020842434560.ingest.us.sentry.io/4507026009686016',
    token: '812e054c20d902e044d83efbb1f3d619bdca4bed6a26223c5fca92c2683b007f',
    api_secret:
      '618c26bc93ee4d2dcd48f1ba2507a4ab9106d29c9f430c6ef795eac5ccdd8943',
    org: 'liberty-technology-00',
  },
};

export default (): Config => config;
