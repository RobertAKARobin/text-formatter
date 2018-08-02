const flipped = require('../../src/flipper')
const assert = require('assert')

console.log(flipped.printedRegex)

module.exports = function shouldDo(shouldStatement){
	return {
		as: (result, isTodo)=>{
			let testFunction = (isTodo ? xit : it)
			testFunction(shouldStatement, ()=>{
				let test = flipped(shouldStatement)
				assert.equal(test, result)
			})
		},
		asUnchanged: ()=>{
			it(shouldStatement, ()=>{
				let test = flipped(shouldStatement)
				assert.equal(test, shouldStatement)
			})
		}
	}
}
