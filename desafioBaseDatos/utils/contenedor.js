/* -------------------------- Definición módulo fs -------------------------- */
// const fs = require("fs");
// const encoding = "utf-8"
const knex = require('knex');

/* ----------------------- Definición clase contenedor ---------------------- */
class Contenedor {
    constructor(knexConfig, tableName) {
        console.log(`TableName: ${tableName}`);
        this.tableName = tableName;
        this.knexConfig = require(knexConfig);
        this.database = knex(this.knexConfig);
        this.contenedor = this.getAll();
    }

    async save(object) {
        let response = '';
        try {
            await this.database(this.tableName).insert(object);
            response = ('Elemento agregado');
        } catch (err) {
            response = err;
        }
        return response
    }

    async getById(id) {
        const _object = await this.database(this.tableName)
            .select()
            .where('id', id);
        this.contenedor = _object;
        return this.contenedor
    }

    async getAll() {
        const objects = await this.database(this.tableName).select();
        this.contenedor = objects
        return this.contenedor;
    }

    async deleteById(id) {
        let response = '';
        try {
            await this.database(this.tableName)
                .where({ id: id })
                .del()
            response = ('Elemento eliminado');
        } catch (err) {
            response = err;
        }
        return response
    }
}

module.exports = Contenedor // COMMONJS