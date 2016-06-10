# JSON-diff-patch-stream
Two transform streams to send JSON diffs and parse JSON patches

# installation
```sh
$ npm install --save json-diff-patch-stream
```

# use
``` javascript
const createDiffSource = require('json-diff-patch-stream').createSource
const diffSource = createDiffSource() // Transform stream

process.stdin.pipe(diffSource).pipe(process.stdout)
```

get approximately this:
```sh
$ node myStream.js
{"a":2} # prints { a: [2] }
```
