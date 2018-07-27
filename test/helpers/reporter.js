const mocha = require('mocha')

function color(string){
	const bgYel = "\x1b[43m"
	const txBlk = "\x1b[30m"
	const reset = "\x1b[0m"
	return `${bgYel}${txBlk}${string}${reset}` 
}

function swapWhitespace(input){
	return input
		.replace(/\t/g, color('\\t'))
		.replace(/[\n\r]/g, color('\\n'))
}

module.exports = function(runner){
	mocha.reporters.Base.call(this, runner)
	let passes = 0, fails = 0
	
	runner.on('pass', ()=>{
		passes += 1
	})
	
	runner.on('fail', (test, err)=>{
		fails += 1
		console.log(`\n===FAIL ${fails}===`)
		console.log('Inp: ' + swapWhitespace(test.title))
		console.log('Exp: ' + swapWhitespace(err.expected))
		console.log('Act: ' + swapWhitespace(err.actual))
	})
	
	runner.on('end', ()=>{
		console.log('\n===SUMMARY===')
		console.log('Pass: ' + passes)
		console.log('Fail: ' + fails)
		process.exit()
	})
}