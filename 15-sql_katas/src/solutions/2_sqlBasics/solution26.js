const { sequelize } = require('../../database/config')

/*
Retrieve a list of the pets that are either birds or horses.
Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, species FROM pet WHERE species = 'Bird' OR species = 'Horse'`

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
