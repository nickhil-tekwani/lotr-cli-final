# lotrfinal
Nickhil Tekwani | Assignment 8
CS3200 - Database Design | Prof. Durant
https://docs.google.com/document/d/1GBdWOqjYbmuC8zTxtExfYM7ybLNG_lN20NH-FJ2DWm4/edit

Prior to attempting to run this program, please ensure to (npm install) first to download all necessarily dependencies (express, mysql, and prompt).
Please visit the npm website to learn more about these 3 libraries.
Please also use the SQL script found in the create_lotrfinal.sql to add the necessary database schema to your local mySql instance.

To begin the program, type (npm start) into the terminal and hit enter. 
You will be prompted to enter the username and password for your MySql localhost, separated by a singular space.

If an error is returned using your credentials, the program exits and you must (npm start) to begin again.
If this is the case, it is likely that one of the following is occuring:
-incorrect credentials, please double check your MySql credentials
-there is not exactly 1 space between the username and password
-your mysql server is not running on your local host
-the name of your database is not lotrfinal (which it should be if you use the create_lotrfinal.sql file included in this submission)

After successfully authenticating, a connection will be established between this program and your mysql localhost.

Then, you will see an array with all characters currently in the database.
You will be prompted to enter one of these characters (exactly as it is seen in the array).

The character name you enter will be crosschecked with the array.
If the character name you have entered is not in the list (note: the prompt is case sensitive), the program will not automatically exit.
Instead, it will prompt you again to enter a new name. It will keep prompting you until you enter a character name correctly.

After entering a name that exists in the array, the track_character procedure will be run on it. 
The results of this procedure will be printed to standard output, and you will see a message confirming that the information has been delivered.
The connection to the database will now be terminated, and the program will exit.




