// constants
const mysql = require('mysql');
const express = require('express');
const readline = require('readline');
const prompt = require('prompt');
const app = express();
const exitText = 'Process Will Now Exit, Please Type "npm start" to Start Again';

// initialize constant for connection
var connection = null;

// readline instance for taking in username and password
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// empty array for character_names later
var char_names = [];

// listen on port 3000
function listen() {
    app.listen('3000', () => {
    });
}

// creates array of names out of objects
function createArrayOfNames(input) {
    let data = [];
    for (let i = 0; i < input.length; i++) {
        let name = input[i]['character_name'];
        data.push(
            name
        )
    }
    return data;
}

// establishes connection to database and gets the character names from lotr_character, handles errors
function connect() {
    return new Promise((resolve, reject) => {
        rl.question("Enter username and password separated by 1 space: ", function (answer) {
            // split the username and password on the space
            var username = answer.split(" ")[0];
            var password = answer.split(" ")[1];

            // connection instance with given username and password
            connection = mysql.createConnection({
                host: 'localhost',
                user: username,
                password: password,
                database: 'lotrfinal'
            });

            // establish connection to database
            connection.connect((err) => {
                if (err) {
                    // i have a bunch of empty console logs so my error messages are more readable in console
                    console.log('');
                    console.log('Error in Connection, Please View Error Below');
                    console.log('');
                    console.log('Error Code: ' + err.code);
                    console.log('SQL Message: ' + err.sqlMessage);
                    console.log('');
                    console.log(exitText);
                    process.exit();
                }
                if (!err) {
                    console.log('MySql Connected Successfully!');
                }
            });

            // query the database for all character names, store into char_names
            connection.query('SELECT character_name FROM lotr_character', function (error, results, fields) {
                if (error) {
                    console.log('Error in Retrieving Character Names!');
                    reject();
                }
                if (!error) {
                    char_names = createArrayOfNames(results);
                    console.log(char_names);
                    resolve();
                }
            });

            // close the readline stream
            rl.close();
        });
    });
}

// awaits promise from connect, handles errors
async function handle_connect() {
    try {
        await connect();
    } catch (error) {
        console.log('Error in Connection');
    }
}

// runs the track character query
function track_character(input) {
    console.log(input);
    connection.query('call track_character(?)', [input], function (error, results, fields) {
        if (error) {
            console.log('Error in Query!');
        }
        if (!error) {
            // results given to user 
            console.log(results[0]);
            connection.end(function (err) {
                console.log('Information Delivered! Disconnecting from Database and Exiting Program');
                process.exit();
            });
        }
    });
}

// prompts the user for the character, and then runs it to the DB
function prompt_character() {
    return new Promise((resolve, reject) => {
        prompt.start();
        prompt.get(['Name'], function (err, result) {
            let input = result.Name;
            if (char_names.includes(input)) {
                track_character(input);
                resolve();
            } else {
                console.log('');
                console.log("Given Character Not in Array!")
                reject();
                // handle_prompt();
            }
        });
    });
}

// awaits promise from prompt character, handles errors
async function handle_prompt() {
    console.log("Please Enter the Character From the Above Array That You Would Like to Track");
    console.log("Note: The Following Prompt is Case-Sensitive");
    try {
        await prompt_character();
    } catch (error) {
        console.log('Try Again!');
        console.log('');
        handle_prompt();
        // process.exit();
    }
}

// main function to run everything
async function main() {
    listen();
    console.log("Welcome to this CLI for LOTR Database!");
    await handle_connect();
    await handle_prompt();

};
// runs the main function
main();



