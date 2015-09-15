var argv = require('minimist')(process.argv.slice(2))
var execSync = require('child_process').execSync

if (argv.h || argv.help || argv._.length === 0) {
  console.log('Usage: generate-static name [html]')
  process.exit(0)
}

var run = function (cmd) {
  console.log(cmd)
  var result = execSync(cmd)
  return result.toString()
}

var imagename = argv._.shift()
var html = argv._.shift() || '<h1>Hello Docker</h1>'
console.log('Image:', imagename)
console.log('HTML:', html)

var pull = run('docker pull nginx:latest')
console.log(pull)

var id = run('docker run -d nginx:latest').replace('\n', '')
console.log('id', id)

var index = 'echo "' + html + '" > /usr/share/nginx/html/index.html'
var done = run('docker exec ' + id + ' /bin/sh -c "' + index.replace(/"/g, '\\"') + '"')
console.log(done)

var container = run('docker commit ' + id + ' ' + imagename)
console.log(container)

var rm = run('docker rm -f ' + id)
console.log(rm)

console.log('\nDocker image is now generated:')
console.log(imagename)
