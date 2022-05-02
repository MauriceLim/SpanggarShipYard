// FOR THE MODALS

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("ModalLink");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}





// FOR TH DATA

let vessels = document.getElementById('#vesselsDiv');

function displayData() {
    firebase.auth().currentUser.getIdToken().then(token => console.log('got token', token))
    db.collection('vessels').get().then(response => {

        let res = response.docs;
        res.forEach(r => {
            vesselsDiv.appendChild(`<p>${r.data().name} is in ${r.data().engine}</p>`)
        })

        console.log(response.docs[1].data().name + " is in " + response.docs[1].data().location);
    })
}

displayData();








// save data to the database

function saveData() {
    let newRestaurant = {
        name: "lorem ipsum",
        location: "somewhere"
    };
    db.collection('restaurants').add(newRestaurant);
}