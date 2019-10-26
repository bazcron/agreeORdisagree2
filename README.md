# agreeORdisagree
Initial upload of project

Name of webApp: Agree or Disagree

Created by: Barry Cronin

This project is a webApp which shows statements (some controversal) to users and asks them if they Agree or Disagree with the statement.

The webapp will then show them the percentage of those who Agreed or Disagreed and to see if their opinion is the normal opinion of most people or if they have a different opinion to most.


Functionality.

This part of the project is the server side of the project. The second part will incorporate the client side.

I currently have 2 models: Statements and users. 

statements holds, statement ID (Number), the actual statement (String), agree field (number) and a disagree field (number). The  agree and disagree field will keep count of the number of users who agreed or disagreed with that statement.

users holds users information including, name (String), email (String), password (String), agree (Number), disagree(Number).

From the server side you can do the following:
Get all statements
Get one statement by id
Post (add) a statement, this gives the new statement the next available id
Put update the agree field if the user agrees with the statement
Put update the disagree field if the user disagrees with the statement
Delete a statement by id

Get all users, returns all the users
Post (add) a user with a unigue id
Delete a user based on the id
