const { sequelize } = require('../../database/config')

/*
Retrieve a list of the pets we know the birth date of.
Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, birth_date, death_date, age FROM pet WHERE birth_date IS NOT NULL`

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
