const { createCanvas } = require('canvas')

module.exports = function (options) {
    const {
        width = 500,
        height = 300,
        bgColor = 'cccccc',
        color = '969696',
    } = options

    const text = options.text || `${width} x ${height}`

    const canvas = createCanvas(width, height)
    const ctx = canvas.getContext('2d')
    const fontSize = 40
    ctx.font = `${fontSize}px Impact`
    ctx.textAlign = 'left'

    ctx.fillStyle = '#' + bgColor
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#' + color
    const { width: textWidth } = ctx.measureText(text)
    ctx.fillText(text, (width - textWidth) / 2, (height + fontSize) / 2)

    const stream = canvas.pngStream()

    return stream
}
