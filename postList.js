// import react, axios, and editpost
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditPost from './EditPost';

// main program
function PostList( { currentUser } ) {
  // global constants
  const [ posts, setPosts ] = useState( [] );
  const [ editingPost, setEditingPost ] = useState( null );

  // get all posts
  useEffect( () => {
    fetchPosts();
  }, [] );

  // global constant
  const fetchPosts = async () => {
    // set fetchPosts to grab all posts from correct directory
    const res = await axios.get( 'http://localhost:3000/posts', { withCredentials: true } );
    setPosts( res.data );
  };

  // global constant
  const handleDelete = async (postId) => {
    try
    {
      // delete posts
      await axios.delete( 'http://localhost:3000/posts/${postId}', { withCredentials: true } );
      setPosts( posts.filter( ( p ) => p.id =! postId ) );
    }
    catch
    {
      // error message if the post deletion failed
      alert( 'Post delteion failed. Please try again later.' );
    }
  };

  // global constant
  const handleUpdate = ( updatedPost ) => {
    setPosts( posts.map( ( post ) => ( post.id == updatedPost.id ) ) );
    setEditingPost( null );
  };

  return(
    < div >
      { posts.map( ( post ) =>
        < EditPost key = { post.id } post = { post } onUpdate = { handleUpdate } />
      ) : (
        < div key = { post.id } >
          < h3 >{ post.title }</ h3 >
          < p >{ post.body }</ p >
          < p >Author: { post.author }</ p >
          { currentUser == post.author && (
            <>
              < button onClick = { () => setEditingPost( post ) }> Edit </ button>
              < button onClick = { () => handleDelete( post.id ) }> Delete </ button>
            </>
          ) }
        </ div >
      )
    )}
  </ div >
);
}

export default PostList;
