const { sequelize } = require('../../database/config')

/*
Retrieve a list of only the names, species and breed of Richard 
Nixons pets using only his name. HINT: Use a nested SELECT statement.

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT name, species, breed FROM pet WHERE fk_president_id = (SELECT id FROM president WHERE name = 'Richard Nixon')`

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
