const mongoose = require('mongoose');

class Model {
    constructor(tablename, schema) {
        this.tablename = tablename;
        this.modelSchema = new mongoose.Schema(schema);
        this.Model = new mongoose.model(tablename, this.modelSchema);
    }

    register(){
        const db_model = this.Model
        return db_model
    }
}

module.exports = Model;
