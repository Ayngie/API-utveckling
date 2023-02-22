const { sequelize } = require('../../database/config')

/*
Retrieve a list of the names of presidents that were not in the Democrat or Republican party.
Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, party FROM president WHERE party != 'Democrat' AND party != 'Republican'`

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
