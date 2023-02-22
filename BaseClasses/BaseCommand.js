module.exports = class BaseCommand {

    name;
    aliases;
    description;
    usage;
    permissions;
    category;
    ids;
    constructor({name, aliases, description, usage, permissions, category, ids}) {
        this.name = name;
        this.aliases = aliases;
        this.description = description;
        this.usage = usage;
        this.permissions = permissions;
        this.category = category;
        this.ids = ids;
    }
    
    async run(client, message, args) {};
}