const flipped = require('../src/flipper')

describe('A template...', ()=>{
	describe('that contains ** should generate <strong> tags...', ()=>{

		function shouldDo(shouldStatement){
			return {
				as: (result)=>{
					it(shouldStatement, ()=>{
						expect(flipped(shouldStatement)).toBe(result)
					})
				}
			}
		}

		shouldDo('**around** a word at the start of a string')
			.as( `<strong>around</strong> a word at the start of a string`)
		
		shouldDo('around a word at the end of a **string**')
			.as( `around a word at the end of a <strong>string</strong>`)
		
		shouldDo('around a word in the **middle** of a string')
			.as( `around a word in the <strong>middle</strong> of a string`)
		
		shouldDo('around **more than one** word')
			.as( `around <strong>more than one</strong> word`)
		
		shouldDo('around ** spaces **')
			.as( `around <strong> spaces </strong>`)
		
		shouldDo('only if there are two ** at the start * and end')
			.as( 'only if there are two ** at the start * and end')
		
		shouldDo('around **single * **')
			.as( `around <strong>single * </strong>`)
		
		shouldDo('using the first **double * in a string of * ***')
			.as( `using the first <strong>double * in a string of * </strong>*`)
		
		shouldDo('when **many occur** in **one line**')
			.as( `when <strong>many occur</strong> in <strong>one line</strong>`)
		
		shouldDo('**only if** they are on **the\nsame line**')
			.as( `<strong>only if</strong> they are on **the\nsame line**`)
		
		shouldDo(`**only if** they are on **the
		same line** in a template literal`)
			.as( `<strong>only if</strong> they are on **the
		same line** in a template literal`)
	})
})
