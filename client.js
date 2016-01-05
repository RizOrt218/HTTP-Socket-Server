var net = require( 'net' );
var client = net.connect ({
  port: 8080,
  host: 'localhost'
},
  function ( ) { //'connect' listener
  console.log( 'connected to server!' );
  client.write( 'GET / HTTP/1.1\n ' );
  client.write( 'Host: localhost:8080\n' );
  client.write( 'Cache-Control: no-cache' );
  client.write( 'word!\r\n' );
});
client.on( 'data', function ( data ) {
  console.log( data.toString() );
  client.end ( );
});
client.on( 'end', function ( ) {
  console.log ( 'disconnected from server' );
});