var pmx = require('pmx');
var kue = require('kue');
var createQueue = require('../helpers/createQueue.js');

var probe = pmx.probe();

function init(conf) {
  var self = this;

  this.queue = createQueue(conf);

  pmx.action('requeue all jobs', function(reply) {
    // Re-queue all stuck jobs
    self.queue.active(function(err, ids) {
      ids.forEach(function(id) {
        kue.Job.get(id, function(err, job) {
          job.inactive();
        });
      });
      reply('Done !');
    });
  });

  pmx.action('shutdown kue', function(reply) {
    // Shut down kue
    self.queue.shutdown(5000, function(err) {
      if (err) {
        reply(err);
      } else {
        reply('Done !');
      }
    });
  });
}

module.exports.init = init;
