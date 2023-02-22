const { sequelize } = require('../../database/config')

/*
Use the AVG aggregate function to calculate average age of a
first lady when she takes office.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT AVG(age_at_tenure_start) AS avg_age FROM first_lady;
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
