const { sequelize } = require("../../database/config");

/*
Add Joe Biden's pets to the pet table in the database. They have/had:
- 3 dogs (German Shepherds):
  - Champ: Born 2008-11-11 and died 2021-06-19 at 13 years old
  - Major: Born 2018-01-17 and currently 5 years old
  - Commander: Born 2021-09-01 and currently 2 years old

- 1 cat: Willow (all other details unknown...)

Log the response to the terminal
*/

const exercise = async () => {
  try {
    const query = `SELECT * FROM pet;`;
    /*const query = `INSERT INTO pet (id, name, species, breed, mammal, birth_date, death_date, age, fk_president_id)
VALUES
(237, 'Champ','Dog', 'German Shepherd', 1, '2008-11-11', '2021-06-19', 13, 46),
(238, 'Major','Dog', 'German Shepherd', 1, '2018-01-17', NULL, 5, 46),
(239, 'Commander','Dog', 'German Shepherd', 1, '2021-09-01', NULL, 2, 46);
`;*/

    /* 
För att radera:
`DELETE from pet
WHERE id = 234;`

eller
`DELETE from pet
WHERE id BETWEEN 235 AND 236;`
*/

    /*
För att uppdatera:
`UPDATE pet
SET id = 234
WHERE id = 237;`
*/

    //GLÖMDE KATTEN!
    //La till som följande:
    // INSERT INTO pet (id, name, species, breed, mammal, birth_date, death_date, age, fk_president_id)
    // VALUES
    // (237, 'Willow','Cat', NULL, 1, NULL, NULL, NULL, 46)
    // Returning *;

    //PETTERS LÖSN:
    // INSERT INTO pet
    //       (name, species, breed, birth_date, death_date, age, fk_president_id)
    //       VALUES
    //       ('Champ', 'Dog', 'German Shepherd', '2008-11-11', '2021-06-19', 13, 46),
    //       ('Major', 'Dog', 'German Shepherd', '2018-01-17', NULL, 5, 46),
    //       ('Commander', 'Dog', 'German Shepherd', '2021-09-01', NULL, 2, 46),
    //       ('Willow', 'Cat', NULL, NULL, NULL, NULL, 46);

    const [results, metadata] = await sequelize.query(query);

    console.log(results);
  } catch (error) {
    // Log eny eventual errors to Terminal
    console.error(error);
  } finally {
    // End Node process
    process.exit(0);
  }
};

exercise();
