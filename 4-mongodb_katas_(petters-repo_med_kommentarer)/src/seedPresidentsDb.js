/* seedPresidentsDb.js
- Här seed'ar vi databasen (*sår, planterar, så att vi sedan kan "skörda" den...*. Vi skickar in presidents (amerikanska presidenter, exempeldata).
  - Att "seed-a": att fylla på.
	- Fröt vi sår är den hårdkodade datan med presidenter, som i denna js-fils kod skickas in i databasen.
- Denna testdata kan vi leka runt med i databasen, o sen varje gång vi kör denna kod så raderas våra ändingar i databasen, och mockdatan skickas in på nytt (typ "återställs") (allt i presidents tabellen). */

const mongoose = require("mongoose"); //importerar mongoose
const { connectionString } = require("./config"); //vår connection string till databasen
const President = require("./models/President"); //klassen typ
const { presidents } = require("./data/presidents"); //mockdatan som jag förstår det

const seedPresidentsDb = async () => {
  //funktion för att rensa och fylla på.
  let conn; //skapar en tom variabel
  let exitCode = 0; //deklarera egen variabel, som vi sätter till noll på defaultvärde (Att vi har lyckats, dvs ingen felkod).
  try {
    // Connect to database
    mongoose.set("strictQuery", false); // https://stackoverflow.com/questions/74747476/deprecationwarning-mongoose-the-strictquery-option-will-be-switched-back-to  //ngn option som behövs för att ansluta till databasen?
    conn = await mongoose.connect(connectionString); //ansluter till databasen // You can connect to MongoDB with the `mongoose.connect()` method.

    // Clear database from any existing data
    console.log("Clearing database..."); //rensar så att varje g vi laddar om koden så återställs datan - det gör koden i hela denna funktion.
    await President.deleteMany();

    // Add data to database
    console.log("Adding data...");
    /*
    for (const president of presidents) {
      const presidentInstance = new President({
        number: president.number,
        name: president.name,
        birth_year: president.birth_year,
        death_year: president.death_year,
        took_office: president.took_office,
        left_office: president.left_office,
        party: president.party,
        days_in_office: president.days_in_office,
        sat_two_full_terms: president.sat_two_full_terms,
      })
      const res = await presidentInstance.save()

      // const res = await President.create(president)
      if (res) console.log(`${president.name} added to db...`)
    }
    */
    await President.create(presidents); //här skapas mockdatan upp i databasen.

    console.log("Database successfully populated with data..."); //om gick bra -loggar att det gick bra, annars hamnar vi i vår catch.
    //Här skulle vi kunnat exita med kod noll (process.exit(0)) iom allt gick bra.
  } catch (error) {
    // Log eny eventual errors to Terminal
    console.error(error);
    //Här skulle vi då sedan kunnat exita med en annan kod än kod noll (process.exit(0)) iom allt INTE gick bra.
    //isåfall kör vi ingen exit i finally clausen. Då har man bara disconnect där.
    // exitCode = 1; //Sätter egen exitcode för om det inte gick bra, säger 1 bara för att ha ngt annat än 0. Då får man utgå från vad
    //nästa nivå här skulle vara att kasta tillbaka errorn, så att man får upp den en nivå, så felet kastast vidare upp i kedjan - iom att man vill hantera felet högre upp (den som har anropat koden för att köra den får också då ta hand om felet).
    //man vill skicka vidare felet för att inte dölja att det gått snett.
    //throw
  } finally {
    //körs alltid, oavsett om det gått bra/dåligt.
    //finally ska vara designat så att finally körs alltid, oavsett var man är i övriga koden. Oavsett om vi exitat ovan. Oklart om detta gäller även i denna kod dock. Får dubbelkollas så det inte är ngn special. Annars får man göra en variabel ist o hålla reda på om det gått bra eller dåligt - det hade i sig varit ytterligare bättre kod.
    // Disconnect from database
    if (conn) conn.disconnect(); //om conn inte är null, utan om conn sattes till ngt - dvs om det blev en connection till databasen. Då ska vi dissconnecta nu.
    // End Node process
    process.exit(exitCode); //bytte ut nollan här mot egen variabel som är satt till noll. Då kan man ändra variabelns värde i catchen till korrekt felkod.
    //ngt sätt vi exitar vår körning på? //Att exita med kod 0 betyder i de flesta programmeringsspråk att allt gått bra, annars brukar det bli en annan siffra som innebär en felkod.
    //här disconnectar vi med kod noll oavsett hur det gått dock - inte helt 100.
  }
};

seedPresidentsDb(); //anrop
