const fs = require('fs');
const {client,deleteData} = require('../Data/mongdb');

function handleDelete(req,res){
    let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', async () => {
            const receivedData = JSON.parse(body);
            console.log(receivedData);

            try{
                await deleteData(client, receivedData.Email);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({error: 'Success'}));
            }catch(err){
                console.log("Error :", err);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({error: 'Internal Server Error'}));
            }
        });
    }

module.exports = handleDelete;