const shouldDo = require('./helpers/should')

testBlockElement('-', 'li')

function testBlockElement(c, tag){

	describe(`A template that contains - should generate <li> tags...`, ()=>{
	
		shouldDo(`\n- when it begins a newline`)
			.as( `\n<li>when it begins a newline</li>`)

	})
}
