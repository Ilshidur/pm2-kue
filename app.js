var pmx = require('pmx');
var queues = require('./probes/queues.js');
var actions = require('./probes/actions.js');

pmx.initModule({
  widget: {
    type: 'generic',

    // Logo to be displayed on the top left block (must be https)
    logo: '',

    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme: [
      '#8f6300',
      '#28271b',
      '#807C7C',
      '#807C7C',
    ],

    // Toggle horizontal blocks above main widget
    el: {
      probes: true,
      actions: true,
    },

    block: {
      // Display remote action block
      actions: true,

      // Display CPU / Memory
      cpu: false,
      mem: false,

      // Issues count display
      issues: false,

      // Display meta block
      meta: true,

      // Display metadata about the probe (restart nb, interpreter...)
      meta_block: true,

      // Name of custom metrics to be displayed as a "major metrics"
      main_probes: [
        'Complete queues',
        'Active queues',
        'Inactive queues',
        'Failed queues',
      ],
    }
  }
}, function(err, conf) {
  /*
    Module entry
   */

  queues.init(conf);
  actions.init(conf);
});
