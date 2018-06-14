const flipped = require('../../src/flipper')

module.exports = function shouldDo(shouldStatement){
	return {
		as: (result)=>{
			it(shouldStatement, ()=>{
				expect(flipped(shouldStatement)).toBe(result)
			})
		}
	}
}
