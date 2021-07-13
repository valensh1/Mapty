'use strict';

//------------------------------------------------------DOM & GLOBAL VARIABLES------------------------------------------------------------------------
const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
const deleteWorkout = document.querySelector('.delete-workout');

class Workout {
    date = new Date(); // Date variable for our workout which will log the current date upon entering our workout
    id = (Date.now() + '').slice(-10); // Creation of an id for our workout which basically creates a new date and then when adding the date to a string like new Date() + ''

    constructor (coords, distance, duration) {  // Constructor function that takes all common arguments shared between both cycling and running which are coords, distance & duration
        this.coords = coords; // Need an array consisting of [lat, lng]
        this.distance = distance;
        this.duration = duration;
        }

        _setDescription() {
            const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

           this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
        }
    }


class Running extends Workout {
    type = 'running';   // Same as saying this.type = 'running' just more modern way of doing it

    constructor(coords, distance, duration, cadence ) {
        super(coords, distance, duration)
        this.cadence = cadence;
        this.calcPace();
        this._setDescription();
    }

    calcPace() {
       this.pace = this.duration / this.distance; 
       return this.pace
    }
}

class Cycling extends Workout {
    type = 'cycling'; // Same as saying this.type = 'cycling' just more modern way of doing it

    constructor(coords, distance, duration, elevationGain) {
        super(coords, distance, duration)
        this.elevationGain = elevationGain;
        this.calcSpeed();
        this._setDescription();

    }

    calcSpeed() {
        this.speed = this.distance / (this.duration / 60);
        return this.speed;
    }
}

class App {
    #map;   // Creation of private variable
    #mapEvent;  // Creation of private variable
    #workouts = []; // Creation of empty array to add workouts entered from form into
    #mapZoomLevel = 13;

    constructor() {     // Constructor function is invoked immediately upon creation of instance of class which in this application it will create the instance of our class upon page load.
        this._getPosition();    // Since constructor function is immediately invoked upon creation of instance of class (which is created immediately upon page load) we can put this code in here to invoke the _getPosition() method so that it runs right away upon page load. 
    
        this._getLocalStorage(); // Invokes function upon page load to retrieve any past workout data from the localStorage API

// EVENT LISTENER - Display Marker
        form.addEventListener('submit', (event) => { // Event listener for when user hits enter button when filling out a form which will submit the form
            this._newWorkout(event); // Invoking the newWorkout method which essentially puts the marker on the map to identify workout location
        });

// EVENT LISTENER - Changing of Input Field On Our Form
        inputType.addEventListener('change', (event) => { // Anytime there is a change to the Type in our form with selections Cycling and Running then the fourth input box will change from either Elev Gain with meters as the placeholder or it will change to Cadence with step/min as the placeholder when the Type is changed to Running 
            this._toggleElevationForm(); // Invoke the toggleElevationForm method that esentially changes the last input on the form to reflect either Cadence for running or Elev Gain for cycling  
        });
        
        containerWorkouts.addEventListener('click', this._moveToPopup.bind(this)); // Since doing a regular function call the this keyword resorts to the containerWorkouts element and we want the THIS KEYWORD to be on the class object that's why we have to bind the event listner to the this keyword. If you use callback function like below you don't need to bind as arrow functions automatically bind the THIS keyword.
        // containerWorkouts.addEventListener('click', () => this._moveToPopup(event)); // You could also use the callback function like this for event listener which automatically binds the THIS KEYWORD unlike the regular function call above where you do need to bind the THIS KEYWORD
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
    this.#map = L.map('map').setView(coords,this.#mapZoomLevel); // Pass in coords variable created in line of code above which is the array that contains are current location latitude and longitude; The 13 is the view number. The lower the number the more zoomed out and the higher the number the more zoomed in the map is
    
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.#map);
    
    // Handles Clicks on Map
    this.#map.on('click', (event) => { // map.on function just like event listener in Javascript.
            this._showForm(event); // Invoke _showForm function which essentially shows the form for user to fill in workout data when user clicks somewhere on map
        });

    this.#workouts.forEach(work => {
        this._renderWorkoutMarker(work); // Have to call this method here AFTER MAP LOADS because it will not put markers on map if the map hasn't loaded yet.
    });

    }

    // CLASS METHOD - Shows form for user to fill in their workout data. This method is invoked when user clicks somewhere on map
    _showForm(mapE) { // mapE is the event passed into function from the #map.on event handler above.
        this.#mapEvent = mapE; // Upon clicking anywhere on map mapE will be an object generated by the map.on function that we will then set to the global variable called mapEvent so that the display marker event listener can gain access to this object that was generated from clicking on the map.
        form.classList.remove('hidden');
        inputDistance.focus(); // Puts focus (blinking cursor) on the Distance input field
    }

    _hideForm() {
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = '';  // Clears input fields upon submission of form
        form.style.display = 'none';
        form.classList.add('hidden');
        setTimeout(() => form.style.display = 'grid', 1000);
    }

    // CLASS METHOD - This method is invoked when user changes dropdown menu on form to select either running or cycling and changes the last input on the form to reflect the relevant input information
    _toggleElevationForm() {
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden'); // Toggles the fourth input to show Elev Gain with meters as placeholder. When Cycling is selected as the Type this will show and when Running is selected as Type this will be hidden and the Cadence with step/min as placeholder will show.
        inputCadence.closest('.form__row').classList.toggle('form__row--hidden'); // Toggles the fourth input to show Cadence with step/min as placeholder. When Running is selected as the Type this will show and when Cycling is selected as Type this will be hidden and the Elev Gain with meters as placeholder will show.
    }

    // CLASS METHOD - This method is invoked when user submits form and this logs the workout data to map and clears the form for next workout input
    _newWorkout(event) {
        event.preventDefault(); // Prevents page reloading when hitting enter button

        // Helper Functions
        const validInputs = (...inputs) => inputs.every(el => Number.isFinite(el)); // Creation of validInputs function which validates whether the inputs are a number. The function accepts any number of arguments represented by the rest pattern with the 3 periods (...inputs) and rest pattern also converts these unlimited amount of arguments into an array. Now that the arguments fed into the function are all in an array we can use the every method to loop through each argument in the array to see if each argument is a valid number. The way we see if each argument is a valid number is using the Number.isFinite method. If all the numbers are valid it will return true. If any number is not a valid number it will return false.
        const allPositive = (...nums) => nums.every(el => el > 0); // Creation of allPositive function that takes any number of arguments and turns them into an array by using the rest parameters (...nums). Then we loop through the array and for every number we check to see if the number is greater than 0. If every number is greater than 0 it the function will return true and if not it will return false.

        // Get Data From Form
        const type = inputType.value;
        const distance = +inputDistance.value;
        const duration = +inputDuration.value;
        console.log(this.#mapEvent);
        const { lat, lng } = this.#mapEvent.latlng; // Destructuring of lat and lng from the #mapEvent.latlng object
        let workout; // Creation of global variable within _newWorkout method so that we can get access to it anywhere within this method

        // Check if Data is Valid
        // If Workout is Running, Create a Running Object
        if(type === 'running') {
            const cadence = +inputCadence.value;
            if(
            // !Number.isFinite(distance) ||
            // !Number.isFinite(duration) ||
            // !Number.isFinite(cadence)
            !validInputs(distance, duration, cadence) ||    // Invokes the validInputs function above. Note that if there is an invalid number the validInputs function will return a false value and we invert that false value to true with the exclamation mark in front (!validInputs) so that we can get a true value to then send the alert that the 'Inputs have to be positive numbers!'. Notice we created the function to eliminate repeatable code using the DRY principle because we could use the same code below (commented out) but put in function to prevent from repeating resusable code.
            !allPositive(distance,duration,cadence)         // Invokes the allPositive function above. Note that if there is an invalid number the allPositive function will return a false value and we invert that false value to true with the exclamation mark in front (!allPositve) so that we can get a true value to then send the alert that the 'Inputs have to be positive numbers!'. Notice we created the function to eliminate repeatable code using the DRY principle because we could use the same code below with cycling to check to see if everything was positive but that would be repeatable code so we created a function
            )  
            return alert ('Inputs have to be positive numbers!');

            workout = new Running([lat, lng], distance, duration, cadence);
        }

        // If Workout is Cycling, Create a Cycling Object
        if(type === 'cycling') {
            const elevation = +inputElevation.value;
            if(
            // !Number.isFinite(distance) ||
            // !Number.isFinite(duration) ||
            // !Number.isFinite(elevation)
            !validInputs(distance, duration, elevation) ||   // Invokes the validInputs function above. Note that if there is an invalid number the validInputs function will return a false method and we invert that false value to true with the exclamation mark in front (!validInputs) so that we can get a true value to then send the alert that the 'Inputs have to be positive numbers!'. Notice we created the function to eliminate repeatable code using the DRY principle because we could use the same code above (commented out) but put in function to prevent from repeating resusable code.
            !allPositive(distance,duration)         // Invokes the allPositive function above. Note that if there is an invalid number the allPositive function will return a false value and we invert that false value to true with the exclamation mark in front (!allPositve) so that we can get a true value to then send the alert that the 'Inputs have to be positive numbers!'. Notice we created the function to eliminate repeatable code using the DRY principle because we could use the same code below with cycling to check to see if everything was positive but that would be repeatable code so we created a function. Notice we didn't put elevation as one of the parameters to be checked if negative number and that is because elevation can be a negative number such as when you are going downhill.
            )  
            return alert ('Inputs have to be positive numbers!');

            workout = new Cycling([lat, lng], distance, duration, elevation);
        }

        // Add New Object To Workout Array
        this.#workouts.push(workout);
        console.log(workout);


        // Render Workout on Map as Marked
       this._renderWorkoutMarker(workout);

        // Render Workout on List
        this._renderWorkout(workout);

        // Hide Form + Clear Input Fields
        this._hideForm();

        // Set Local Storage To All Workouts
        this._setLocalStorage();

    }

    _renderWorkoutMarker(workout) {
        L.marker(workout.coords)  // Add destructured lat and lng variables from mapEvent.latlng object key above.
        .addTo(this.#map) 
        .bindPopup(L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: `${workout.type}-popup`
        }))
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`) // Method displays the content you see in the title for each marker that pops up on map
        .openPopup();
    }

    _renderWorkout(workout) {
        let html = `
            <li class="workout workout--${workout.type}" data-id="${workout.id}">
                <h2 class="workout__title">${workout.description}</h2>
                <div class="workout__details">
                    <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
                    <span class="workout__value">${workout.distance}</span>
                    <span class="workout__unit">km</span>
                </div>
                <div class="workout__details">
                    <span class="workout__icon">⏱</span>
                    <span class="workout__value">${workout.duration}</span>
                    <span class="workout__unit">min</span>
                </div>
                `;

            if(workout.type === 'running') {
                html += `
                <div class="workout__details">
                    <span class="workout__icon">⚡️</span>
                    <span class="workout__value">${workout.pace.toFixed(1)}</span>
                    <span class="workout__unit">min/km</span>
              </div>
              <div class="workout__details">
                    <span class="workout__icon">🦶🏼</span>
                    <span class="workout__value">${workout.cadence}</span>
                    <span class="workout__unit">spm</span>
              </div>
            </li>
            `;
        }
            if(workout.type === 'cycling') {
                html += `
            <div class="workout__details">
                <span class="workout__icon">⚡️</span>
                <span class="workout__value">${workout.speed.toFixed(1)}</span>
                <span class="workout__unit">km/h</span>
            </div>
            <div class="workout__details">
                <span class="workout__icon">⛰</span>
                <span class="workout__value">${workout.elevationGain}</span>
                <span class="workout__unit">m</span>
            </div>
            `;
        }
        form.insertAdjacentHTML('afterend', html);
    }

        _moveToPopup(event) {
            const workoutEl = event.target.closest('.workout'); // Gets DOM location of closest parent with the class of '.workout'
            console.log(workoutEl);

            if(!workoutEl) return;

            const workout = this.#workouts.find(work => work.id === workoutEl.dataset.id);
            console.log(workout);

            this.#map.setView(workout.coords, this.#mapZoomLevel, { // Leaflet function that scrolls view to place on map that matches coords provided 
                animate: true,
                pan: {
                    duration: 1
                }
            });
        }

        _setLocalStorage() {
           localStorage.setItem('workouts', JSON.stringify(this.#workouts)); // Adds each workout class object to the local storage. The localStorage.setItem takes two arguments both strings. The first argument is the key name of the object to create in local storage (in our case its 'workout') and the second argument is a value for the key. BOTH ARGUMENTS NEED TO BE STRINGS. So, since the 2nd argument is an object that we need to create as a string we use the JSON.stringify method which turns any object into a string.
        }

        _getLocalStorage() {
           const data = JSON.parse(localStorage.getItem('workouts')); // Creation of a variable called data that converts all our local storage data from a string (local storage requires data as a string to store it) to an array of objects. We convert a string to an array of objects by using JSON.parse() method and then we pass in localStorage.getItem('workouts') which 'workouts' is the key of the object that we want to retrive.
           console.log(data);

           if (!data) return; // Guard clause if no data then just return

           this.#workouts = data; // IF data then set #workouts array variable to the data retrieved from local storage

           this.#workouts.forEach(work => {
               this._renderWorkout(work); // Loop through local storage and invoke _renderWorkout method which renders each workout on screen
            })
        }

        reset() { // Type in app.reset() in console to reset local storage
            localStorage.removeItem('workouts'); // Removes item from local storage. Argument accepted is a string which requires the key on the object you want to delete
            location.reload(); // Method which reloads page. location must be used and use just as is location.reload() to reload page. To reset local storage just type in console app.reset() and it will delete items in local storage
        }
}

const app = new App(); // Creates an instance of the class App called app upon page load. 
deleteWorkout.addEventListener('click', app.reset.bind(this));



