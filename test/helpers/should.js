const flipped = require('../../src/flipper')
const assert = require('assert')

console.log(flipped.printedRegex)

function swapWhitespace(input){
	return input
		.replace(/\t/g, '\\T')
		.replace(/[\n\r]/g, '\\N')
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
