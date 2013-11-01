moment = require('moment')

module.exports = (date, format, options) ->
  if arguments.length == 2
    options = format
    format = "MMMM DD, YYYY"
  moment(date).format(format)