_ = require("underscore")
moment = require("moment")
var_dump = require("./var-dump")

module.exports = (context, options) ->
  if options.hash.key? then key = options.hash.key else key = "title"
  if options.hash.type? then type = options.hash.type else type = "integer"
  if options.hash.order? then order = options.hash.order else order = "ascending"
  
  if context._.pages.length
    items = ( item for i, item of context._.pages )
  else
    items = ( item["index.md"] for i, item of context._.directories )
  
  if order == 'ascending' then multiplier = 1 else multiplier = -1
  
  switch type
    when "integer" then iterator = (item) -> multiplier * item.metadata[key]
    when "date" then iterator = (item) -> multiplier * moment(item.metadata[key]).unix()
  
  return options.fn _.sortBy( items, iterator )