
exports.up = function(knex) {
  return knex.schema.table('cars', tbl => {
      tbl.string('Transmission Type');
      tbl.string('Title');
      }) 
};

exports.down = function (knex) {
    return knex.schema.table('cars', tbl => {
        tbl.dropColumn('Transmission Type');
        tbl.dropColumn("Title");
  
})
};
