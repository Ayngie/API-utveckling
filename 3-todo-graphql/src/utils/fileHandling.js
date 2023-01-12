const fsPromises = require("fs/promises");

exports.fileExists = async (filePath) =>
  !!(await fsPromises.stat(filePath).catch((e) => false));
//filePath är en placeholder för vad som sen ska skickas in. Vi väljer filePath för det är en sådan vi vill kunna skicka in.

exports.readJsonFile = async (filePath) =>
  JSON.parse(await fsPromises.readFile(filePath, { encoding: "utf-8" }));

exports.deleteFile = async (filePath) => await fsPromises.unlink(filePath); //gör helper function (deleteFile)av inbyggda funktionen unlink iom den har ett "dåligt" namn för vad den eg. gör. Unlink är inte självklart för alla att den raderar filen.

exports.getDirectoryFileNames = async (directoryPath) =>
  await fsPromises.readdir(directoryPath); //helper function för att skriva getDirectoryFileNames ist för fsPromises.readdir - för bättre tydlighet i funktionsnamn - tydligare vad vi ska göra!
//directoryPath är en placeholder för vad som sen ska skickas in. Vi väljer filePath för det är en sådan vi vill kunna skicka in.
