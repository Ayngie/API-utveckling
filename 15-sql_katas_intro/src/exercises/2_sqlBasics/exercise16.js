const { sequelize } = require("../../database/config");

/*
Retrieve a list of all presidents that sat for less than 1 term (1461 days).

Log the response to the Terminal.
*/

const exercise = async () => {
  try {
    const query = `SELECT * FROM president
    WHERE days_in_office <1461;`;

    // const query = `SELECT * FROM president p
    // WHERE sat_two_full_terms IS FALSE;`;

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
