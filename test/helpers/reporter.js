const mocha = require('mocha')

module.exports = function(runner){
	mocha.reporters.Base.call(this, runner)
	let passes = 0, fails = 0
	
	runner.on('pass', ()=>{
		passes += 1
	})
	
	runner.on('fail', (test, err)=>{
		fails += 1
		console.log(`\n===FAIL ${fails}===`)
		console.log('Exp: ' + err.expected)
		console.log('Act: ' + err.actual)
	})
	
	runner.on('end', ()=>{
		console.log('\n===SUMMARY===')
		console.log('Pass: ' + passes)
		console.log('Fail: ' + fails)
		process.exit()
	})
}