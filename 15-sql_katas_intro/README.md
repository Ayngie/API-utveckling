## Intro

This repo contains exercises for practicing basic SQL commands.

## Instructions

Required:

- Node v18.12.1

To get up and running just run "npm install" in your Terminal.

You can find the SQLite database under /src/database/presidentsDb.sqlite. It should already be populated with the correct starting data. If you ever need to reset the database to its original state just run "npm run seedDb" in your Terminal. That should reset the data to the state it was before you started working on your exercises (of which exercise 1-7 involve altering/adding data to the db).

Navigate to the /src/exercises directory. Here you'll find your exercises sorted into different folders. Write a SQL query that produces a result according to the comment at the top of each respective file. To check your work just run "npm run exerciseX" where "X" is substituted for the number of the exercise you are on; e.g. "npm run exercise1"

To see the result that the solution produces run "npm run solutionX" where "X" is substituted for the number of the exercise you are on; e.g. "npm run solution1". The code for all solutions can be found under /src/solutions.

NOTE: Depending on what DBMS you use you can also connect to the SQLite database via that and run your queries there. You could also use a VSCode extension to do the same.
