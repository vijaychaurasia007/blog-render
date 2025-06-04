"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Document;

var _nextDocument = require("next/document");

function Document() {
  return React.createElement(
    _nextDocument.Html,
    { lang: "en" },
    React.createElement(_nextDocument.Head, null),
    React.createElement(
      "body",
      null,
      React.createElement(_nextDocument.Main, null),
      React.createElement(_nextDocument.NextScript, null)
    )
  );
}

module.exports = exports["default"];