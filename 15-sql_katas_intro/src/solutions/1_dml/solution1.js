const { sequelize } = require('../../database/config')

/*
Add president Joe Biden to the president table in the database:
- The 46th president
- Born November 20, 1942
- Took office: 20th january 2021
- He's been in office for ca 732 days

Log the response to the terminal
*/

const exercise = async () => {
  try {
    const query = `
      INSERT INTO president 
      (number, name, birth_year, took_office, party, days_in_office)  
      VALUES 
      (46, 'Joe Biden', 1942, '2021-01-20', 'Democrat', 732);
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
