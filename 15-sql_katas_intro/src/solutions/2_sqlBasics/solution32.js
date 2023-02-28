const { sequelize } = require('../../database/config')

/*
Retrieve a list of presidents that were republican and sat for 2 full terms
or where democrat and sat for less than 1461 days.

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, party, days_in_office
      FROM president
      WHERE (party = 'Republican' AND sat_two_full_terms = TRUE) 
        OR (party = 'Democrat' AND days_in_office < 1461)
    `

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
