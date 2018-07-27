const flipped = require('../../src/flipper')
const assert = require('assert')

console.log(flipped.printedRegex)

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

module.exports = function shouldDo(shouldStatement){
	return {
		as: (result)=>{
			it(shouldStatement, ()=>{
				let test = flipped(shouldStatement)
				assert.equal(swapWhitespace(test), swapWhitespace(result))
			})
		}
	}
}
