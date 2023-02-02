//Här ska vi skriva vårt nya "schema"
//vi skippar ID, det skapas av mongoDB
//Vi kommer inte ta med id för det ska autogenereras av mongoDB,
//vi beh bara name o description då. Men
//vi lägger till lite conditions, därför anv vi syntax för att kunna lägga till saker.

const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    description: {
      type: String,
      maxLength: 500,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Todo", TodoSchema);
