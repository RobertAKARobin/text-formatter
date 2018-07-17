const elementTypes = [
  {
    typeName: 'inline',
    generateTester: (c)=>{
      return new RegExp(`\\${c}{2}([^\\n]*?)\\${c}{2}`, 'g')
    },
    generateReplacer: (tag)=>{
      return function(nil, match){
        return `<${tag}>${match}</${tag}>`
      }
    },
    mappingPairs: [
      ['*', 'b'],
      ['_', 'u'],
      ['/', 'i'],
      ['~', 's'],
      ['=', 'mark'],
      ['`', 'code']
    ]
  },
  {
    typeName: 'block',
    generateTester: (c)=>{
      return new RegExp(`(^|\\n)[ \\t]*\\${c}(.*)(?=$|\\n)`, 'g')
    },
    generateReplacer: (tag)=>{
      return function(nil, newline, match){
        return `${newline}<${tag}>${match}</${tag}>`
      }
    },
    mappingPairs: [
      ['-', 'li']
    ]
  }
]

const gauntlet = []
elementTypes.forEach((elementType)=>{
  const typeName = elementType.typeName
  elementType.mappingPairs.forEach((mappingPair)=>{
    const inputCharacter = mappingPair[0]
    const outputTag = mappingPair[1]
    const tester = elementType.generateTester(inputCharacter)
    const replacer = elementType.generateReplacer(outputTag)
    gauntlet.push({
      tester,
      replacer,
      typeName,
      inputCharacter,
      outputTag
    })
  })
})

const printedRegex = gauntlet.map((mapping)=>{
  return [
    mapping.inputCharacter,
    mapping.tester.toString(),
    mapping.typeName
  ]
})

console.log(printedRegex)

module.exports = function flipped(input){
  gauntlet.forEach((mapping)=>{
    input = input.replace(mapping.tester, mapping.replacer)
  })
	return input
}
