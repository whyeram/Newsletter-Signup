const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");
const md5 = require("md5");
const https = require("https");

const app = express();
app.use(express.static("public"));  /* important */
app.use(express.urlencoded({ extended: true }));
const listId = "464bcfc2d1";


mailchimp.setConfig({
    apiKey: "b439e5f11279c7734a9fa6ca3c961975-us21",
    server: "us21",
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})








app.post("/", function (req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    console.log(firstName);
    console.log(lastName);
    console.log(email);
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed", 
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us21.api.mailchimp.com/3.0/lists/464bcfc2d1";
    const options={
        method: "POST",
        auth: "eram14:b439e5f11279c7734a9fa6ca3c961975-us21"
    }
    const request = https.request(url, options, function(response){
        // console.log(response.statusCode);
        // response.on("data", function(data){
        //     // console.log(JSON.parse(data));
        // })
        if(response.statusCode === 200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }
    })
    request.write(jsonData);
    request.end();

})

app.listen(3000, function () {
    console.log("Server is running on port 3000");
})


// api key
// b439e5f11279c7734a9fa6ca3c961975-us21


// list id 
// 464bcfc2d1