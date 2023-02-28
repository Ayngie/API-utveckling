const { sequelize } = require('../../database/config')

/*
There have been 46 presidents so far. Use DISTINCT to find out how many owned pets. 
HINT: You can wrap DISTINCT with COUNT

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `
      SELECT COUNT(DISTINCT fk_president_id) AS presidents_with_pets FROM pet;
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
