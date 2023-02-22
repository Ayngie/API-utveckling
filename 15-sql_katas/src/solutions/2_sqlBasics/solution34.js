const { sequelize } = require('../../database/config')

/*
Calculate how old each president (who is dead) became. Use AS to
give the calculation a descriptive name (e.g. age)

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, death_year - birth_year AS age
      FROM president
      WHERE death_year IS NOT NULL
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
