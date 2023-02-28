const { sequelize } = require('../../database/config')

/*
Retrieve a list of all presidents that sat for less than 1 term (1461 days).

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, days_in_office FROM president WHERE days_in_office < 1461;`

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
