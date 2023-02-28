const { sequelize } = require('../../database/config')

/*
Use the COUNT() function to calculate how many 

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT party, COUNT(*) AS num_of_presidents FROM president GROUP BY party;
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
