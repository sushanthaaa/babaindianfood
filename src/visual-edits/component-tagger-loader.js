const path = require("path");

module.exports = function (source) {
  // Simple pass-through loader to satisfy the build system
  // In a real scenario, this would tag JSX elements with their source file path
  return source;
};
