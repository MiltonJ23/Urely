import React, { useState, useCallback } from "react";

// Import AWS SDK (configured for browser)
import AWS from "aws-sdk";

const VoiceInteraction = () => {
    const [userInput, setUserInput] = useState("");
    const [botResponse, setBotResponse] = useState("");
    const [isListening, setIsListening] = useState(false);

    // Configure AWS SDK
    AWS.config.update({
        region: "us-east-1", // Replace with your Lex bot's region
        credentials: new AWS.Credentials(process.AWS_ACCESS_KEY, process.AWS_SECRET_EKY),
    });

    const lexClient = new AWS.LexRuntimeV2();

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    // Function to start speech recognition
    const startListening = useCallback(() => {
        if (isListening) return;
        setIsListening(true);
        recognition.start();
    }, [isListening]);

    // Function to handle speech results
    recognition.onresult = async (event) => {
        const userText = event.results[0][0].transcript;
        setUserInput(userText);

        // Send the user's speech to Lex
        const botReply = await talkToBot(userText);
        setBotResponse(botReply);

        // Convert the bot response to speech
        synthesizeSpeech(botReply);
    };

    // Handle errors in speech recognition
    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
    };

    // Function to communicate with Lex
    const talkToBot = async (userText) => {
        const params = {
            botId: "ED3JHMQRPF",
            botAliasId: "K8T1XJHEMQ",
            localeId: "en_US",
            sessionId: "user-session-1",
            text: userText,
        };

        return new Promise((resolve, reject) => {
            lexClient.recognizeText(params, (err, data) => {
                if (err) {
                    console.error("Error communicating with Lex:", err);
                    reject("Error communicating with the bot.");
                } else {
                    resolve(data.messages[0]?.content || "I didn't get that. Can you say it again?");
                }
            });
        });
    };

    // Convert Lex response to speech
    const synthesizeSpeech = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Amazon Lex Voice Interaction</h1>
            <button
                onClick={startListening}
                style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    cursor: "pointer",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    transition: "background-color 0.3s ease",
                }}
            >
                🎤 Start Listening
            </button>

            <div id="output" style={{ marginTop: "20px", fontSize: "18px" }}>
                <p>You said: {userInput}</p>
                <p>Bot says: {botResponse}</p>
            </div>
        </div>
    );
};

export default VoiceInteraction;
