"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testEndpoint = void 0;
const testEndpoint = (req, res) => {
    res.json({ msg: 'PONG' });
};
exports.testEndpoint = testEndpoint;
