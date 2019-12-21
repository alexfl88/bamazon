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
    console.log("Connecting to site....\n");

    start();
});

function(start){
    console.log("       ===== Welcome to BAMAZON =====");
    console.log("Fully stocked with premium products on par with Amazon! \n ")
}

inquirer
.prompt([
    {
        name: "intro",
        type: "list",
        message: "What would you like to do?",
        choices: ["Browse catalog", "Purchase Item"]
    }
])
.then(function(answer){
    if(answer.intro === "Browse Catalog"){
        connection.query("SELECT * from products", function(err, res){
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
                message: "Please enter the item ID you would like to purchase! \n"
            },
            {
                name: "quantity",
                type: "input",
                message: "Great! How many would you like? \n"
            }
        ])
        .then(function(answer){
            connection.query("SELECT * FROM products", function(err, res){
                if (err) throw err;

                console.log("\n You have chosen item ") + res[answer.productID - 1].product_name + " Quantity \n"
            
                if (res[answer.productID -1].stock_quantity < answer.quantity){
                    console.log("Sorry! We do not have that many items available, please check again soon \n")
                } else {
                    connection.query("UPDATE products SET stock_quantity = stock_quantity - ? WHERE item")
                    [answer.quantity, answer.productID],
                    function(err,res){
                        if(err) throw err;
                    }
                    console.log("Order confirmed! Thanks for shopping with BAMAZON! \n");
                    console.log("Quantity Updated");
                }
                start();
            })
        })
    }

})