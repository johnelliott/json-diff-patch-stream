const stream = require('stream')
const debug = require('debug')('cabi-cache:sink')
const jdp = require('jsondiffpatch')

var createSink = function() {
  var last = {}
  return new stream.Transform({
    transform: function(chunk, enc, next){
      // get diff
      var diff = JSON.parse(chunk)
      debug('diff', diff)
      // apply diff to last
      var patched = jdp.patch(last, diff)
      debug('patched', patched)
      // push to output
      this.push(JSON.stringify(patched))
      // keep current state
      last = patched
      debug('newlast', last)
      next()
    },
    flush: function(done) {
      debug('flush!')
      done()
    }
  })
}

module.exports = createSink

if (require.main === module) {
  console.log('run form node')
  var transform = createSink()
  process.stdin.pipe(transform).pipe(process.stdout)
  transform.write(JSON.stringify({a:[2]}))
  transform.write(JSON.stringify({a:[2,3]}))
}
