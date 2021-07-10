'use strict';

//------------------------------------------------------DOM & GLOBAL VARIABLES------------------------------------------------------------------------
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

class Workout {
    date = new Date(); // Date variable for our workout which will log the current date upon entering our workout
    id = (new Date() + '').slice(-10); // Creation of an id for our workout which basically creates a new date and then when adding the date to a string like new Date() + ''

    constructor (coords, distance, duration) {  // Constructor function that takes all common arguments shared between both cycling and running which are coords, distance & duration
        this.coords = coords;
        this.distance = distance;
        this.duration = duration;
    }
}

class Running extends Workout {
    constructor(coords, distance, duration, cadence ) {
        super(coords, distance, cadence)
        this.cadence = cadence;
    }
}

class Cycling extends Workout {
    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration)
        this.elevationGain = elevationGain;
    }
}

class App {
    #map;   // Creation of private variable
    #mapEvent;  // Creation of private variable
    constructor() {     // Constructor function is invoked immediately upon creation of instance of class which in this application it will create the instance of our class upon page load.
        this._getPosition();    // Since constructor function is immediately invoked upon creation of instance of class (which is created immediately upon page load) we can put this code in here to invoke the _getPosition() method so that it runs right away upon page load. 
    
// EVENT LISTENER - Display Marker
form.addEventListener('submit', (event) => { // Event listener for when user hits enter button when filling out a form which will submit the form
    this._newWorkout(event); // Invoking the newWorkout method which essentially puts the marker on the map to identify workout location
})

// EVENT LISTENER - Changing of Input Field On Our Form
inputType.addEventListener('change', (event) => { // Anytime there is a change to the Type in our form with selections Cycling and Running then the fourth input box will change from either Elev Gain with meters as the placeholder or it will change to Cadence with step/min as the placeholder when the Type is changed to Running 
    this._toggleElevationForm(); // Invoke the toggleElevationForm method that esentially changes the last input on the form to reflect either Cadence for running or Elev Gain for cycling  
})   
    }

    // CLASS METHOD
    _getPosition() {  // GEOLOCATION API - API that gets users approximate location immediately upon loading the page for our application; API takes 2 callback functions 
        navigator.geolocation.getCurrentPosition(  // This method takes 2 callback functions. The first for IF the geolocation is successful and the 2nd callback is if geolocation IS NOT successful.
        this._loadMap.bind(this), () => {  // Because we are calling this loadMap function as a regular function call and not as a callback function (callback like () => ) which we are supposed to do with this getCurrentPosition() method the THIS KEYWORD will be undefined UNLESS we bind it with the THIS KEYWORD here. 
        console.log(`We were not able to determine your exact location`); //2nd Callback function if NOT successful then run this code
            }
        )
    }

    // CLASS METHOD
    _loadMap(location) {   // 1st Callback function IF SUCCESSFUL then run this code; in first callback function you receive an object which is what we decided to call location here 
        console.log(location); // Prints GeolocationPosition {coords: GeolocationCoordinates, timestamp: 1625786061859} which is the location object
        const {latitude} = location.coords; // Destructuring of latitude key from object
        const {longitude} = location.coords; // Destructuring of longitude key from object
        console.log(`https://www.google.com/maps/@${latitude},${longitude},14z`); // Prints this link in console and then right click it to "open in new tab" and this will take you directly to Google Maps
    
    const coords = [latitude, longitude]; // Creation of array which includes the latitude and longitude variables that were destuctured above.
    
    // LEAFLET CODE - https://leafletjs.com/reference-1.7.1.html - Code to put markers and display map
    this.#map = L.map('map').setView(coords, 13); // Pass in coords variable created in line of code above which is the array that contains are current location latitude and longitude; The 13 is the view number. The lower the number the more zoomed out and the higher the number the more zoomed in the map is
    
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    
    // Handles Clicks on Map
    this.#map.on('click', (event) => { // map.on function just like event listener in Javascript.
            this._showForm(event); // Invoke _showForm function which essentially shows the form for user to fill in workout data when user clicks somewhere on map
        })
    }

    // CLASS METHOD - Shows form for user to fill in their workout data. This method is invoked when user clicks somewhere on map
    _showForm(mapE) {
        this.#mapEvent = mapE; // Upon clicking anywhere on map mapE will be an object generated by the map.on function that we will then set to the global variable called mapEvent so that the display marker event listener can gain access to this object that was generated from clicking on the map.
        form.classList.remove('hidden');
        inputDistance.focus(); // Puts focus (blinking cursor) on the Distance input field
    }

    // CLASS METHOD - This method is invoked when user changes dropdown menu on form to select either running or cycling and changes the last input on the form to reflect the relevant input information
    _toggleElevationForm() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // Toggles the fourth input to show Elev Gain with meters as placeholder. When Cycling is selected as the Type this will show and when Running is selected as Type this will be hidden and the Cadence with step/min as placeholder will show.
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); // Toggles the fourth input to show Cadence with step/min as placeholder. When Running is selected as the Type this will show and when Cycling is selected as Type this will be hidden and the Elev Gain with meters as placeholder will show.
    }

    // CLASS METHOD - This method is invoked when user submits form and this logs the workout data to map and clears the form for next workout input
    _newWorkout(event) {
        event.preventDefault(); // Prevents page reloading when hitting enter button

        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';  // Clears input fields upon submission of form
    
        console.log(this.#mapEvent);
        const { lat, lng } = this.#mapEvent.latlng; // Destructuring of lat and lng from the #mapEvent.latlng object
    
        // This is the code for the marker that shows up on map
        L.marker([lat, lng])  // Add destructured lat and lng variables from mapEvent.latlng object key above.
        .addTo(this.#map) 
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: 'running-popup'
        }))
        .setPopupContent('Workout')
        .openPopup();
    }
}

const app = new App(); // Creates an instance of the class App called app upon page load. 




