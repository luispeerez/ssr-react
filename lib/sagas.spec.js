import test from 'tape';
import {incrementAsync} from './sagas';
import {fetchData} from './sagas-async';
import { delay } from 'redux-saga';
import {call, put, takeEvery, takeLatest, all} from 'redux-saga/lib/effects';
import Api from '../services/api';



test('incrementAsync saga test', function(assert){
	const gen = incrementAsync();

	assert.deepEqual(
		gen.next().value,
		call(delay,1000),
		'incrementAsync first must return done false and a call(delay,1000) result, it has to dispatch an action later'
	);

	assert.deepEqual(
		gen.next().value,
		put({type:'INCREMENT'}),
		'incrementAsync Saga must dispatch an INCREMENT action'
	);

	assert.deepEqual(
		gen.next(),
		{done:true, value: undefined},
		'incrementAsync must be done by now'
	);

	const genFetch =  fetchData();
	assert.deepEqual(
		genFetch.next(),
		call(Api.fetchPosts,'destinythegame')
	);


	//Fake response
	const exampleResponseData = [
		{title: 'Test post'}
	];

	assert.deepEqual(
		genFetch.next(exampleResponseData).value,
		put({type:'FETCH_SUCCEEDED', data: exampleResponseData}),
	  "fetchProducts should yield an Effect put({ type: 'PRODUCTS_RECEIVED', data:exampleResponseData })"
	);

	assert.end();

});