const { sequelize } = require('../../database/config')

/*
Retrieve a list of all Republican presidents (number, name, party, sat_two_full_terms) that have sat two full terms
Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT number, name, party, sat_two_full_terms FROM president WHERE sat_two_full_terms = TRUE AND party = 'Republican'`

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
