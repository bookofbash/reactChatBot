'use strict'
const dialogflow = require('dialogflow')
const config = require('../config/keys')
const mongoose = require('mongoose')

const googleAuth = require('google-oauth-jwt');

const structjson = require('./structjson.js')
const projectID = config.googleProjectID
const sessionID = config.dialogFlowSessionID
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}
const sessionClient = new dialogflow.SessionsClient({ projectID, credentials });
//const sessionPath = sessionClient.sessionPath(config.googleProjectID, config.dialogFlowSessionID)
const Registration = mongoose.model('registration');

module.exports = {

    getToken: async function() {
        return new Promise((resolve) => {
            googleAuth.authenticate(
                {
                    email: config.googleClientEmail,
                    key: config.googlePrivateKey,
                    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
                },
                (err, token) =>{
                    resolve(token);
                },
            );
        });
    },
    textQuery: async function(text,userID, parameters={}){
        let self = module.exports
        const sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: text,
                    languageCode: config.dialogFlowSessionLangageCode,
                },
            },
            queryParams: {
                payload: {
                    data: parameters
                }
            }
        };

        let responses = await sessionClient.detectIntent(request)
        responses = await self.handleAction(responses)
        return(responses)
    },

    handleAction: function(responses){
        return responses;
    },
    eventQuery: async function(event, userID, parameters={}){
        let self = module.exports;
        let sessionPath = sessionClient.sessionPath(projectID, sessionID + userID);

        const request = {
            session: sessionPath,
            queryInput: {
                event: {
                    name: event,
                    parameters: structjson.jsonToStructProto(parameters),
                    languageCode: config.dialogFlowSessionLangageCode,
                },
            },
        };

        let responses = await sessionClient.detectIntent(request)
        responses = await self.handleAction(responses)
        return(responses)
    },

    handleAction: function(responses){
        let self  = module.exports;
        let queryResult = responses[0].queryResult;
        switch(queryResult.action){
            case 'recommendcourses-yes':
                if (queryResult.allRequiredParamsPresent){
                    self.saveRegistration(queryResult.parameters.fields);
                }
        }
        return responses;
    },
    saveRegistration: async function(fields){
        const registration = new Registration({
            name: fields.name.stringValue,
            address: fields.address.stringValue,
            phone: fields.phone.stringValue,
            email: fields.email.stringValue,
            registeredOn: Date.now()
        });
        try{
            let reg = await registration.save();
            console.log(reg);
            console.log(reg[name.original])
            console.log(reg.email)
        } catch(err){
            console.log(err);
        }
    }
}
