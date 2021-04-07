const express = require("express");
const path = require("path");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
// const bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
// const session = require("express-session");

// app.use(express.json());

// app.use(cors());
app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "supermarket2",
});

app.post("/addUser", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "INSERT INTO user(name, email, password) VALUES (?,?,?)",
    [name, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully added");
      }
    }
  );
});

// update users
app.put("/updateUser", (req, res) => {
  const UId = req.body.UId;
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const sqlUpdate =
    "UPDATE user SET name = ?, email = ?, password = ? WHERE iduser = ?";

  db.query(sqlUpdate, [name, email, password, UId], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// get user details
app.get("/getUsers", (req, res) => {
  db.query("SELECT * FROM user", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete users
app.delete("/deleteUsers/:Uid", (req, res) => {
  const UId = parseInt(req.params.Uid);

  const sqlDelete = "DELETE FROM user WHERE iduser = ?";

  db.query(sqlDelete, UId, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// user authentication for login
app.post("/login", (req, res) => {
  const userNameReg = req.body.userNameReg;
  const userPasswordReg = req.body.userPasswordReg;

  db.query(
    "SELECT * FROM user WHERE email = ? AND password = ?",
    [userNameReg, userPasswordReg],
    (err, result) => {
      if (err) {
        res.send({ error: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "wrong username and passowrd" });
      }
    }
  );
});

//upload images
app.post("/picture", async (req, res) => {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "no file",
      });
    } else {
      const { picture } = req.files;

      picture.mv("../market/public/uploads/" + picture.name);
      res.send({
        status: true,
        message: "uploaded",
      });
    }
  } catch (e) {
    res.send(500).send(e);
  }
});

// send entered product details to the database
app.post("/addProducts", (req, res) => {
  const prName = req.body.prName;
  const prPrice = req.body.prPrice;
  const prCategory = req.body.prCategory;
  const prQty = req.body.prQty;
  const prDesc = req.body.prDesc;
  const prImage = req.body.prImage;

  db.query(
    "INSERT INTO products(product_name, price, idcategory, product_qty, product_desc, prImage) VALUES (?,?,?,?,?,?)",
    [prName, prPrice, prCategory, prQty, prDesc, prImage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully added");
      }
    }
  );
});

// update products
app.put("/updateProducts", (req, res) => {
  const prid = req.body.prid;
  const prName = req.body.prName;
  const prPrice = req.body.prPrice;
  const prCategory = req.body.prCategory;
  const prQty = req.body.prQty;
  const prDesc = req.body.prDesc;
  //const prImage = req.body.prImage;

  const sqlUpdate =
    "UPDATE products SET product_name = ?, price = ?, idcategory = ?, product_qty = ?, product_desc = ? WHERE idproducts = ?";

  db.query(
    sqlUpdate,
    [prName, prPrice, prCategory, prQty, prDesc, prid],
    (err, result) => {
      if (err) {
        console.log(err);
      }
    }
  );
});

// get products
app.get("/getProducts", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete products
app.delete("/deleteProducts/:prid", (req, res) => {
  const prId = parseInt(req.params.prid);

  const sqlDelete = "DELETE FROM products WHERE idproducts = ?";

  db.query(sqlDelete, prId, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

// add to cart

app.post("/addToCart", (req, res) => {
  const prName = req.body.PrName;
  const prPrice = req.body.PrPrice;
  const prid = req.body.prId;
  const userid = req.body.userid;
  const total = req.body.total;
  const qty = req.body.PrQty;
  //const prImage = req.body.prImage;

  db.query(
    "INSERT INTO cart_items(item_name, price, qty, iduser, total, idproduct) VALUES (?,?,?,?,?,?)",
    [prName, prPrice, qty, userid, total, prid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully added");
      }
    }
  );
});

// getCart items
app.get("/getCart/:id", (req, res) => {
  const Id = parseInt(req.params.id);

  db.query(`SELECT * FROM cart_items WHERE iduser = ${Id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete cart item
app.delete("/deleteCartItem/:ctid", (req, res) => {
  const ctId = parseInt(req.params.ctid);

  const sqlDelete = "DELETE FROM cart_items WHERE idcart_items = ?";

  db.query(sqlDelete, ctId, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// add bills
app.post("/addBill", (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const district = req.body.district;
  const contact = req.body.contact;
  const date = req.body.date;
  const paymode = req.body.paymode;
  const total = req.body.total;
  const userid = req.body.userid;
  const status = req.body.status;

  db.query(
    "INSERT INTO billing_details(name, adrs, district, contactNumber, iduser, date, total, paymode, status) VALUES (?,?,?,?,?,?,?,?,?)",
    [name, address, district, contact, userid, date, total, paymode, status],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully added");
      }
    }
  );
});

// get bill id
app.get("/getbillno/:id", (req, res) => {
  const Id = parseInt(req.params.id);

  db.query(
    `SELECT * FROM billing_details WHERE iduser = ${Id}`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// send order details
app.post("/sendOrderDetails", (req, res) => {
  const product_name = req.body.PrName;
  const product_price = req.body.PrPrice;
  const product_qty = req.body.PrQty;
  const product_total = req.body.prTotal;
  const bill_id = req.body.billid;
  const date = req.body.date;
  const paymode = req.body.paymode;
  const total = req.body.total;
  const userid = req.body.userid;

  db.query(
    "INSERT INTO orders(date, bill_id, iduser, bill_amount, paymode, pr_name, pr_price, pr_qty, pr_total) VALUES (?,?,?,?,?,?,?,?,?)",
    [
      date,
      bill_id,
      userid,
      total,
      paymode,
      product_name,
      product_price,
      product_qty,
      product_total,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully added");
      }
    }
  );
});

// delete cart
app.delete("/deleteCart/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const sqlDelete = "DELETE FROM cart_items WHERE iduser = ?";

  db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

app.post("/addCard", (req, res) => {
  const name = req.body.cardname;
  const number = req.body.cardNum;
  const exp = req.body.exp;
  const cvv = req.body.cvv;
  const userid = req.body.userid;

  db.query(
    "INSERT INTO payment_details(card_number, year, cvv, holder_name, iduser) VALUES (?,?,?,?,?)",
    [number, exp, cvv, name, userid],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("successfully added");
      }
    }
  );
});

//get order details
app.get("/getorders/:id", (req, res) => {
  const Id = parseInt(req.params.id);

  db.query(`SELECT * FROM orders WHERE iduser = ${Id}`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// get bill details
app.get("/getbilling", (req, res) => {
  db.query("SELECT * FROM billing_details", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// update status
app.put("/updateStatus", (req, res) => {
  const id = req.body.billId;
  const status = req.body.status;

  const sqlUpdate = "UPDATE billing_details SET status = ? WHERE billNo = ?";

  db.query(sqlUpdate, [status, id], (err, result) => {
    if (err) {
      console.log(err);
    }
  });
});

//get order details
app.get("/getbilledItems", (req, res) => {
  db.query("SELECT * FROM orders", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("server is running");
});
