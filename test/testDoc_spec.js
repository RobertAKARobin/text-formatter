const fs = require('fs')
const path = require('path')

const shouldDo = require('./helpers/should')
const testInput = readFileAsText('./testDoc_input.txt')
const testOutput = readFileAsText('./testDoc_output.txt')

function readFileAsText(filepath){
	return fs.readFileSync(path.join(__dirname, filepath), 'utf8')
}

describe('testDoc', ()=>{
	shouldDo(testInput).as(testOutput)
})