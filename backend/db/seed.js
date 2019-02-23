const { db } = require("./queries/connection.js");
const faker = require("faker");

let users = [];

for (let i = 0; i < 20; i++) {
  let username = faker.name.findName();
  let email = faker.internet.email();
  let str = `('${username}', '${email}')`;
  users.push(str);
}

let boards = [];

for (let i = 0; i < 10; i++) {
  let title = faker.system.fileName();
  let user_id = Math.floor(Math.random() * 20) + 1;
  let str = `('${title}', ${user_id})`;
  boards.push(str);
}

let pins = [];
for (let i = 0; i < 100; i++) {
  let user_id = Math.floor(Math.random() * 20) + 1;
  let board_id = Math.floor(Math.random() * 10) + 1;
  let url = faker.image.avatar();
  let str = `(${user_id}, ${board_id}, '${url}')`;
  pins.push(str);
}

users = users.join(", ");
boards = boards.join(", ");
pins = pins.join(", ");

db.none("INSERT INTO users(username, email) VALUES " + users + ";")
  .then(() => {
    db.none("INSERT INTO boards(title, user_id) VALUES " + boards + ";").then(
      () => {
        db.none(
          "INSERT INTO pins(user_id, board_id, url) VALUES " + pins + ";"
        );
      }
    );
  })
  .catch(err => {
    console.log(err);
  });
