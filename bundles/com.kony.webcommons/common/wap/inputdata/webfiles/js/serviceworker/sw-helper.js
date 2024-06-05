// Application developer helper file
/*
Sample snippet 
function cacheMechanism(url) {
	var returnObj = {'cachestrategy':constants.NONE};
	if(url.endsWith('.png') || url.endsWith('.css')) {
		returnObj = {'cachestrategy': constants.CACHEFIRST_NETWORKLATER };
	} else if (url.indexOf('services') > 0) {
		returnObj = {'cachestrategy': constants.NETWORK_ONLY};
	} else if(any regex can be used ) {
	returnObj = {'cachestrategy': constants.NETWORKFIRST_CACHELATER };
	}
	return returnObj; 
}
*/