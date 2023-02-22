const { sequelize } = require('../../database/config')

/*
Retrieve a list of the presidents and first ladies that are still alive
Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT name, death_year FROM president WHERE death_year IS NULL 
      UNION 
      SELECT name, death_year FROM first_lady WHERE death_year IS NULL
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
