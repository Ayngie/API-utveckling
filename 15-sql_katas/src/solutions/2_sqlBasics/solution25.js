const { sequelize } = require('../../database/config')

/*
Retrieve a list of all first ladies that were between 18 and 30 years old 
when they began their tenure as first lady of the US and where not born
between 1800 and 1850.

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, birth_year, age_at_tenure_start 
      FROM first_lady 
      WHERE age_at_tenure_start BETWEEN 18 AND 30 AND birth_year NOT BETWEEN 1800 AND 1850;
    `

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
