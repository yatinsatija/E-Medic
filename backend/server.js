const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "LoginSystem",
});

//Reference post reg
app.post("/registerc", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const date = req.body.date;
  const phone = req.body.phone;
  const skillname = req.body.skillname;
  const applied = req.body.applied;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO customer (cid, password,email,date,phone,skillname,applied) VALUES (?,?,?,?,?,?,?)",
      [name, hash, email, date, phone, skillname, applied],
      (err, result) => {
        console.log(err);
      }
    );
  });
});
app.post("/registers", (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  const email = req.body.email;
  const date = req.body.date;
  const phone = req.body.phone;
  const skillname = req.body.skillname;
  const applied = req.body.applied;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO staff (name, password,email,date,phone,skillname,applied) VALUES (?,?,?,?,?,?,?)",
      [name, hash, email, date, phone, skillname, applied],
      (err, result) => {
        console.log(err);
      }
    );
  });
});
app.post("/delivery", (req, res) => {
  const city = req.body.city;
  const address = req.body.address;
  const pincode = req.body.pincode;
  const state = req.body.state;
  const order = req.body.order;
  // const phone = req.body.phone;
  // const skillname = req.body.skillname;
  // const applied = req.body.applied;

  db.query(
    "INSERT INTO delivery (address, city,state,pincode,oid) VALUES (?,?,?,?,?)",
    [address, city, state, pincode, order],
    (err, result) => {
      console.log(err);
    }
  );
});
app.get("/deliverydetails", (req, res) => {
  db.query(
    "SELECT * FROM delivery ORDER BY did DESC LIMIT 1",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/loginc", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});
app.post("/checkname", (req, res) => {
  const email = req.body.emailAddress;
  console.log(email);
  db.query(
    "SELECT * FROM customer WHERE email = (?)",
    [email],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/loginc", (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM customer WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
          // localStorage.setItem("name", req.session.user.name);
          // console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Wrong email/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});
app.get("/admin", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/admin", (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM staff WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;

          res.send(result);
        } else {
          res.send({ message: "Wrong email/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});
app.get("/logins", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/logins", (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  db.query("SELECT * FROM staff WHERE email = ?;", email, (err, result) => {
    if (err) {
      res.send({ err: err });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
          req.session.user = result;
          // localStorage.setItem("name", req.session.user.name);
          // console.log(req.session.user);
          res.send(result);
        } else {
          res.send({ message: "Wrong email/password combination!" });
        }
      });
    } else {
      res.send({ message: "User doesn't exist" });
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/negateorder", (req, res) => {
  const mid = req.body.mid;
  const val = req.body.isavail;
  let temp = mid;
  if (val == 1) temp = 0;
  else temp = 1;

  db.query(
    "UPDATE medicine SET isavail = (?) WHERE mid = (?)",
    [temp, mid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("success");
      }
    }
  );
});

app.get("/medicines", (req, res) => {
  db.query("SELECT * FROM medicine", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/myorders", (req, res) => {
  const user = req.body.user;
  db.query("SELECT * FROM orders WHERE cid = (?)", [user], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/addmedicine", (req, res) => {
  const mname = req.body.mname;
  const price = req.body.price;
  const pneed = req.body.presneed;
  db.query(
    "SELECT * FROM medicine WHERE mname = (?)",
    [mname],
    (err, result) => {
      console.log(result);
      if (err) {
        console.log(err);
      } else if (result.length == 0) {
        db.query(
          "INSERT into medicine (mname,price,prescriptionneed) VALUES (?,?,?)",
          [mname, price, pneed],
          (err1, result2) => {
            if (err1) {
              console.log(err);
            } else {
              res.send("success");
            }
          }
        );
      } else {
        console.log("fail");
        res.send("failure");
      }
    }
  );
});

app.get("/ordernumber", (req, res) => {
  db.query("SELECT MAX(oid) FROM orders", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
app.get("/billnumber", (req, res) => {
  db.query("SELECT MAX(bno) FROM bill", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});
app.post("/order", (req, res) => {
  const orderId = req.body.id;
  const cid = req.body.cid;
  console.log(orderId);
  console.log(cid);

  db.query(
    "INSERT INTO orders (oid,cid) VALUES (?,?)",
    [orderId, cid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successful");
      }
    }
  );
});

app.post("/bill", (req, res) => {
  const BillId = req.body.billId;
  const oid = req.body.oid;

  db.query(
    "INSERT INTO bill (bno,oid) VALUES (?,?)",
    [BillId, oid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successful");
      }
    }
  );
});

app.post("/generatebill", (req, res) => {
  const oid = req.body.oid;
  console.log(oid);

  db.query("SELECT * FROM gets WHERE oid = (?)", [oid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successful");
      res.send(result);
    }
  });
});

app.post("/billid", (req, res) => {
  const oid = req.body.oid;

  db.query("SELECT * FROM bill WHERE oid = (?)", [oid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/billmed", (req, res) => {
  const mid = req.body.mid;
  console.log(mid);

  db.query("SELECT * FROM medicine WHERE mid = (?)", [mid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("successful");
      res.send(result);
    }
  });
});

app.post("/progress", (req, res) => {
  const cid = req.body.checkID;

  db.query("SELECT * from bill WHERE oid = (?)", [cid], (err, result) => {
    if (err) {
      console.log(err);
      res.send("no");
    } else {
      if (result.length > 0) res.send("yes");
      else res.send("no");
    }
  });
});

app.post("/validate", (req, res) => {
  const orderId = req.body.oid;
  console.log(orderId);

  db.query(
    "UPDATE orders SET isval = 1 WHERE oid = (?)",
    [orderId],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successful");
      }
    }
  );
});

app.post("/basket", (req, res) => {
  const mid = req.body.mid;
  const oid = req.body.oid;

  db.query(
    "INSERT INTO gets (mid,oid) VALUES (?,?);",
    [mid, oid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("successful");
      }
    }
  );
});
app.post("/removedoctor", (req, res) => {
  const did = req.body.did;

  db.query("DELETE from staff WHERE sid = (?)", [did], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("success");
    }
  });
});
app.get("/doctors", (req, res) => {
  db.query("SELECT * FROM staff WHERE skillname = 'Doctor'", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const wage = req.body.wage;
//   db.query(
//     "UPDATE employees SET wage = ? WHERE id = ?",
//     [wage, id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

// app.delete("/delete/:id", (req, res) => {
//   const id = req.params.id;
//   db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
