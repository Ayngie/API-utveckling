const { sequelize } = require('../../database/config')

/*
Retrieve a list of all first ladies that were born 1800 or earlier

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, birth_year FROM first_lady WHERE birth_year <= 1800;`

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
