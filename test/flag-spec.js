const shouldDo = require('./helpers/should')

const flagTests = [
	['-', 'ul']
].forEach((testPair)=>{
	const [c, tag] = testPair
	describe(`A section wrapped in [${c} /] should be wrapped in <${tag}>...`, ()=>{
	
		shouldDo(`\n[${c} when it begins a newline/]`)
			.as( `\n<${tag}> when it begins a newline</${tag}>`)
		
		shouldDo(`[${c} when it begins the string/]`)
			.as( `<${tag}> when it begins the string</${tag}>`)
		
		shouldDo(`Not when preceded[${c}by other characters on its line/]`)
			.as( `Not when preceded[${c}by other characters on its line/]`)
		
		shouldDo(`\t [${c} when preceded by whitespace/]`)
			.as( `\t <${tag}> when preceded by whitespace</${tag}>`)
		
		shouldDo(`\t [${c}\t and preserve whitespace\t /]`)
			.as( `\t <${tag}>\t and preserve whitespace\t </${tag}>`)
		
		shouldDo(`[${c} not when not ended by close tag`)
			.as( `[${c} not when not ended by close tag`)
		
		shouldDo(`[${c} when spanning \n\n\nmany lines/]`)
			.as( `<${tag}> when spanning \n\n\nmany lines</${tag}>`)
		
		shouldDo(`[${c} when close tag comes/]in middle of string, inserting newline`)
			.as( `<${tag}> when close tag comes</${tag}>\nin middle of string`)
			
		shouldDo(`[${c} when nested\n[${c}and preceded by newline/]/]`)
			.as( `<${tag}> when nested\n<${tag}>and preceded by newline</${tag}>\n</${tag}>`)
		
		shouldDo(`[${c} not when nested[${c} and preceded by newline/]/]`)
			.as( `<${tag}> not when nested${c} and preceded by newline</${tag}>\n/]`)
		
		shouldDo(`[${c} and close tag should match\n[${c} first open tag/]like so`)
			.as( `<${tag}> and close tag should match\n[${c} first open tag</${tag}\nlike so`)
		
	})
})