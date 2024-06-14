const fs = require('fs');

function handleSignup(req,res){
    let body = '';
        req.on('data', chunk => {
            body += chunk.toString(); // convert Buffer to string
        });

        req.on('end', () => {
            const receivedData = JSON.parse(body);
            console.log(receivedData);

            // Read the existing data from data.json
            fs.readFile('./data.json', 'utf8', (err, data) => {
                if (err && err.code !== 'ENOENT') {
                    // If error is not file not found error, handle it
                    console.error('Error reading file:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
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
                        res.end('Internal Server Error');
                        return;
                    }
                }

                const found = jsonData.find((item) =>{
                    return item.Email===receivedData.Email;
                })
                
                if(found){
                    console.log("Email already exists:", found);
                    res.writeHead(409, { 'Content-Type': 'text/plain' });
                    res.end('Conflict');
                } else{
                    jsonData.push(receivedData);

                    fs.writeFile('./data.json', JSON.stringify(jsonData, null, 2), 'utf8', writeErr => {
                        if (writeErr) {
                            console.error('Error writing file:', writeErr);
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.end('Internal Server Error');
                            return;
                        }
                        res.writeHead(200, { 'Content-Type': 'text/plain' });
                        res.end('Success');
                    });
                }
            });
        });
    }

module.exports = handleSignup;