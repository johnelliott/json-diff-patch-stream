var test = require('tape')
const jds = require('../json-diff-source.js')

test('test rig', function(t) {
  t.plan(1)
  t.ok('win')
})

test('stream anatomy', function(t) {
  t.plan(3)
  t.equal(typeof jds, 'function', 'its a function')
  var transform = jds()
  t.true(transform.readable, 'its readable')
  t.true(transform.writable, 'its writable')
})

test('stream takes writes', function(t) {
  t.plan(3)
  var transform = jds()
  transform.write(JSON.stringify({a:2}))
  t.ok(transform._transformState, 'trans state')
  t.ok(transform._transformState.writechunk, 'trans .writeChunk')
  t.deepEqual(transform._transformState.writechunk, '{"a":2}', 'trans .writeChunk contents')
})

test.skip('stream readability...', function(t) {
  t.plan(3)
  var transform = jds()
  transform.write(JSON.stringify({a:2}))
  t.ok(transform._transformState, 'trans state')
  t.ok(transform._transformState.writechunk, 'trans .writeChunk')
  t.deepEqual(transform._transformState.writechunk, '{"a":2}', 'trans .writeChunk contents')
})

