const shouldDo = require('./helpers/should')

describe(`A template that contains - should generate <hr> tags...`, ()=>{
	
	shouldDo(`---\nwhen on a line by itself`)
		.as( `<hr />\nwhen on a line by itself`)
	
	shouldDo(`---not when on a line with other content`)
		.as( `---not when on a line with other content`)
	
	shouldDo(`---`)
		.as( `<hr />`)
	
	shouldDo(`--\nnot when less than 3 chars`)
		.as( `--\nnot when less than 3 chars`)
	
	shouldDo(`----------\nwhen more than 3 chars`)
		.as( `<hr />\nwhen more than 3 chars`)
	
	shouldDo(`not when occurring---in the middle of a line`)
		.as( `not when occurring---in the middle of a line`)
	
	shouldDo(`when between\n---\ntwo lines`)
		.as( `when between\n<hr />\ntwo lines`)
	
	shouldDo(`---\n---`)
		.as( `<hr />\n<hr />`)
})
