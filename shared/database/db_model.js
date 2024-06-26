const mongoose = require('mongoose');

class Model {
    constructor(tablename, schema) {
        this.tablename = tablename;
        this.modelSchema = new mongoose.Schema(schema);
        this.Model = mongoose.model(tablename, this.modelSchema);
    }

    
}
module.exports = Model