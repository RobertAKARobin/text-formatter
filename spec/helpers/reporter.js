const Reporter = require('jasmine-terminal-reporter');
const reporter = new Reporter({
	isVerbose: true,
	showColors: true
});

jasmine.getEnv().addReporter(reporter);
