export function onIncrement(){
	return { type: 'INCREMENT' };
}

export function onDecrement(){
	return { type: 'DECREMENT' };
}


export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

export function  selectSubredit(subreddit){
	return {
		type: SELECT_SUBREDDIT,
		subreddit: subreddit
	};
}

export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export function invalidateSubreddit(subreddit) {
  return {
    type: INVALIDATE_SUBREDDIT,
    subreddit
  }
}


//Actions governed by the network request
export const REQUEST_POSTS = 'REQUEST_POSTS'

function requestPosts(subreddit) {
  return {
    type: REQUEST_POSTS,
    subreddit
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export const USER_FETCH_REQUESTED = 'USER_FETCH_REQUESTED';
export function onUserFetchRequest(userId){
  return {
    type: USER_FETCH_REQUESTED,
    payload: {userId:userId}
  }
}

export function onIncrementAsync(){
  return {
    type: 'INCREMENT_ASYNC'
  };
}