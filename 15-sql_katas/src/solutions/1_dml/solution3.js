const { sequelize } = require('../../database/config')

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
  const joeBidenId = 46
  try {
    const query = `
      INSERT INTO pet
      (name, species, breed, birth_date, death_date, age, fk_president_id)  
      VALUES 
      ('Champ', 'Dog', 'German Shepherd', '2008-11-11', '2021-06-19', 13, ${joeBidenId}),
      ('Major', 'Dog', 'German Shepherd', '2018-01-17', NULL, 5, ${joeBidenId}),
      ('Commander', 'Dog', 'German Shepherd', '2021-09-01', NULL, 2, ${joeBidenId}),
      ('Willow', 'Cat', NULL, NULL, NULL, NULL, ${joeBidenId});
    `

    // (SELECT id FROM president WHERE number = 46 AND name = 'Joe Biden')

    const [results, metadata] = await sequelize.query(query)

    console.log(results)
  } catch (error) {
    // Log eny eventual errors to Terminal
    console.error(error)
  } finally {
    // End Node process
    process.exit(0)
  }
}

exercise()
