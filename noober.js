window.addEventListener('DOMContentLoaded', async function() {
  let response = await fetch('https://kiei451.com/api/rides.json')
  let json = await response.json()

  // writes the returned JSON to the console
  console.dir(json)
  
  // 🔥 start here: write the recipe (algorithm), then write the code
  
  // Loop through the array
  for (let i=0; i<json.length; i++){

    // Create variables to store each ride request in memory

    // Set Passenger name to First Name and Last Name, separated with a space
    let passengerName = `${json[i].passengerDetails.first} ${json[i].passengerDetails.last}`
    // Set Passenger Phone Number to the phone number and store as a string
    let passengerPhoneNumber = `${json[i].passengerDetails.phoneNumber}`
    // Set Pickup Location to the Address, City, State and Zip
    let pickupAddress = `${json[i].pickupLocation.address}`
    // Set Pickup Location to the Address, City, State and Zip
    let pickupCity = `${json[i].pickupLocation.city}, ${json[i].pickupLocation.state} ${json[i].pickupLocation.zip}`
    // Set Dropoff Location to the Address, City, State and Zip
    let dropoffAddress = `${json[i].dropoffLocation.address}`
    // Set Dropoff Location to the Address, City, State and Zip
    let dropoffCity = `${json[i].dropoffLocation.city}, ${json[i].dropoffLocation.state} ${json[i].dropoffLocation.zip}`
    // Store number of passengers in memory
    let numberOfPassengers = json[i].numberOfPassengers

    // Set level of service with conditional statements
    // If Purple is requested, service is always purplee
    // Otherwise it is a Noober X, unless there are more than 3 people in car (then Noober XL)
    // Also do a fun border styling

    let serviceRequested
    let borderStyling
    if (json[i].purpleRequested==true) {
      serviceRequested=`Noober Purple`
      borderStyling=`border-purple-500`
    } else if (numberOfPassengers > 3 && json[i].purpleRequested==false){
      serviceRequested=`Noober XL`
      borderStyling=`border-black`
    } else {
      serviceRequested=`Noober X`
      borderStyling=`border-gray-500`
    }

    //Set 'passenger' or 'passengers' depending on number of pasengers
    //If only one passenger, set to 'passenger', else set to 'passengers

    let passengerDescriptor
    if (numberOfPassengers==1){
      passengerDescriptor=`passenger`
    } else {
      passengerDescriptor=`passengers`
    }

      // Create a variable for the HTML element we're going to add to
      let rideList = document.querySelector(`.rides`)

      // Insert HTML into the products element, using the data from each product
      rideList.insertAdjacentHTML(`beforeend`,`
      <h1 class="inline-block mt-8 px-4 py-2 rounded-xl text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
      <i class="fas fa-car-side"></i>
      <span>${serviceRequested}</span>
      </h1>

      <div class="border-4 ${borderStyling} p-4 my-4 text-left">
        <div class="flex">
          <div class="w-1/2">
            <h2 class="text-2xl py-1">${passengerName}</h2>
            <p class="font-bold text-gray-600">${passengerPhoneNumber}</p>
          </div>
          <div class="w-1/2 text-right">
            <span class="rounded-xl bg-gray-600 text-white p-2">
              ${numberOfPassengers} ${passengerDescriptor}
            </span>
          </div>
        </div>
        <div class="mt-4 flex">
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">PICKUP</div>
            <p>${pickupAddress}</p>
            <p>${pickupCity}</p>
          </div>
          <div class="w-1/2">
            <div class="text-sm font-bold text-gray-600">DROPOFF</div>
            <p>${dropoffAddress}</p>
            <p>${dropoffCity}</p>
          </div>
        </div>
      </div>
      `)
}
})