var net = require( 'net' );
var fs = require( 'fs' );

var server = net.createServer( serversEventListener );

function serversEventListener( socReq ) {
  console.log( 'we got connection!' );
  socReq.setEncoding( 'utf-8' ); //universal coded character. to encode all possible characters
  //retrieve buffer info and parsing it
  socReq.on( 'data', function( buffer ) {
    var bufferString = buffer.split( ' ' ); // [ GET :  ... ]
    var uri = bufferString[ 1 ];  // index.html  || hydrogen.html  ...
    var splitUri = uri.split( '.' ); // ex: [ 'index' , 'html' ]
    var type = splitUri[ splitUri.length - 1]; // ex: [ html ]
    var getDate = new Date( );

    if ( uri === '/' ) {
      uri = '/index.html';
      type = 'html';
    }

    if ( type === 'html' ) {
      type = 'text/html';
    }
    else {
      type = 'text/css';
    }

    return fs.readFile( './server_file' + uri, function ( err , data ) {
      if ( err ) {
        type = 'text/html';
        return fs.readFile( './server_file/404.html' , function ( err, data ) {
          socReq.write(
            'HTTP/ 1.1 404 Not Found\n ' +
            'Server: Rizzy\'s Server \n' +
            'Date:' + getDate + ' \n' +
            'Content-Type:' + type + ';' + ' charset=utf-8\n' +
            'Content-Length:' + data.length + ' \n' +
            'Connection: keep-alive\n' +
            '\n\n' +
            data );
            return socReq.end(  );   //terminate connection
        });
      } // end of if ( err )
      socReq.write(
        'HTTP/ 1.1 200 OK\n ' +
        'Server: Rizzy\'s Server \n' +
        'Date:' + getDate + ' \n' +
        'Content-Type:' + type + ';' + ' charset=utf-8\n' +
        'Content-Length:' + data.length + ' \n' +
        'Connection: keep-alive\n' +
        '\n\n' +
        data );
      socReq.end( 'end connection' );   //terminate connection
    }); // end of fs.readFile
  }); // end of socReq.on

      socReq.on( 'end', function() {
        console.log( 'disconnected from server' );
      }); // end of end fn

} // end of serversEventListener( )


// grab a random port.
server.listen( { port: 8080 }, function() {
  address = server.address();
  console.log( "opened server on %j", address );
});