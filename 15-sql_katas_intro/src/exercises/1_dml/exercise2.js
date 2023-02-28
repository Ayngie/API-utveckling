const { sequelize } = require("../../database/config");

/*
Add current first lady Jill Biden to the first_lady table in the database:
- She is the wife of the 46th president Joe Biden
- Born June 3, 1951 in the USA
- She was 69 years old when she took office on the 20th january 2021

Log the response to the terminal
*/

const exercise = async () => {
  try {
    const query = `SELECT * FROM first_lady;`; //Get all firstladies:

    /*Lägga till Jill Biden: */
    // const query = `INSERT INTO first_lady (id, name, birth_year, tenure_start, age_at_tenure_start, birth_country, wife_of_president, relationship_with_president, fk_president_id)
    // VALUES (54, 'Jill Biden', 1951, '2021-01-20', ((2021)-(1951)), 'USA', 1, 'Spouse', 46);`; //Get all firstladies:

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
