const shouldDo = require('./helpers/should')

testBlockElement('-', 'li')

function testBlockElement(c, tag){

	describe(`A template that contains ${c} should generate <${tag}> tags...`, ()=>{
	
		shouldDo(`\n${c} when it begins a newline`)
			.as( `\n<${tag}>when it begins a newline</${tag}>`)

	})
}
