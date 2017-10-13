import { all, call, put, takeEvery, takeLatest, select } from 'redux-saga/lib/effects';
import Api from '../services/api';

export function* fetchData(action){
	try{
		const data = yield call(Api.fetchPosts, action.payload.subreddit);
		yield put({type:'FETCH_SUCCEEDED', data: data});
	}catch(error){
		yield put({type: 'FETCH_FAILED', error: error});
	}
}

export function* watchFetchData(){
	yield takeLatest('FETCH_REQUESTED', fetchData);
}

function* watchAndLog(){
	yield takeEvery('*', function* logger(action){
		const state = yield select();

		console.log('action logger', action);
		console.log('state after', state);
	})
}

function* watchAndLog() {
  while (true) {
    const action = yield take('*') //Suspended until any action takes effect
    const state = yield select()

    console.log('action', action)
    console.log('state after', state)
  }
}


export default function * rootSaga(){
	yield all([
		watchAndLog(),
		watchFetchData()
	])
}