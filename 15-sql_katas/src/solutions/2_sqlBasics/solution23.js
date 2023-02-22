const { sequelize } = require('../../database/config')

/*
Retrieve a list of all first ladies born between 1800 and 1900

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, birth_year FROM first_lady WHERE birth_year BETWEEN 1800 AND 1900;`

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
