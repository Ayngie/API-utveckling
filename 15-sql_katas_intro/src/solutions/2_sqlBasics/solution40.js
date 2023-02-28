const { sequelize } = require('../../database/config')

/*
Retrieve a list of all presidents ordered by their party name
and days in office.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, party, days_in_office 
      FROM president 
      ORDER BY party, days_in_office
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
