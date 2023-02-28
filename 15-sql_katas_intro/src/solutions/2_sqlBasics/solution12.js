const { sequelize } = require('../../database/config')

/*
Retrieve a list of the names and birth countries of first ladies
that were not born in USA:

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, birth_country FROM first_lady WHERE birth_country != 'USA'`

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
