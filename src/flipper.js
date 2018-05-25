module.exports = function flipped(input){
	return input.replace(/\*{2}([^\n\r]*?)\*{2}/g, (nil, match)=>{
		return `<strong>${match}</strong>`
	})
}
