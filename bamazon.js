const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazon_DB'
});

connection.connect(function(err){
    if(err) throw err;
    console.log("Connecting to the site.....\n");

    start();
});

function start(){
    console.log("   ===== Welcome to BAMAZON =====");
    console.log("Now stocked with more items than Amazon! \n ")

    inquirer
    .prompt([
        {
            name: "intro",
            type: "list",
            message: "What would you like to do?",
            choices: ["Browse Catalog", "Purchase Item"]
        }
    ])
    .then(function(answer){
        if(answer.intro === "Browse Catalog"){
            connection.query("SELECT * FROM products", function(err, res){
                if (err) throw err;
                console.table(res);
                start();
            });

        } else {

            inquirer
            .prompt([
        {
            name: "productID",
            type: "input",
            message: "Please enter the item ID that you would like to purchase! \n"
        },
        {
            name: "quantity",
            type: "input",
            message: "Thanks! How many would you like? \n"
        }
            ])
        .then(function(answer){

            connection.query("SELECT * FROM products", function(err, res){
                if (err) throw err;

                console.log("\n You have chosen item " + res[answer.productID - 1].product_name + " Quantity left");

                if (res[answer.productID - 1].stock_quantity < answer.quantity){
                    console.log("Sorry, we do not have that many available, check back again soon \n");
                } else {
                    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = "
                    [answer.quantity, answer.productID],
                    function(err, res){
                        if(err) throw err
                    })
                    console.log("Order Confirmed! We thank you shopping with BAMAZON! \n");
                    console.log("Quantity updated!");
                }
                start();
            })
        })    
        }
    })
}