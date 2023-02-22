const { sequelize } = require('../../database/config')

/*
Find president Richard Nixon's primary key (id). Only return his id and name.
Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT id, name FROM president WHERE name = 'Richard Nixon'`

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
