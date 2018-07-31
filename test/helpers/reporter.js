const mocha = require('mocha')

const bgYel = "\x1b[43m"
const bgRed = "\x1b[41m"
const txBlk = "\x1b[30m"
const txRed = "\x1b[31m"
const txWht = "\x1b[37m"
const reset = "\x1b[0m"

function swapWhitespace(input){
	return input
		.replace(/\t/g, `${bgYel}${txBlk}\\t${reset}`)
		.replace(/[\n\r]/g, `${bgYel}${txBlk}\\n${reset}`)
}

module.exports = function(runner){
	mocha.reporters.Base.call(this, runner)
	let passes = 0, fails = 0
	
	runner.on('pass', ()=>{
		passes += 1
	})
	
	runner.on('fail', (test, err)=>{
		fails += 1
		console.log(`\n${bgRed}${txWht}===FAIL ${fails}===${reset}`)
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