const { sequelize } = require('../../database/config')

/*
Add current first lady Jill Biden to the first_lady table in the database:
- She is the spouse of the 46th president Joe Biden
- Born June 3, 1951 in the USA
- She was 69 years olden when she took office on the 20th january 2021

Log the response to the terminal
*/

const exercise = async () => {
  try {
    const query = `
      INSERT INTO first_lady 
      (name, birth_year, tenure_start, age_at_tenure_start, birth_country, wife_of_president, relationship_with_president, fk_president_id)  
      VALUES 
      ('Jill Biden', 1951, '2021-01-20', 69, 'USA', TRUE, 'Spouse', 46);
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
