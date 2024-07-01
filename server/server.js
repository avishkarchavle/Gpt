// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const { exec } = require('child_process');

// const app = express();
// const PORT = 5000;

// app.use(cors());
// app.use(bodyParser.json());

// app.post('/api/chat', (req, res) => {
//     const userInput = req.body.input;

//     exec(`python chat.py "${userInput}"`, (error, stdout, stderr) => {
//         if (error) {
//             console.error(`exec error: ${error}`);
//             return res.status(500).send('Error executing the script');
//         }
//         res.json({ response: stdout });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/chat', (req, res) => {
    const userInput = req.body.input;

    exec(`python chat.py "${userInput}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            console.error(`stderr: ${stderr}`);
            return res.status(500).send('Error executing the script');
        }
        res.json({ response: stdout.trim() });  // Trim any extra whitespace or newline characters
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
