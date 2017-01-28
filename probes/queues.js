var pmx = require('pmx');
var kue = require('kue');
var createQueue = require('../helpers/createQueue.js');

var probe = pmx.probe();

function QueuesWatcher(conf) {
  this.interval = conf.small_interval;

  this.queue = createQueue(conf);
  this.probes = {
    'complete-queues': probe.metric({
      name: 'Complete queues',
      value: 'N/A'
    }),
    'active-queues': probe.metric({
      name: 'Active queues',
      value: 'N/A'
    }),
    'inactive-queues': probe.metric({
      name: 'Inactive queues',
      value: 'N/A',
      alert : {
        mode : 'threshold',
        value : 1,
        interval : 100,
        cmp : '>'
      }
    }),
    'failed-queues': probe.metric({
      name: 'Failed queues',
      value: 'N/A',
      alert : {
        mode : 'threshold',
        value : 1,
        interval : 100,
        cmp : '>'
      }
    }),
    'kue-module-version': probe.metric({
      name: 'Kue module version',
      value: 'N/A'
    }),
  };
}

QueuesWatcher.prototype.refresh = function() {

  var self = this;

  self.queue.completeCount(function(err, total) {
    self.probes['complete-queues'].set(total);
  });

  self.queue.activeCount(function(err, total) {
    self.probes['active-queues'].set(total);
  });

  self.queue.inactiveCount(function(err, total) {
    self.probes['inactive-queues'].set(total);
  });
  self.queue.failedCount(function(err, total) {
    self.probes['failed-queues'].set(total);
  });

  self.probes['kue-module-version'].set(kue.version);

  setTimeout(function refresh() {
    self.refresh();
  }, self.interval * 1000);
};

function init(conf) {
  var queues = new QueuesWatcher(conf);
  queues.refresh();
}

module.exports.init = init;
