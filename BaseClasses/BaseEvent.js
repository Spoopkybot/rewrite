const { isConstructorDeclaration } = require("typescript");

module.exports = class BaseEvent {
    name;
    constructor(name) {
        this.name = name;
    }
    async run (client, ...args) {};
}