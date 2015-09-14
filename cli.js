var argv = require('minimist')(process.argv.slice(2))
var execSync = require('child_process').execSync

if (argv.h || argv.help || argv._.length === 0) {
  console.log('Usage: generate-static name [html]')
  process.exit(0)
}
var cmd = ''
var command = function (cmd) {
  console.log(cmd)
  return cmd
}

var imagename = argv._.shift()
var html = argv._.shift() || '<h1>Hello Docker</h1>'
console.log('Image:', imagename)
console.log('HTML:', html)

cmd = command('docker pull nginx:latest')
var pull = execSync(cmd).toString()
console.log(pull)

cmd = command('docker run -d nginx:latest')
var id = execSync(cmd).toString().replace('\n', '')
console.log('id', id)

var index = 'echo "' + html + '" > /usr/share/nginx/html/index.html'
cmd = command('docker exec ' + id + ' /bin/sh -c "' + index.replace(/"/g, '\\"') + '"')
var done = execSync(cmd).toString()
console.log(done)

cmd = command('docker commit ' + id + ' ' + imagename)
var container = execSync(cmd).toString()
console.log(container)

cmd = command('docker rm -f ' + id)
var rm = execSync(cmd).toString()
console.log(rm)

console.log('\nDocker image is now generated:')
console.log(imagename)
