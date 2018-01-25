const pino = require('pino');
let pinoConfig = {
  name: 'jobbox',
  safe: true,
  timestamp: true,
  prettyPrint: false,
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res
  }
};

module.exports = pinoConfig;
