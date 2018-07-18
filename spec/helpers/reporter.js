jasmine.getEnv()
	.addReporter({
		specDone: (result)=>{
			result.failedExpectations.forEach((test)=>{
				console.log(':')
				console.log(`Expect: ${test.expected}`)
				console.log(`Actual: ${test.actual}`)
			})
		}
	})
