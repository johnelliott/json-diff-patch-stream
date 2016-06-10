const stream = require('stream')
const debug = require('debug')('cabi-cache:stream')
const jdp = require('jsondiffpatch')

var dup = function() {
  var last = {}
  return new stream.Transform({
    transform: function(chunk, enc, next){
      debug('last', last)
      var json = JSON.parse(chunk)
      debug('json', json)
      var diff = jdp.diff(last, json)
      debug('diff', diff)
      this.push(JSON.stringify(diff)+'\n')
      last = jdp.patch(last, diff)
      debug('newlast', last)
      next()
    },
    flush: function(done) {
      debug('flush!')
      done()
    }
  })
}

module.exports = dup

if (require.main === module) {
  console.log('run form node')
  var transform = dup()
  process.stdin.pipe(transform).pipe(process.stdout)
  transform.write(JSON.stringify({a:2}))
  transform.write(JSON.stringify({a:3}))
}
