const shouldDo = require('./helpers/should')

const inlineTests = [
	['*', 'b'],
	['_', 'u'],
	['/', 'i'],
	['~', 's'],
	['=', 'mark'],
	['`', 'code'],
	["'", 'q']
].forEach((testPair)=>{
	const [c, tag] = testPair
	describe(`A template that contains ${c}${c} should generate <${tag}> tags...`, ()=>{
	
		shouldDo(`${c}${c}around${c}${c} a word at the start of a string`)
			.as( `<${tag}>around</${tag}> a word at the start of a string`)
		
		shouldDo(`around a word at the end of a ${c}${c}string${c}${c}`)
			.as( `around a word at the end of a <${tag}>string</${tag}>`)
		
		shouldDo(`around a word in the ${c}${c}middle${c}${c} of a string`)
			.as( `around a word in the <${tag}>middle</${tag}> of a string`)
		
		shouldDo(`around ${c}${c}more than one${c}${c} word`)
			.as( `around <${tag}>more than one</${tag}> word`)
		
		shouldDo(`around ${c}${c} spaces ${c}${c}`)
			.as( `around <${tag}> spaces </${tag}>`)
		
		shouldDo(`only if there are two ${c}${c} at the start ${c} and end`)
			.as( `only if there are two ${c}${c} at the start ${c} and end`)
		
		shouldDo(`around ${c}${c}single ${c} ${c}${c}`)
			.as( `around <${tag}>single ${c} </${tag}>`)
		
		shouldDo(`using the first ${c}${c}double ${c} in a string of ${c} ${c}${c}${c}`)
			.as( `using the first <${tag}>double ${c} in a string of ${c} </${tag}>${c}`)
		
		shouldDo(`when ${c}${c}many occur${c}${c} in ${c}${c}one line${c}${c}`)
			.as( `when <${tag}>many occur</${tag}> in <${tag}>one line</${tag}>`)
		
		shouldDo(`${c}${c}only if${c}${c} they are on ${c}${c}the\nsame line${c}${c}`)
			.as( `<${tag}>only if</${tag}> they are on ${c}${c}the\nsame line${c}${c}`)
		
		shouldDo(`${c}${c}only if${c}${c} they are on ${c}${c}the
		same line${c}${c} in a template literal`)
			.as( `<${tag}>only if</${tag}> they are on ${c}${c}the
		same line${c}${c} in a template literal`)
	})	
})