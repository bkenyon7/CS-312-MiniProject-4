// import react and axios
import React, { useState } from 'react';
import axios from 'axios';

// main program
function BlogPostForm( { onPostCreated } ) {
  // global constants
  const [ title, setTitle ] = useState( '' );
  const [ body, setBody ] = useState( '' );
  const handleSubmit = async ( e ) => {
    e.preventDefault();
    try
    {
      const res = await axios.post( 'http://localhost:3000/posts', { title, body }, { withCredentials: true } );
      // refresh all the posts listed
      onPostCreated( res.data );
      setTitle( '' );
      setBody( '' );
    }
    catch ( err )
    {
      // error message for if the post creation failed
      alert( 'The post creation has Failed. Please try again later.' );
    }
  };

  return(
    < form onSubmit = { handleSubmit } >
      < input value = { title } onChange = { ( e ) => setTitle( e.target.value ) } placeholder = " Title " required />
      < textarea value = { body } onChange = { ( e ) => setBody( e.target.value ) } placeholder = " Body " required />
      < button type = " submit " > Create Post < /button>
    </form>
  );
}

export default BlogPostForm;
