const { sequelize } = require('../../database/config')

/*
Update the following information about Donald Trump in the president table:
- Left office: 20th january 2021
- He's been in office for 1461 days
- Did not sit for 2 terms

Log the response to the terminal
*/

const exercise = async () => {
  try {
    const query = `
      UPDATE president 
      SET left_office = '2021-01-20', days_in_office = 1461, sat_two_full_terms = FALSE
      WHERE name = 'Donald J. Trump' AND number = 45 
      RETURNING *
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
