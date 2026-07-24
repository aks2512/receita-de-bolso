const React = require('react');
const { View } = require('react-native');

// Provide a very small KeyboardAvoidingView replacement used in tests
exports.KeyboardAvoidingView = ({ children, ...rest }) => {
  return React.createElement(View, rest, children);
};

module.exports = exports;
