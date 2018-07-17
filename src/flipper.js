const elementTypes = [
  {
    name: 'inline',
    generateTester: (c)=>{
      return new RegExp(`\\${c}{2}([^\n\r]*?)\\${c}{2}`, 'g')
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
    name: 'block',
    generateTester: (c)=>{
      return new RegExp(`(^|\\n|\\r)\\${c}\\s*(.*)(?=$|\\n|\\r)?`, 'g')
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
  elementType.mappingPairs.forEach((mappingPair)=>{
    const inputCharacter = mappingPair[0]
    const outputTag = mappingPair[1]
    const tester = elementType.generateTester(inputCharacter)
    const replacer = elementType.generateReplacer(outputTag)
    gauntlet.push([
      tester,
      replacer
    ])
  })
})

module.exports = function flipped(input){
  gauntlet.forEach(mapping=>{
    input = input.replace(mapping[0], mapping[1])
  })
	return input
}
