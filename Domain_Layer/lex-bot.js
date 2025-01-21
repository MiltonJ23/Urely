// server.js (Express.js backend for interacting with Amazon Lex)

const express = require('express');
const bodyParser = require('body-parser');
const { LexRuntimeV2Client, RecognizeTextCommand } = require('@aws-sdk/client-lex-runtime-v2');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = 3001;


// Middleware
app.use(cors());
app.use(bodyParser.json());

// AWS Lex Client Configuration
const lexClient = new LexRuntimeV2Client({
    region: 'us-east-1', // Change to your Lex bot's region
});

// Route to handle text input from the frontend
app.post('/talk-to-bot', async (req, res) => {
    try {
        const { userInput } = req.body;
        
        if (!userInput) {
            return res.status(400).json({ error: 'User input is required' });
        }

        const params = {
            botId: process.env.BOT_ID, 
            botAliasId: process.env.ALIAS_ID, 
            localeId: 'en_US', 
            sessionId: 'user-session-1',
            text: userInput,
        };

        const command = new RecognizeTextCommand(params);
        const response = await lexClient.send(command);

        console.log('Bot response:', response);
        return res.json({
            message: response.messages[0]?.content || 'No response from the bot',
        });
    } catch (error) {
        console.error('Error communicating with the bot:', error);
        return res.status(500).json({
            error: 'Error communicating with the bot. Please try again later.',
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
