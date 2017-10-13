import React, { Component } from 'react';


class PostsList extends Component {
  constructor(props) {
  	super(props);
  }

  render(){
    console.log('this.props.posts', this.props.posts);
  	return(
  		<ul className="posts-list">
  			{ (this.props.posts || []).map(function(post){
  				return(
            <li>
  					 <h4>{post.title}</h4>
  				  </li>
          );
  			}) }
  		</ul>
  	);
  }
}

export default PostsList;