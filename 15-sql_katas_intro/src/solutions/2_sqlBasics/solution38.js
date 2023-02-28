const { sequelize } = require('../../database/config')

/*
Retrieve a list of all presidents ordered by the number of
days spent in office in descending order.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, days_in_office
      FROM president
      ORDER BY days_in_office DESC
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
