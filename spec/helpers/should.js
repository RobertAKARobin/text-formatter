const flipped = require('../../src/flipper')

console.log(flipped.printedRegex)

function swapWhitespace(input){
	return input
		.replace(/ /g, '[SPACE]')
		.replace(/\t/g, '[TAB]')
		.replace(/[\n\r]/g, '[NEWLINE]')
}

module.exports = function shouldDo(shouldStatement){
	return {
		as: (result)=>{
			it(shouldStatement, ()=>{
				let test = flipped(shouldStatement)
				expect(swapWhitespace(test)).toBe(swapWhitespace(result))
			})
		}
	}
}
