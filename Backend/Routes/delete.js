const fs = require('fs');

function handleDelete(req,res){
    let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            const receivedData = JSON.parse(body);
            console.log(receivedData);

            fs.readFile('./Data/data.json', 'utf8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    console.error('Error reading file:', err);
                    res.writeHead(500, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({error: 'Internal Server Error'}));
                    return;
                }

                let jsonData = [];
                if (data) {
                    try {
                        jsonData = JSON.parse(data);
                        if (!Array.isArray(jsonData)) {
                            jsonData = [];
                        }
                    } catch (parseErr) {
                        console.error('Error parsing JSON:', parseErr);
                        res.writeHead(500, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({error: 'Internal Server Error'}));
                        return;
                    }
                }

                const found = jsonData.filter((item) =>{
                    return item.Email!==receivedData.Email;
                })
                
                if(found===jsonData){
                    console.log("Email does not exists", found);
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({error: 'Conflict'}));
                } else{
                    fs.writeFile('./Data/data.json', JSON.stringify(found, null, 2), 'utf8', writeErr => {
                        if (writeErr) {
                            console.error('Error writing file:', writeErr);
                            res.writeHead(500, { 'Content-Type': 'application/json' });
                            res.end(JSON.stringify({error: 'Internal Server Error'}));
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(JSON.stringify({error: 'Success'}));
                    });
                }
            });
        });
    }

module.exports = handleDelete;