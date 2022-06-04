const express = require("express");
const app = express();
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

let dbPath = path.join(__dirname, "goodreads.db");

let db = null;

const initializeDatabaseAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server is running at http://localhost:3000");
    });
  } catch (e) {
    console.log(`DB error : ${e.message}`);
    process.exit(1);
  }
};

initializeDatabaseAndServer();

app.get("/books/", async (request, response) => {
  let searchquery = `
        SELECT 
        * 
        FROM 
        book
        ORDER_BY 
        book_id;`;
  let responseResultArray = await db.all(searchquery);
  response.send(responseResultArray);
});
