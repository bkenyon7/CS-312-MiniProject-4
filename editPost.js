// import react and axios
import React, { useState } from 'react';
import axios from 'axios';

// main program
function EditPost( { post, update } ) {
  // editable title and body sections for users
  const [ title, setTitle ] = useState( post.title );
  const [ body, setBody ] = useState( post.body );

  // global constant for post edits
  const handleSubmit = async ( e ) => {
    e.preventDefault();
    try
    {
      const res = await axios.put( 'http://localhost:3000/posts/${post.id}', { title, body }, { withCredentials: true } );
      //refresh all the post to see edits
      update(res.data);
    }
    catch ( err )
    {
      // error message if the users edit fails to save
      alert( 'Your edit failed to save. Please try again later.' );
    }
  };

  return(
    < form onSubmit = { handleSubmit } >
      < input value = { title } onChange = { ( e ) => setTitle( e.target.value ) } required />
      < textarea value = { body } onChange = { ( e ) => setBody( e.target.value ) } required />
      < button type = "submit" > Save < />
    < form />
  );
}

export default EditPost;
