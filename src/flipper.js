const inlineMapping = [
	['*', 'b'],
	['_', 'u'],
	['/', 'i'],
	['~', 's'],
	['=', 'mark'],
	['`', 'code']
].map(mapping=>{
	let [c, tag] = mapping
	return {
		tester: new RegExp(`\\${c}{2}([^\n\r]*?)\\${c}{2}`, 'g'),
		replacer: function(nil, match){
			return `<${tag}>${match}</${tag}>`
		}
	}
})

const blockMapping = [
	['-', 'li']
].map(mapping=>{
	let [c, tag] = mapping
	return {
		tester: new RegExp(`(^|\\n|\\r)\\${c}\\s*(.*)(?=$|\\n|\\r)?`, 'g'),
		replacer: function(nil, newline, match){
			return `${newline}<${tag}>${match}</${tag}>`
		}
	}
})

module.exports = function flipped(input){
	inlineMapping.forEach(mapping=>{
		input = input.replace(mapping.tester, mapping.replacer)
	})
	blockMapping.forEach(mapping=>{
		input = input.replace(mapping.tester, mapping.replacer)
	})
	return input
}
