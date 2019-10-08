
exports.up = function(knex) {
    return knex.schema.createTable('cars', function (tbl) {
        tbl.increments();
        tbl.string("VIN", 17).notNullable().unique();
        tbl.string("Make").notNullable();
        tbl.string('Model').notNullable();
        tbl.integer('Mileage').notNullable();
        
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
