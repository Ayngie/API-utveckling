const { sequelize } = require('../../database/config')

/*
Retrieve a list of all presidents that were born in the 1900s

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, birth_year FROM president WHERE birth_year >= 1900;`

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
