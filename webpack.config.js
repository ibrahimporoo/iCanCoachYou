const path = require('path')

module.exports = {
  mode: 'development',
  entry: {
    'deal-with-firebase-bundle': './assets/js/deal-with-firebase.js',
    'roadmap-bundle': './assets/js/roadmap-input.js',
    'output': './assets/js/index.js',
    'single-coach-profile-bundle': './assets/js/single-coach-profile.js',
    'multiple-steps-form-bundle': './assets/js/multiple-steps-form.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  watch: true
}

