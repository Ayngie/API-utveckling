const { sequelize } = require('../../database/config')

/*
Use the COUNT aggregate function to answer the question: How many 
first ladies were not married to the president?

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT COUNT(*) AS num_of_first_ladies FROM first_lady WHERE wife_of_president = FALSE;
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
