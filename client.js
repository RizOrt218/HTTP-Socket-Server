var net = require( 'net' );
var PORT = 8080;
var HOST = 'localhost';

var client = net.connect( PORT, HOST, function ( ) { //'connect' listener
  console.log( 'connected to server!' );
  client.write( 'GET / HTTP/1.1\n ' + 'Host: localhost\n\n');
  // client.write( 'Cache-Control: no-cache' );

});
  client.on( 'data', function ( data ) {
    console.log( data.toString() );
    client.end ( );
  });
client.on( 'end', function ( ) {
  console.log ( 'disconnected from server' );
  // client.end( );
});