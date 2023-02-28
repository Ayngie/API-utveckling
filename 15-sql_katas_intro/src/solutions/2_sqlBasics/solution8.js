const { sequelize } = require('../../database/config')

/*
Retrieve a list of all the presidents in the database.
Log the response to the terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT * FROM president`

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
