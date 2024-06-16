const fs = require('fs');
const {client,addData} = require('../Data/mongdb');

function handleSignup(req,res){
    let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', async () => {
            const receivedData = JSON.parse(body);
            console.log(receivedData);

            try{
                await addData(client,
                    { _id: receivedData.Email, Email: receivedData.Email, Name: receivedData.Name, Pass: receivedData.Pass });
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({error: 'Success'}));
            }catch(err){
                if(err.code===11000){
                    console.log("Email already exists");
                    res.writeHead(409, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({error: 'Conflict'}));
                }
                else console.log("Error :" , err);
            }
        });
    }

module.exports = handleSignup;