var net = require( 'net' );
var PORT = 80;
var HOST = process.argv[ 2 ];
var URI = process.argv[ 3 ] || '/';

var client = net.connect( PORT, HOST, function( ){
    client.write( 'GET ' + URI + '  HTTP/1.1\n' +
        'Host: '+ HOST + '\n\n');
});
client.on( 'data', function( data ){
  console.log( 'DATA' + data );
  client.end();
});
client.on( 'end', function(){
  console.log( 'End connection' );
});