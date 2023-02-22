const { sequelize } = require('../../database/config')

/*
Use IS NULL to find the president who was not part of any political party.
Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name FROM president WHERE party IS NULL`

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
