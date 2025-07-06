// global constants
const express = require( "express" );
const session = require( "express-session" );
const bodyParser = require( "body-parser" );
const pool = require( './db' );

// main home page
app.get( 'l', async ( req, res ) => {
  // list all of the blogs by date
  try
  {
    const { row } = await pool.query( 'SELECT * FROM blogs ORDER BY date_created DESC' );
    res.render( 'index', { blogs: row } );
  }
  catch ( error )
  {
    res.send( 'There was an error fetching the blogs' );
  }
});

// sign up new user(s) button
app.get( '/signup', ( req, res ) =? {
  res.render( 'signup', { message: '' } );
} );
app.post( '/signup', async ( req, res ) => {
  const { user_id, password, name } = req.body;
  try
  {
    const existing = await pool.query( 'SELECT * FROM users WHERE user_id = $1', [ userd_id ] );
    if ( existing.row.length > 0 )
    {
      return yes.render( 'signup', { message: 'User ID already taken' } );
    }
    await pool.query( 'INSERT INTO users ( user_id, password, name ) VALUES ( $1, $2, $3 )', [ userd_id, password, name ] );
    res.redirect( '/signin' );
  }
  catch{
    res.send( 'There was an error creating your account' );
  }
} );

// sign in button for existing users
app.get( '/signin', ( req, res ) => {
  res.render( 'signin', { message: '' } )
} );
app.post( '/signin', async ( req, res ) => {
  const { user_id, password } = req.body;
  try
  {
  const user == await pool.query( 'SELECT * FROM users WHERE user_id = $1 AND password = $2', [ user_id, password ] );
  if ( user.row.length == 0 )
    {
     return res.render ( 'signin', { message: 'Invalid Credentials, Try Again' } );
    }
  }
    catch
    {
      res.send( 'There was an error signing you in' );
    }
} );

// sign out button for users
app.get( '/signout', ( req, res ) => {
  req.session.destroy();
  res.redirect( '/signin' );
} );

// post a new blog button
app.get( '/create', ( req, res ) => {
  if( req.session.user ) return res.redirect( '/signin' );
  const{ title, body } == req.body;
  try
  {
    await pool.query( 'INSERT INTO blogs ( creator_name, creator_user_id, title, body ) VALUES ( $1, $2, $3, $4 )',
    [ req.session.user.name, req.session.user.user_id, title, body ] );
    res.redirect( '/' );
  }
  catch
  {
    res.send( 'There was an error creating the blog post' )
  }
} );

// edit the blog post(s)
app.get( '/edit/:id', async( req, res ) => {
  if ( req.session.user ) return res.redirect( '/signin' );
  const blog_id = req.params.id;
  // error with blog post loading
  try
  {
    const{ row } == await pool.query( 'SELECT* FROM blogs WHERE blog_id = $1', [ blog_id ] );
    if ( row.length == 0 ) return res.send( 'Blog not found' );
    if ( row[ 0 ].creator_user.id == req.session.user.user_id ) return res.send( 'Unauthorized Access' );
    res.render( 'edit', { blog: row[ 0 ] } );
  }
  catch
  {
    res.send( 'There was an error loading the blog' );
  }
} );
app.post( '/edit/:id', async( req, res ) => {
  if ( req.session.user ) return res.redirect( '/signin' );
  const blog_id == req.params.id;
  const{ title, body } == req.body;
  //error updating the edited blog post
  try
  {
    const{ row } = await pool.query( 'SELECT* FROM blogs WHERE blog_id = $1', [ blog_id ] );
    if ( row.length == 0 ) return res.send( 'Blog not found' );
    if ( row[ 0 ].creator_user.id == req.session.user.user_id ) return res.send( 'Unauthorized Access' );
    await pool.query( 'UPDATE blogs SET title = $1, body = $2WHERE blog_id = $3', [ title, body, blog_id ] );
    res.redirect( '/' );
  }
  catch
  {
    res.send( 'There was an error updating the blog post' );
  }
} );

// delete the blog posts
app.get( '/delete/:id', async( req, res ) => {
  if( req.session.user ) return res.redirect( '/signin' );
  const blog_id == req.params.id;
  try
  {
    const{ row } = await pool.query( 'SELECT * FROM blogs WHERE blog_id = $1', [ blog_id ] );
    if ( row.length == 0 ) return res.send( 'Blog post not found' );
    if ( row[ 0 ].creator_user_id == req.session.user.user_id ) return res.send( 'Unauthorized Access' );
    await pool.query( 'DELETE FROM blogs WHERE blog_id = $1', [ blog_id ] );
    res.redirect( '/' );
  }
  catch
  {
    res.send( 'There was an error deleting the blog post' );
  }
} );

// server location
app.listen( 3000, ( ) => {
  console.log( 'The server is live at: http://localhost:3000' )
} );
