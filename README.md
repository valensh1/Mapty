# BANKIST

## Overview
This is a fictitious banking application that allows a user to perform very simplified banking activities. Upon user login, the user can see their banking transactions, transfer money to another user, request a loan or even close their bank account. Depending on what country the user is in they will see their banking transactions in their local currency with country specific date formats.

## Application Start-up

Clone or download this repo to your local machine, unzip and open index.html file in a browser.
Alternatively, click [Here to view the finished website on live GitHub page.]( https://valensh1.github.io/Bankist/ )
<br>

## Table Of Contents

-[How To Use] (#How-To-Use)
- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)



### How To Use

* LOGGING IN: Must login to banking application by typing any of the following user names and PIN's:
  1. user: js  
    pin: 1111

  2. user: jd  
     pin: 2222

  3. user: stw  
     pin: 3333

  4. user: ss  
     pin: 4444
 
     
![Login](Images/Login_Screenshot.png?raw=true "screenshot of login")

* TRANSFER MONEY:
  1. Enter user to transfer money to
  2. Enter amount to transfer
  3. Hit enter or click on arrow button
![Login](Images/TransferMoney_Screenshot1.png?raw=true "Transfer Money Screenshot1")


* Account Transferring Money
![Login](Images/TransferMoney_Screenshot2.png?raw=true "Transfer Money Screenshot2")


* Receiver of Transfer Bank Account
![Login](Images/TransferMoney_Screenshot3.png?raw=true "Transfer Money Screenshot3")

* REQUESTING A LOAN:
  1. Enter the loan amount
  2. Hit enter or click on arrow button
  <br>

![Login](Images/Loan_Screenshot1.png?raw=true "Loan Screenshot1")
![Login](Images/Loan_Screenshot2.png?raw=true "Loan Screenshot2")


* CLOSING AN ACCOUNT:
  1. Enter username
  2. Enter pin
  3. Hit enter or click on arrow button
  4. Account will be closed and user taken back to application login screen.
  <br>
NOTE: User logged in can only close their account and CANNOT close the account of another user!!!
<br>


### The Challenge

The challenge was to build out a simplified banking application that allowed a user to login with a simple username and pin number, verify user login credentials and display only that users bank account information. Adding to the challege was displaying the users bank account information in their country's local currency along with displaying dates on the page according to their custom country date format. Another challenging aspect was being able to transfer money or get a loan and have the money transact in the correct user's account. Lastly, the use of inactivity timers posed a challenge because you have to stop and reset timers with each transaction and also stop a previous users timer and start a new one when a new user logs in. When the activitiy timer expired a lot of testing was required to ensure the user was logged out and the application was reset to the beginning.

### Screenshot

Finished Version
![screenshot of finished project](Images/Final_Application_Screenshot.png?raw=true "screenshot of finished project")


### Links

- Github Repository URL: (https://github.com/valensh1/Bankist)
- Live Site URL: (https://valensh1.github.io/Bankist/)

### Built With

- HTML
- CSS
- Vanilla Javascript

### What I Learned

Learned to build an interactive and fully functional banking application using:
- Intl Library API
  - Used to format country currency (NumberFormat() method) and country specific formatted dates (DateTimeFormat() method)
- insertAdjacentHTML Method
  - Easy way to insert HTML including some variables with calculations right into our application which was used to create each banking transaction row.
- Working with timers such as the setTimeout and setInterval methods
  - Used in application to log user activity and log a user out if they are determined to be inactive for 5 minutes.
- Working with the Math Object
  - Used Math.abs, Math.round, Math.floor and Math.trunc methods
- DOM Manipulation
- Event Listeners - click events
  - Used buttons tied to certain click events in application such as logging in, transferring money, requesting a loan
- Use of forms
    - Used forms to gather information from user throughout application for such things as username, pin, transfer amounts, loan amounts, etc.
- Switch statement
  - Used to determine if transaction dates happened within 7 days to display instead of the date but a string like 'Today' or '3 days ago' to represent when the transaction occurred
- Working Extensively with Arrays:
  - Slice Method
    - Used to create a shallow copy of an array
  - Sort Method
    - Used to sort our list of banking transactions by date
  - forEach Map and flatMap Methods
    - Used to loop through our accounts to return pertinent information for application such as current account holders banking transaction amounts, etc and flattening arrays if applicable using the flatMap method.
  - Filter and Reduce Methods
    - Used to filter arrays in our applicaton for such things as negative dollar amounts (money going out). Then chaining it with a reduce method to add up the filtered array and return a single dollar amount.
  - Find, findIndex and Some Methods
    - Used to find various elements inside accounts array to be used elsewhere in application.
  - Split and Join Methods
    - Split method used to create arrays from strings in our application to loop over and then ultimately use the join method to join arrays back into strings.




### Continued Development

Looking forward to continuing to obtain valuable skills through the use of building applications and competing in challenges.

## Author

- Portfolio Website - (https://shaun-valentine-portfolio.herokuapp.com/)
- Github - (https://github.com/valensh1)
- CodeWars Profile - (https://www.codewars.com/users/valensh1)
- Frontend Mentor Profile - (https://www.frontendmentor.io/profile/valensh1)


