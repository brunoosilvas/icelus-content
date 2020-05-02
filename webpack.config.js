const path = require('path');

module.exports = {
   mode: 'production',
   entry: [
      './public/resources/static/_plugin/icelus-ui/js/ui-util.js',
      './public/resources/static/_plugin/icelus-ui/js/ui-badge.js',
      './public/resources/static/_plugin/icelus-ui/js/ui-button.js',
      './public/resources/static/_plugin/icelus-ui/js/ui-input-group.js',
      './public/resources/static/_plugin/icelus-ui/js/ui-list-content.js',
      './public/resources/static/_plugin/icelus-ui/js/ui-navbar.js',
      './public/resources/static/_plugin/icelus-ui/js/ui-select.js',
      './public/resources/static/_plugin/icelus-ui/js/ui.js',
   ],
   output: {
      path: path.resolve(__dirname, 'public/resources/static/_plugin/icelus-ui/js'),
      filename: 'icelus-ui.min.js'
   },
   watch: true
};
