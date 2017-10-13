import fetch from 'isomorphic-fetch';

const api = {
	fetchPosts: function(subreddit){
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
			.then(response => response.json())
			.then(json => {
				let posts = json.data.children;
				posts = posts.map(function(post){
					return post.data;
				});
				console.log('posts', posts);
				return posts;
			});

	}

};

export default api;