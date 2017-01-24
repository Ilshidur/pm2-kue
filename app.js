var pmx = require('pmx');

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
      '#111111',
      '#1B2228',
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
        'Processes'
      ],
    }
  }
}, function(err, conf) {
  /*
    Module entry
   */
  console.log(conf);
});
