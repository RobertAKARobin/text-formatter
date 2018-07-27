const flipped = require('../../src/flipper')
const assert = require('assert')

console.log(flipped.printedRegex)

module.exports = function shouldDo(shouldStatement){
	return {
		as: (result)=>{
			it(shouldStatement, ()=>{
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
