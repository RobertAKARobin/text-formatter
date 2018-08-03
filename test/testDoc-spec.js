const fs = require('fs')
const path = require('path')

const shouldDo = require('./helpers/should')

const delim = /\n--\s*?\n/g
const testInputs = readFileAsText('./testDoc-input.txt').split(delim)
const testOutputs = readFileAsText('./testDoc-output.txt').split(delim)

function readFileAsText(filepath){
	return fs.readFileSync(path.join(__dirname, filepath), 'utf8')
}

describe('testDoc', ()=>{
	testInputs.forEach((input, index)=>{
		const isTodo = !!(input.indexOf('//TODO') === 0)
		shouldDo(input).as(testOutputs[index], isTodo)
	})
})
