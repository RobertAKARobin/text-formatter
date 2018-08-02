const state = {
	flags: []
}

const flags = {
	mappingSets: [
		[
			'-',
			'<ul><li>',
			'</li></ul>'
		],
		[
			'1\.',
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
	],
	mappingSetsByPattern: {},
	generateTester: ()=>{
		const openTagPatterns = flags.mappingSets.map((mappingSet)=>{
			return mappingSet[0]
		})
		return new RegExp(`\\[(${openTagPatterns.join('|')})[ \\t]*|[ \\t]*(\\/\\])`, 'g')
	},
	replacer: (nil, openPattern, isCloseTag)=>{
		let mappingSet
		if(isCloseTag){
			mappingSet = state.flags.pop()
			return mappingSet[2]
		}else{
			mappingSet = flags.mappingSetsByPattern[openPattern]
			state.flags.push(mappingSet)
			return mappingSet[1]
		}
	}
}
flags.mappingSets.forEach((mappingSet)=>{
	const [openTagPattern, openTag, closeTag] = mappingSet
	flags.mappingSetsByPattern[openTagPattern] = mappingSet
})

const elementTypes = [
	{
		typeName: 'inline',
		generateTester: (c)=>{
			return new RegExp(`\\${c}{2}([^\\n]*?)\\${c}{2}`, 'g')
		},
		generateReplacer: (tag)=>{
			return function(nil, content){
				return `<${tag}>${content}</${tag}>`
			}
		},
		mappingPairs: [
			['*', 'b'],
			['_', 'u'],
			['/', 'i'],
			['~', 's'],
			['=', 'mark'],
			['`', 'code'],
			["'", 'q']
		]
	},
	{
		typeName: 'block',
		generateTester: (c)=>{
			return new RegExp(`(^|\\n)([ \\t]*)\\${c}[ \\t]*(.*)(?=$|\\n)`, 'g')
		},
		generateReplacer: (tag)=>{
			return function(nil, newline, indent, content){
				return `${newline}${indent}<${tag}>${content}</${tag}>`
			}
		},
		mappingPairs: [
			['######', 'h6'],
			['#####', 'h5'],
			['####', 'h4'],
			['###', 'h3'],
			['##', 'h2'],
			['#', 'h1']
		]
	},
	{
		typeName: 'noContentBlock',
		generateTester: (pattern)=>{
			return new RegExp(`(^|\\n)${pattern}(?=\\n|$)`, 'g')
		},
		generateReplacer: (output)=>{
			return function(nil, newline){
				return `${newline}${output}`
			}
		},
		mappingPairs: [
			[`-{3,}`, '<hr />']
		]
	}
]

const gauntlet = []
gauntlet.push({
	tester: flags.generateTester(),
	replacer: flags.replacer,
	typeName: 'flags',
	pattern: 'FLAGS'
})
elementTypes.forEach((elementType)=>{
	const typeName = elementType.typeName
	elementType.mappingPairs.forEach((mappingPair)=>{
		const pattern = mappingPair[0]
		const output = mappingPair[1]
		const tester = elementType.generateTester(pattern)
		const replacer = elementType.generateReplacer(output)
		gauntlet.push({
			tester,
			replacer,
			typeName,
			pattern
		})
	})
})

module.exports = function flipped(input){
	gauntlet.forEach((mapping)=>{
		input = input.replace(mapping.tester, mapping.replacer)
	})
	return input
}
module.exports.printedRegex = gauntlet.map((mapping)=>{
	return [
		mapping.pattern,
		mapping.tester.toString(),
		mapping.typeName
	]
})