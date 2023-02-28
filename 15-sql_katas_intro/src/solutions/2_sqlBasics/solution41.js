const { sequelize } = require('../../database/config')

/*
Retrieve a list of all dead presidents ordered by their age (oldest first)

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, death_year - birth_year AS age
      FROM president 
      WHERE death_year IS NOT NULL 
      ORDER BY (death_year - birth_year) DESC
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
