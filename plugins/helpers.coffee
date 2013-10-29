module.exports = ( env, callback ) ->

  # Return pages on the same level this given page
  get_children = (page) ->
    children = []
    Object.keys(page.parent || {}).map (key) ->
      child = page.parent[key]
      if child isnt page
        if child["index.md"]? then children.push child["index.md"]
        else if child["index.json"]? then children.push child["index.json"]
    return children

  env.helpers.get_children = get_children

  callback()