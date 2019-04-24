

module.exports = (context, key, options) => {
  return options.fn(context[key]);
}