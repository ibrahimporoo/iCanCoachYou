const path = require('path')

module.exports = {
	mode: 'development',
	entry: './assets/js/deal-with-firebase.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'deal-with-firebase-bundle.js'
	},
	mode: 'development',
	entry: './assets/js/roadmap-input.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'roadmap-output.js'
	},
	mode: 'development',
	entry: './assets/js/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'output.js'
	},
	mode: 'development',
	entry: './assets/js/multiple-steps-form.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'multiple-steps-form.js'
	},
	watch: true
}