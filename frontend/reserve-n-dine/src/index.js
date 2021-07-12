import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App/>, document.getElementById('root'));

// // Map knowledge base endpoint values from .env file into the required format for `QnAMaker`.
// const configuration = {
//     knowledgeBaseId: process.env.QnAKnowledgebaseId,
//     endpointKey: process.env.QnAAuthKey,
//     host: process.env.QnAEndpointHostName
//  };

//  // Create the main dialog.
// const myBot = new EchoBot(configuration, {});

// const { QnAMaker } = require('botbuilder-ai');