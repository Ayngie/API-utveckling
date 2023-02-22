const { sequelize } = require('../../database/config')

/*
On second thought, let's not jump ahead of ourselves. Please 
remove Ron DeSantis and Nikki Haley from the database.

Log the response to the terminal
*/

const exercise = async () => {
  try {
    const query = `
      DELETE FROM president 
      WHERE number = 47
      RETURNING *;
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
