var kue = require('kue');

function createQueue(conf) {
  var kueConf = {};

  if (conf.kue_redis_host) {
    kueConf.redis = {
      host: conf.kue_redis_host,
      port: conf.kue_redis_port,
      auth: conf.kue_redis_pwd,
      options: {
        // see https://github.com/mranney/node_redis#rediscreateclient
      }
    }
  } else if (conf.kue_redis_url) {
    kueConf.redis = conf.kue_redis_url;
  }

  return kue.createQueue(kueConf);
}

module.exports = createQueue;
