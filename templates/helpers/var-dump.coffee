treeify = require('treeify')

module.exports = (object) ->
    output = treeify.asTree(object, true, true)
    """<pre>#{output}</pre>"""