
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      return knex("cars").insert([
        {
          id: 1,
          VIN: "SDGFADFGWE254S",
          Make: "Toyota",
          Model: "Yaris",
          Mileage: 19745
        },
        {
          id: 2,
          VIN: "LHIYUJGF548DGTER",
          Make: "Nissan",
          Model: "Altima",
          Mileage: 22135
        },
        {
          id: 3,
          VIN: "SDYTFHFGFH5461",
          Make: "Ford",
          Model: "Fusion",
          Mileage: 136984
        }
      ]);
    });
};
