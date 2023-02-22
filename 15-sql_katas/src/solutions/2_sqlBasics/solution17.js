const { sequelize } = require('../../database/config')

/*
Retrieve a list of all presidents that sat for longer than the now standard 2 terms; 2992 days.

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, days_in_office FROM president WHERE days_in_office > 2992;`

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
