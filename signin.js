// import react and axios
import React, { useState } from 'react';
import axios from 'axios';

// main program
function Signin( { onLogin } ) {
  // global constant
  const [ formData, setFormData ] = useState( {
    user_id: '';
    password: '';
  } );
  // global constant
  const handleChange = ( e ) => {
    setFormData( { formData, [ e.target.name ]: e.target.value } );
  };
  // global constant
  const handleSubmit = async ( e ) => {
    e.preventDefault();
    try
    {
      const res = await axios.post( 'http://localhost:3000/signin', formData, { withCredentials: true } );
      // successful signin message
      alert( 'Signin successful!' );
    }
    catch ( err )
    {
      // error message if signin failed
      alert( 'Signin failed: ' + err.message );
    }
  };

return (
  < form onSubmit = { handleSubmit } >
    < input name = "user_id" placeholder = "User ID" onChange = { handleChange } required />
    < input name = "password" type = "password" placeholder = "Password" onChange = { handleChange } required />
    < input name = "name" placeholder = "Name" onChange = { handleChange } required />
    < button type = "submit" >Sign In< / button >
  </ form >
  );
}

export default Signin;
