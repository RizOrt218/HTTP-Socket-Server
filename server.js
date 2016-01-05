var net = require( 'net' );
var fs = require( 'fs' );

var server = net.createServer( serversEventListener );

function serversEventListener( incomingRequest ) { //server listening for socket request
  console.log( 'we got connection!' );
  incomingRequest.setEncoding( 'utf-8' ); //universal coded character. to encode all possible characters
  //open connection
  incomingRequest.on( 'data', function( buffer ) {
    var bufferString = buffer.split( ' ' );
    var path = bufferString[ 1 ].toString();
    var getDate = new Date( ).toString( );
    var type = 'text/html';

    if ( path === '/' ) {
      path = '/index.html';
    }

    fs.readFile( './server_file' + path, function ( err , data ) {
      var currentData = data.toString();
      if ( err ) {
      }
      if ( path === '/styles.css' ){
        type = 'text/css';
      }
      var stat = 'HTTP/ 1.1 200 OK\n';
      incomingRequest.write( stat );
      incomingRequest.write( 'Server: Rizzy\'s Server \n' );
      incomingRequest.write( 'Date:' + getDate + ' \n' );
      incomingRequest.write( 'Content-Type:' + type + ';' + ' charset=utf-8\n' );
      incomingRequest.write( 'Content-Length:' + currentData.length + ' \n' );
      incomingRequest.write( 'Connection: keep-alive\n' );
      incomingRequest.write( 'Status: ' + stat + '\n' );
      incomingRequest.write('\n\n');
      incomingRequest.write( currentData );
      incomingRequest.end(  );   //terminate connection
    });
  }); // end of incomingRequest.on
} // end of serversEventListener( )

// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});