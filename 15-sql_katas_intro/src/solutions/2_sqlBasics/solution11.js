const { sequelize } = require('../../database/config')

/*
Retrieve a list of the names and species of Richard Nixons pets using his primary key (id)
Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, species FROM pet WHERE fk_president_id = 37`

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
