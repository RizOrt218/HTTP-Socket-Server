var net = require( 'net' );
var fs = require( 'fs' );

var server = net.createServer( serversEventListener );

function serversEventListener( incomingRequest ) {
  console.log( 'we got connection!' );
  incomingRequest.setEncoding( 'utf-8' ); //universal coded character. to encode all possible characters
  //retrieve buffer info and parsing it
  incomingRequest.on( 'data', function( buffer ) {
    var bufferString = buffer.split( ' ' );
    console.log('GETTTTTT THISTSITSITSI ', bufferString);
    var path = bufferString[ 1 ].toString( );
    console.log( 'thists paaassss', path );
    var getDate = new Date( ).toString( );
    var type = 'text/html';

    if ( path === '/' ) {
      path = '/index.html';
    }
    if ( path === '/styles.css' ){
      type = 'text/css';
    }
  // fs.readFile( './css/styles.css', function ( data ) {
  //     incomingRequest.write( data );
  //     incomingRequest.end( );
  //   });

    return fs.readFile( './server_file' + path, function ( err , data ) {
      if ( err ) {
        return fs.readFile( './server_file/404.html' , function( err, data ) {
          incomingRequest.write( data );
          return incomingRequest.end(  );   //terminate connection
        });
      }
      var currentData = data.toString();
      var stat = 'HTTP/ 1.1 200 OK\n';
      incomingRequest.write( stat );
      incomingRequest.write( 'Server: Rizzy\'s Server \n' );
      incomingRequest.write( 'Date:' + getDate + ' \n' );
      console.log( 'tyyyyype', type );
      incomingRequest.write( 'Content-Type:' + type + ';' + ' charset=utf-8\n' );
      incomingRequest.write( 'Content-Length:' + currentData.length + ' \n' );
      incomingRequest.write( 'Connection: keep-alive\n' );
      incomingRequest.write( 'Status: ' + stat + '\n' );
      incomingRequest.write('\n\n');
      incomingRequest.write( currentData );
      incomingRequest.end(  );   //terminate connection
    }); // end of fs.readFile
  }); // end of incomingRequest.on
} // end of serversEventListener( )

// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});