const { sequelize } = require('../../database/config')

/*
Use LIMIT and ORDER BY to return the president that spent the least days in office.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, days_in_office FROM president ORDER BY days_in_office ASC LIMIT 1
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
