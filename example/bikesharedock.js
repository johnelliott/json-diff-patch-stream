const debug = require('debug')('cabi-cache:bikesharedocs')
const jdp = require('jsondiffpatch')
const createDiffSource = require('../json-diff-source.js')
const createDiffSink = require('../json-diff-sink.js')

var one = {
  station_id: '84',
  num_bikes_available: 2,
  num_bikes_disabled: 0,
  num_docks_available: 17,
  num_docks_disabled: 0,
  is_installed: 1,
  is_renting: 1,
  is_returning: 1,
  last_reported: '1465576737',
  eightd_has_available_keys: false
}
function addOrSubtract() {
  return Math.random()>0.5 ? -1 : 1
}
function docker(last) {
  var newBikes = parseInt(last.num_docks_available) + addOrSubtract()
  var newDocks = 20 - newBikes
  return  Object.assign({}, one, {
    num_bikes_available: newBikes,
    num_docks_available: newDocks
  })
}

var diffSource = createDiffSource()

var diffSink = createDiffSink()
diffSource.pipe(diffSink).pipe(process.stdout)

diffSource.write(JSON.stringify(one))
var last = one
setInterval(function() {
  last = docker(last)
  diffSource.write(JSON.stringify(last))
}, 200)
