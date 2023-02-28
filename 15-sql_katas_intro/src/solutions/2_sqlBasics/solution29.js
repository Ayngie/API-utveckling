const { sequelize } = require('../../database/config')

/*
Use the IN/NOT IN operator to retrieve a list of pets that are not cats, dogs or horses.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, species FROM pet WHERE species NOT IN ('Cat', 'Dog', 'Horse')`

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
