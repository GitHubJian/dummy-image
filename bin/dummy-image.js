#!/usr/bin/env node

const program = require('commander')
const pkg = require('../package.json')

program.version(`${pkg.name} ${pkg.version}`).usage('<command> [options]')

program
    .command('start')
    .description('start image serve')
    .option('-p, --port', 'port')
    .action((cmd) => {
        const options = cleanArgs(cmd)

        require('../src')(options)
    })

program.parse(process.argv)

function camelize(str) {
    return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

function cleanArgs(cmd) {
    const args = {}
    cmd.options.forEach((o) => {
        const key = camelize(o.long.replace(/^--/, ''))
        if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
            args[key] = cmd[key]
        }
    })
    return args
}
