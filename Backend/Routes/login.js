const fs = require('fs');
const {client,findData} = require('../Data/mongdb');

function handleLogin(req,res){
    let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', async () => {
            const receivedData = JSON.parse(body);
            console.log(receivedData);

            try{
                const result = await findData(client, receivedData.Email, receivedData.Pass);
                if (result) {
                    console.log(result);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(result));
                } else {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({error: 'User_not_found'}));
                }
            }catch(err){
                console.log("error:", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({error: 'Internal server Error'}));
            }
        });
    }

module.exports = handleLogin;