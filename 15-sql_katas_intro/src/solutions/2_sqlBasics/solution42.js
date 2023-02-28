const { sequelize } = require('../../database/config')

/*
Use the MIN aggregate function to find the youngest ever first lady.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT MIN(age_at_tenure_start) FROM first_lady
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
