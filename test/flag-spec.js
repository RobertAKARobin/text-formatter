const shouldDo = require('./helpers/should')

const flagTests = [
	[
		'-',
		'<ul><li>',
		'</li></ul>'
	],
	[
		'1.',
		'<ol><li>',
		'</li></ol>'
	],
	[
		'\`',
		'<pre>',
		'</pre>'
	],
	[
		'\'\'',
		'<blockquote>',
		'</blockquote>'
	]
].forEach(([c, oTag, cTag])=>{
	describe(`A section wrapped in [${c} /] should be wrapped in ${oTag}${cTag}...`, ()=>{
	
		shouldDo(`\n[${c} when it begins a newline/]`)
			.as( `\n${oTag}when it begins a newline${cTag}`)
		
		shouldDo(`[${c} when it begins the string/]`)
			.as( `${oTag}when it begins the string${cTag}`)
		
		shouldDo(`\t [${c} when preceded by whitespace/]`)
			.as( `\t ${oTag}when preceded by whitespace${cTag}`)
		
		shouldDo(`\t [${c}\t and don't preserve following whitespace/]`)
			.as( `\t ${oTag}and don't preserve following whitespace${cTag}`)
		
		shouldDo(`[${c} and don't preserve trailing whitespace  	/]`)
			.as( `${oTag}and don't preserve trailing whitespace${cTag}`)
		
		shouldDo(`[${c}  	and don't preserve trailing or following whitespace  	/]`)
			.as( `${oTag}and don't preserve trailing or following whitespace${cTag}`)
		
		shouldDo(`[${c} when spanning \n\n\nmany lines/]`)
			.as( `${oTag}when spanning \n\n\nmany lines${cTag}`)
			
		shouldDo(`[${c} when nested\n[${c}and preceded by newline/]/]`)
			.as( `${oTag}when nested\n${oTag}and preceded by newline${cTag}${cTag}`)
		
	})
})