const { sequelize } = require('../../database/config')

/*
Retrieve a list of the name and birth country of all first ladies.
Log the response to the terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, birth_country FROM first_lady`

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
