var argv = require('minimist')(process.argv.slice(2))
var execSync = require('child_process').execSync

if (argv.h || argv.help || argv._.length === 0) {
  console.log('Usage: generate-static name [html]')
  process.exit(0)
}

var imagename = argv._.shift()
var html = argv._.shift() || '<h1>Hello Docker</h1>'
console.log('Image:', imagename)
console.log('HTML:', html)

var command = 'docker pull nginx:latest'
console.log(command)
var pull = execSync(command).toString()
console.log(pull)

command = 'docker run -d nginx:latest'
console.log(command)
var id = execSync(command).toString().replace('\n', '')
console.log('id', id)

var index = 'echo "' + html + '" > /usr/share/nginx/html/index.html'
command = 'docker exec ' + id + ' /bin/sh -c "' + index.replace(/"/g, '\\"') + '"'
console.log(command)
var done = execSync(command).toString()
console.log(done)

command = 'docker commit ' + id + ' ' + imagename
console.log(command)
var container = execSync(command).toString()
console.log(container)

console.log('Docker image is now generated:')
console.log(imagename)
