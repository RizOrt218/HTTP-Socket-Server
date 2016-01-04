var net = require( 'net' );

var server = net.createServer( serversEventListener );

function serversEventListener( incomingRequest ) { //server listening for socket request
  console.log( 'we got connection!' );
  incomingRequest.setEncoding( 'utf-8' ); //universal coded character. to encode all possible characters
  //open connection
  incomingRequest.on( 'data', function( buffer ) {
    var bufferString = buffer.split( ' ' );
    console.log( 'REQUESTING DATA ====>', bufferString );

    console.log( 'hellelooo', bufferString[ 1 ] ); // cl : /
    if ( bufferString[1] === '/' ) {

      incomingRequest.write( 'HTTP/1.1 200 OK\n' );
      incomingRequest.write( 'Server: \n' );
      incomingRequest.write( 'Date: \n' );
      incomingRequest.write( 'Content-Type: text/html; charset=utf-8\n' );
      incomingRequest.write( 'Content-Length: \n' );
      incomingRequest.write( 'Connection: keep-alive\n' );
      incomingRequest.write('\n\n');
      incomingRequest.write( 'body content that contains resources that was requested\n' );
      incomingRequest.end( "server request ended! \n" );   //terminate connection
    } // end of if ( bufferString[1] === '/' )
  }); // end of incomingRequest.on
} // end of serversEventListener( )

// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});