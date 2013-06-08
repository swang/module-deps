var mdeps = require('../');
var test = require('tap').test;
var JSONStream = require('JSONStream');
var packer = require('browser-pack');

test('transform', function (t) {
    t.plan(3);
    var p = mdeps(__dirname + '/files/tr_2dep_module/main.js', {
        transform: [ 'insert-aaa', 'insert-bbb' ],
        transformKey: [ 'browserify', 'transform' ]
    });
    var pack = packer();
    
    p.pipe(JSONStream.stringify()).pipe(pack);
    
    var src = '';
    pack.on('data', function (buf) { src += buf });
    pack.on('end', function () {
        console.error('SOURCE:');
        console.error(src);
        Function('t', src)(t);
    });
});