var net = require( 'net' );
var fs = require( 'fs' );

var server = net.createServer( serversEventListener );

function serversEventListener( incomingRequest ) {
  console.log( 'we got connection!' );
  incomingRequest.setEncoding( 'utf-8' ); //universal coded character. to encode all possible characters
  //retrieve buffer info and parsing it
  incomingRequest.on( 'data', function( buffer ) {
    var bufferString = buffer.split( ' ' ); // [ GET :  ... ]
    var uri = bufferString[ 1 ].toString( );  // index.html  || hydrogen.html  ...
    var splitUri = uri.split( '.' ); // ex: [ 'index' , 'html' ]
    var type = splitUri[ splitUri.length - 1]; // ex: [ html ]
    console.log( 'thsitsoieoiw', type );
    var getDate = new Date( ).toString( );

    if ( uri === '/' ) {
      uri = '/index.html';
      type = 'html';
    }
    if ( type === 'html' ) {
      console.log( type );
      type = 'text/html';
    }
    else {
    type = 'text/css';
    }

    return fs.readFile( './server_file' + uri, function ( err , data ) {
      if ( err ) {
        type = 'text/html';
        return fs.readFile( './server_file/404.html' , function( err, data ) {

            incomingRequest.write( 'HTTP/ 1.1 404 Not Found\n');
            incomingRequest.write( 'Server: Rizzy\'s Server \n' );
            incomingRequest.write( 'Date:' + getDate + ' \n' );
            incomingRequest.write( 'Content-Type:' + type + ';' + ' charset=utf-8\n' );
            incomingRequest.write( 'Content-Length:' + data.length + ' \n' );
            incomingRequest.write( 'Connection: keep-alive\n' );
            incomingRequest.write('\n\n');
            incomingRequest.write( data );
            return incomingRequest.end(  );   //terminate connection
          // }
        });
      }
      incomingRequest.write( 'HTTP/ 1.1 200 OK\n');
      incomingRequest.write( 'Server: Rizzy\'s Server \n' );
      incomingRequest.write( 'Date:' + getDate + ' \n' );
      incomingRequest.write( 'Content-Type:' + type + ';' + ' charset=utf-8\n' );
      incomingRequest.write( 'Content-Length:' + data.length + ' \n' );
      incomingRequest.write( 'Connection: keep-alive\n' );
      incomingRequest.write('\n\n');
      incomingRequest.write( data );
      incomingRequest.end(  );   //terminate connection
    }); // end of fs.readFile
  }); // end of incomingRequest.on
} // end of serversEventListener( )

// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});