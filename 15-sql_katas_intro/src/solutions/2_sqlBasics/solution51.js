const { sequelize } = require('../../database/config')

/*
Use the COUNT aggregate function to calculate how many more first ladies 
than presidents there have been. HINT: Use a nested SELECT query.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT COUNT(*) - (SELECT COUNT(*) FROM president) AS president_first_lady_diff FROM first_lady;
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
