const { sequelize } = require('../../database/config')

/*
Use the SUM aggregate function to calculate the total number of 
days a president has been in office.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT SUM(days_in_office) AS days_total FROM president;
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
