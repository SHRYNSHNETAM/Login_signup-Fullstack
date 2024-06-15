const fs = require('fs');

function handleLogin(req,res){
    let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            const receivedData = JSON.parse(body);
            console.log(receivedData);

            // Read the existing data from data.json
            fs.readFile('./Data/data.json', 'utf8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    // If error is not file not found error, handle it
                    console.error('Error reading file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
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
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end(JSON.stringify({error: 'Internal Server Error'}));
                        return;
                    }
                }

                const found = jsonData.find((item) =>{
                    return item.Email===receivedData.Email;
                })
                
                if(found && found.Pass===receivedData.Pass){
                    console.log("Success", found);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify(found));
                } else if(found){
                    console.log("Wrong Password");
                    res.writeHead(200, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify({ error: 'Wrong Password' }));
                }
                else{
                    console.log("User Not Found");
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.end(JSON.stringify({error: 'User_not_found'}));
                }
            });
        });
    }

module.exports = handleLogin;