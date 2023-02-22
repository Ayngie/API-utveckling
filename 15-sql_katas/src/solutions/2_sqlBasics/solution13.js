const { sequelize } = require('../../database/config')

/*
Without using the wife_of_president column retrieve a list of the first ladies
that were not the 'Spouse' of the president they served as first lady for.

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, relationship_with_president FROM first_lady WHERE relationship_with_president != 'Spouse'`

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
