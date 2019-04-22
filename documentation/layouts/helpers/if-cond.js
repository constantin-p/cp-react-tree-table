

module.exports = (a, operator, b, options) => {
  switch (operator) {
    case '==':
      return (a == b) ? options.fn(this) : options.inverse(this);
    case '===':
      return (a === b) ? options.fn(this) : options.inverse(this);
    case '!=':
      return (a != b) ? options.fn(this) : options.inverse(this);
    case '!==':
      return (a !== b) ? options.fn(this) : options.inverse(this);
    case '<':
      return (a < b) ? options.fn(this) : options.inverse(this);
    case '<=':
      return (a <= b) ? options.fn(this) : options.inverse(this);
    case '>':
      return (a > b) ? options.fn(this) : options.inverse(this);
    case '>=':
      return (a >= b) ? options.fn(this) : options.inverse(this);
    case '&&':
      return (a && b) ? options.fn(this) : options.inverse(this);
    case '||':
      return (a || b) ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
}