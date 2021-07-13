# MAPTY

## Overview
This is a simple application which allows a user to pick a location on a map where their workout occurred and log their workout information.

## Application Start-up

Clone or download this repo to your local machine, unzip and open index.html file in a browser.
Alternatively, click [Here to view the finished website on live GitHub page.]( https://valensh1.github.io/Mapty/ )
<br>

## Table Of Contents

- [How To Use](#How-To-Use)
- [Overview](#overview)
  - [The challenge](#the-challenge)
  <!-- - [Screenshot](#screenshot) -->
  - [Links](#links)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)



### How To Use

1. Find the area on map where latest workout occurred and click on map at that location
![How To Use](Images/Screenshot1.png?raw=true "find area on map where workout occurred")

2. The side bar to left will open a form which allows the user to log their workout information
      * For Type select either Running or Cycling
![How To Use](Images/Screenshot2.png?raw=true "log workout information")

3. Hit enter after logging workout information

4. Marker pin will display on map
![How To Use](Images/Screenshot3.png?raw=true "marker pin will display on map")

5. Enter multiple workout locations with multiple workout information
![How To Use](Images/Screenshot4.png?raw=true "multiple workout locations and workout information can be logged")


### The Challenge

Using the Leaflet library for interactive maps posed the biggest challenge for this project as it required reading through the library's documentation to understand some of the basics on getting the map to display and to display the workout location marker pins on the map.


### Links

- Github Repository URL: (https://github.com/valensh1/Mapty)
- Live Site URL: (https://valensh1.github.io/Mapty/)

### Built With

- HTML
- CSS
- Vanilla JavaScript
- Leaflet - open-source JavaScript library for interactive maps

### What I Learned

Learned to build a basic workout application which allows a user to indicate a workout location on a map and log their workout information using:
- Leaflet - Open-source JavaScript library for interactive maps
  - Used to insert map into application and display marker pins on map when user logs their workout information for that particular location on map
- Object-Oriented Programming (OOP) - Use of classes with constuctor functions and relevant sub-classes that extend the parent class
- insertAdjacentHTML Method
  - Easy way to insert HTML including some variables with calculations right into our application which was used to create each workout log.
- DOM Manipulation
- Event Listeners - change and click events
  - Change Event - For when user changing a workout from Running to Cycling on form the last input field displayed to user is different and needed to be toggled
  - Click Event - For when user clicked on a particular workout on form the user would be navigated to marker pin on map for where that workout occurred
- Use of form
    - Used form to gather information from user about each workout such as duration, distance, elevation, steps per minute, cadence, etc.
- Using JavaScript to change CSS styles such as toggling class names when an event occurs.
- Working Extensively with Arrays:
  - Every Method - combined with Number.isFinite method to perform validation on user workout information input into the formus to ensure user is logging logical workout data.
  - ForEach Method - Used to loop through an array containing workout information and invoking function to display each workout information in DOM
  - Push method - Inserting data at the end of an array
- Local Storage - Use of local storage to store workout information so when application is loaded the workout information entered previously is displayed and not lost.
    

### Continued Development

Looking forward to continuing to obtain valuable skills through the use of building applications and competing in challenges.

## Author

- Portfolio Website - (https://shaun-valentine-portfolio.herokuapp.com/)
- Github - (https://github.com/valensh1)
- CodeWars Profile - (https://www.codewars.com/users/valensh1)
- Frontend Mentor Profile - (https://www.frontendmentor.io/profile/valensh1)


