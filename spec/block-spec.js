const shouldDo = require('./helpers/should')

const tests = [
	['#', 'h1'],
	['##', 'h2'],
	['###', 'h3'],
	['####', 'h4'],
	['#####', 'h5'],
	['######', 'h6']
]

tests.forEach((testPair)=>{
	testBlockElement.apply(null, testPair)
})

function testBlockElement(c, tag){

	describe(`A template that contains ${c} should generate <${tag}> tags...`, ()=>{
	
		shouldDo(`\n${c} when it begins a newline, followed by a space`)
			.as( `\n<${tag}>when it begins a newline, followed by a space</${tag}>`)

		shouldDo(`\n${c}	when it begins a newline, followed by a tab`)
			.as( `\n<${tag}>when it begins a newline, followed by a tab</${tag}>`)
		
		shouldDo(`\n${c}when it begins a newline, but not if not followed by a space`)
			.as( `\n${c}when it begins a newline, but not if not followed by a space`)

		shouldDo(`\n\n${c} when it begins many newlines\n`)
			.as( `\n\n<${tag}>when it begins many newlines</${tag}>\n`)
			
		shouldDo(`\n${c} up to the next newline\n`)
			.as( `\n<${tag}>up to the next newline</${tag}>\n`)
		
		shouldDo(`\n${c} across many newlines\n${c} like this`)
			.as( `\n<${tag}>across many newlines</${tag}>\n<${tag}>like this</${tag}>`)
		
		shouldDo(`${c} when it is the first line`)
			.as( `<${tag}>when it is the first line</${tag}>`)
		
		shouldDo(`${c}when it is the first line, but not if not followed by whitespace`)
			.as( `${c}when it is the first line, but not if not followed by whitespace`)

		shouldDo(`\n	${c} when it is preceded by whitespace`)
			.as( `\n<${tag}>when it is preceded by whitespace</${tag}>`)

		shouldDo(`\n0${c} but not when preceded by a number`)
			.as( `\n0${c} but not when preceded by a number`)
		
		shouldDo(`\n+${c} but not when preceded by a special character`)
			.as( `\n+${c} but not when preceded by a special character`)
		
		shouldDo(`\n${c} ${c}only once if the character is included many times`)
			.as( `\n<${tag}>${c}only once if the character is included many times</${tag}>`)

		shouldDo(`${c}  	and preserve whitespace after the character`)
			.as( `<${tag}> 	and preserve whitespace after the character</${tag}>`)
	})
}
