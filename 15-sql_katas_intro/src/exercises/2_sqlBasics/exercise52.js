const { sequelize } = require("../../database/config");

/*
There have been 46 presidents so far. Use DISTINCT to find out how many people
have been president. HINT: You can wrap DISTINCT with COUNT

Log the response to ther Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT COUNT(DISTINCT id) AS no_of_individuals_that_have_been_president
    FROM president;`;

    const [results, metadata] = await sequelize.query(query);

    console.log(results);
  } catch (error) {
    // Log eny eventual errors to Terminal
    console.error(error);
  } finally {
    // End Node process
    process.exit(0);
  }
};

exercise();
