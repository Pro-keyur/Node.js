const express = require("express");
const fs = require("fs");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());

let lastId = 0;

//######  GET DATA
app.get("/product", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});

//######  POST-METHOD FOR ADD DATA
app.post("/addproduct", (req, res) => {
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const newdata = JSON.parse(data);
            newdata.push({
                ...req.body,
                id: ++lastId 
            });
            fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send("Product added successfully");
                }
            });
        }
    });
});

//####### PATCH METHOD - EDITING PERTICULAR VALUE
app.patch("/editproduct/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el) => el.id == id);
            if (index !== -1) {
                productdata[index] = { ...productdata[index], ...req.body };
                fs.writeFile("./db.json", JSON.stringify(productdata), (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Data edited successfully");
                    }
                });
            } else {
                res.send("Data not found");
            }
        }
    });
});

//####### DELETE METHOD 
app.delete("/deleteproduct/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            let productdata = JSON.parse(data);
            const newdata = productdata.filter((el) => el.id != id);
            if (productdata.length !== newdata.length) {
                fs.writeFile("./db.json", JSON.stringify(newdata), (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Product deleted successfully");
                    }
                });
            } else {
                res.send("Product not found");
            }
        }
    });
});



//##### PUT METHOD FOR EDITING WHOLE OBJECT
app.put("/update/:id", (req, res) => {
    const { id } = req.params;
    fs.readFile("./db.json", "utf-8", (err, data) => {
        if (err) {
            res.send(err);
        } else {
            const productdata = JSON.parse(data);
            const index = productdata.findIndex((el) => el.id == id);
            if (index !== -1) {
                productdata[index] = { ...id, ...req.body };
                fs.writeFile("./db.json", JSON.stringify(productdata), (err) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send("Data edited successfully");
                    }
                });
            } else {
                res.send("Data not found");
            }
        }
    });
});

//###### SERVER PORT
app.listen(8080, () => {
    console.log("Server is running on port 8080");
});
