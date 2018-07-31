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
			.as( `\n${oTag} when it begins a newline${cTag}`)
		
		shouldDo(`[${c} when it begins the string/]`)
			.as( `${oTag} when it begins the string${cTag}`)
		
		shouldDo(`\t [${c} when preceded by whitespace/]`)
			.as( `\t ${oTag} when preceded by whitespace${cTag}`)
		
		shouldDo(`\t [${c}\t and preserve whitespace\t /]`)
			.as( `\t ${oTag}\t and preserve whitespace\t ${cTag}`)
		
		shouldDo(`[${c} when spanning \n\n\nmany lines/]`)
			.as( `${oTag} when spanning \n\n\nmany lines${cTag}`)
			
		shouldDo(`[${c} when nested\n[${c}and preceded by newline/]/]`)
			.as( `${oTag} when nested\n${oTag}and preceded by newline${cTag}${cTag}`)
		
	})
})