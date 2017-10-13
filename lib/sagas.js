import {delay} from 'redux-saga';
import {call, put, takeEvery, takeLatest, all} from 'redux-saga/lib/effects';
//import Api from '';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
/*
function* fetchUser(action){
	try{
		const user = yield call(Api.fetchUser, action.payload.userId);
		yield put({type:'USER_FETCH_SUCCEDEED'});
	}catch(e){
		yield put({type:'USER_FETCH_FAILED', message:e.message});
	}
} 
*/

export function* helloSaga(){
	console.log('hello sagas');
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync(){
	
	//yield delay(1000);
	//Instead of returning a promise with delay, return the value of the promise
	yield call(delay,1000); // => { CALL: {fn: delay, args: [1000]}}
	yield put({type:'INCREMENT'});
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync(){
	console.log('listend incrementAsync');
	yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export default function* rootSaga(){
	yield all([
		helloSaga(),
		watchIncrementAsync()
	]);
}
