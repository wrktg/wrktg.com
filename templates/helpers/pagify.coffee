module.exports = (context, options) ->
  env = context.__env
  page = new env.plugins.MarkdownPage context.filepath, context.metadata, context.markdown
  options.fn page