"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports["default"] = handler;

function handler(req, res) {
    res.status(200).json({ name: "John Doe" });
}

module.exports = exports["default"];