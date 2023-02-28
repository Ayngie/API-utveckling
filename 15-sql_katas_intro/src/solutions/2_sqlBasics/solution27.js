const { sequelize } = require('../../database/config')

/*
Retrieve a list of the presidents that were part of the Whig, Federalist, or Democratic-Republican parties.
Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, party FROM president WHERE party = 'Whig' OR party = 'Democratic-Republican' or party = 'Federalist'`

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
