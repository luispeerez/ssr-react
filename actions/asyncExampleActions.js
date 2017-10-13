export function onFetchRequested(subreddit){
	return {
		type:'FETCH_REQUESTED',
		payload:{
			subreddit: subreddit
		} 
	};
}