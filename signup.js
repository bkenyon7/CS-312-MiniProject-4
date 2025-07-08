// import react and axios
import React, { useState } from 'react';
import axios from 'axios';

// main program
function Signup(){
  // global constant
  const [ formData, setFormData ] = useState( {
    user_id: '';
    password: '';
    name: '';
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
      const res = await axios.post( 'http://localhost:3000/signup', formData );
      // successful signup message
      alert( 'Signup successful!' );
    }
    catch ( err )
    {
      // error message if the signup failed
      alert( 'Signup failed: ' + err.message );
    }
  };

return (
  < form onSubmit = { handleSubmit } >
    < input name = "user_id" placeholder = "User ID" onChange = { handleChange } required />
    < input name = "password" type = "password" placeholder = "Password" onChange = { handleChange } required />
    < input name = "name" placeholder = "Name" onChange = { handleChange } required />
    < button type = "submit" >Sign Up< />
  </ form >
  );
}

export default Signup;
