const express = require('express');


const Accept_Coins = {"penny":1,"nickel":5,"dime":10,"quarter":25}
const Avail_Drinks = {"coke":25,"pepsi":32,"soda":47}
var drink_Cost,Amount_paid=0;
var n_penny,n_nickel,n_dime,n_quarter;
function findDrink(drink){
    var drink = drink.toLowerCase();
    for(key in Avail_Drinks){
        if(drink.localeCompare(key)==0){
           drink_Cost = Avail_Drinks[key];
           return "Drink Available!";
        }
   }
   return drink+" Not Available!";
}
function cal_amount(){
   var final_value;
   Amount_paid = n_penny*Accept_Coins["penny"]+n_nickel*Accept_Coins["nickel"]+n_dime*Accept_Coins["dime"]+n_quarter*Accept_Coins["quarter"];
   if(Amount_paid == drink_Cost){
       console.log("Have Your drink!");
       final_value = 0;
   }
   else if(Amount_paid<drink_Cost){
   console.log("Need more");
   final_value =  Amount_paid - drink_Cost;
   }
   else{
   console.log("Extra");
   final_value = Amount_paid - drink_Cost;
   }
   return final_value;
}

exports.homePage = function(req,res){
    res.send({
        "Device":"Vendor Machine",
        "Coke":25,
        "Pepsi":32,
        "Soda":47,
        "Coins Accepted":{
          "Penny":1,
          "Nickel":5,
          "Dime":10,
          "Quarter":25
        }
    });
}

exports.getUserInput = function(req,res){
    var drink = req.params.drink;
    var status = findDrink(drink);
    n_penny = req.body.penny;
    n_nickel = req.body.nickel;
    n_dime = req.body.dime;
    n_quarter = req.body.quarter;
    var value = cal_amount();
    if(status=="Drink Available!"){
    if(value == 0){
        res.send({
            "Payment Status": "Paid Successfully",
            "Drink": drink,
            "Amount Paid": Amount_paid
        });
    }
    else if(value>0){
        res.send({
            "Payment Status":"Paid in excess and the excess is refunded!!",
            "Drink": drink,
            "Amount Paid": Amount_paid,
            "Refunded Amount":value
        });
    }
    else{
        res.send({
            "Payment Status":"Payment failed as the amount is less than the actual cost..You can cancel the order to get your refund amount!!",
            "Amount Paid":Amount_paid
        });
    }
    }
    else{
        res.send(status);
    }
}
 exports.cancelPayment = function(req,res){
     res.send({
         "Payment Status":"You cancelled the Payment!!Your amount will be refunded!",
         "Amount Paid":Amount_paid,
         "Refunded Amount":Amount_paid
     });
 }
 exports.resetAmount = function(req,res){
     n_penny=0;
     n_nickel=0;
     n_dime=0;
     n_quarter=0;
     res.send("Amount reseted successfully!!");
 }

