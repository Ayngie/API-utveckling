const { sequelize } = require('../../database/config')

/*
Use the AVG aggregate function to calculate how long each dead 
president has lived on average.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT AVG(death_year - birth_year) AS avg_age FROM president WHERE death_year IS NOT NULL;
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
