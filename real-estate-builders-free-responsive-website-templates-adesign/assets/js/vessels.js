let loggedOutLinks = document.querySelectorAll('.loggedout');
let loggedInLinks = document.querySelectorAll('.loggedin');
//functions 



function configureNav(user) {
  //check if user is passed to the function (user is signed in)
  if (user) {
    document.querySelector('#welcome_user').innerHTML = `<p>Welcome ${auth.currentUser.email}</p>`
    //show all the logged in links
    //hide all the logged out links

    loggedInLinks.forEach(link => {
      link.classList.remove('is-hidden');

    });

    loggedOutLinks.forEach(link => {
      link.classList.add('is-hidden');
    })


  }
  //no user is passed to the function (user is signed out)
  else {
    document.querySelector('#welcome_user').innerHTML = "";
    //show all the logged out link
    //hide all the logged in links
    loggedInLinks.forEach(link => {
      link.classList.add('is-hidden');

    });

    loggedOutLinks.forEach(link => {
      link.classList.remove('is-hidden');
    })
  }
}






let signupbtn = document.querySelector('#signupbtn');
let signupModal = document.querySelector('#signup-modal');
let signupModalBg = document.querySelector('#signup-modalbg');
signupbtn.addEventListener('click', () => {
  signupModal.classList.add('is-active');
});

signupModalBg.addEventListener('click', () => {
  signupModal.classList.remove('is-active');
});

// navigation bar
// sign in modal link

let signinbtn = document.querySelector('#signinbtn');
let signinModal = document.querySelector('#signin-modal');
let signinModalBg = document.querySelector('#signin-modalbg');
signinbtn.addEventListener('click', () => {
  signinModal.classList.add('is-active');
})

signinModalBg.addEventListener('click', () => {
  signinModal.classList.remove('is-active');
});


//sign up users
let signup_form = document.querySelector('#signup_form');
//attach a SUBMIT event
signup_form.addEventListener('click', (e) => {
  e.preventDefault();
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;

  auth.createUserWithEmailAndPassword(email, password).then(() => {
      console.log('user created successfully!');

      signupModal.classList.remove('is-active');

      //reset the modal
      signup_form.reset();
    })

    .catch((error) => {
      let signup_error = document.querySelector("#signup_error");
      signup_error.innerHTML = `<p>${error.message}</p>`

    })
})

// sign in form

let signin_form = document.querySelector("#signin_form");

signin_form.addEventListener('submit', (e) => {
  e.preventDefault();

  let email = document.querySelector("#email_").value;
  let password = document.querySelector("#password_").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log(userCredential.user.email);
      //close the modal
      signinModal.classList.remove('is-active');
      signin_form.reset();
    })
    .catch((error) => {
      let signin_error = document.querySelector('#signin_error');
      signin_error.innerHTML = `<p>${error.message}</p>`
      signin_form.reset();

    })
})


//sign out
let signoutbtn = document.querySelector('#signoutbtn');


signoutbtn.addEventListener('click', () => {
  auth.signOut()
    .then((msg) => {

    })

})


auth.onAuthStateChanged((user) => {
  if (user) {
    console.log('user is now signed in');
    configureNav(user);
    let all = document.getElementById('all');
    let available = document.getElementById('available');
    let sold = document.getElementById('sold');
    all.onclick = function (event) {
      load_vessel_admin("none");
    }
    available.onclick = function (event) {
      load_vessel_admin("available");
    }
    sold.onclick = function (event) {
      load_vessel_admin("sold");
    }
    load_vessel_admin("none");

    // let soldbutton = document.getElementById('soldbtn');

    // soldbutton.onclick = function (event) {
    //   load_vessel_admin("sold");
    // }





  } else {
    console.log('user is now signed out!');
    configureNav();
    let all = document.getElementById('all');
    let available = document.getElementById('available');
    let sold = document.getElementById('sold');
    all.onclick = function (event) {
      load_vessel_client("none");
    }
    available.onclick = function (event) {
      load_vessel_client("available");
    }
    sold.onclick = function (event) {
      load_vessel_client("sold");
    }
    load_vessel_client("none");

  }
})

let postCommentBtn = document.querySelector("#postcommentbtn");

let html = '<h1 class="title is-size-3">Post New Ship</h1>';
html += `
<div class="field">
    <div class="columns">
      <div class="column is-6">
        <label class="label"> Title </label>
        <div class="control">
          <input class="input is-black" type="text" placeholder="Vessel Name (e.g.,FORDECO 87)" id="vesselName">
        </div>

      </div>

      <div class="column is-6">
        <label class="label"> Price </label>
        <div class="control">
          <input class="input is-black" type="text" placeholder="Vessel's Price (in RM)" id="price">
        </div>

      </div>


    </div>
  </div>


  <div class="field">
    <div class="columns">
      <div class="column is-2">

        <div class="field">
          <label class="label">Bhp/Dwt/Teu: </label>
          <div class="control">
            <input class="input is-black" type="text" placeholder="e.g.,2000HP" id="bhp">
          </div>
        </div>
      </div>

      <div class="column is-2">
        <div class="field">
          <label class="label">Class: </label>
          <div class="control">
            <input class="input is-black" type="text" placeholder="e.g.,NK" id="vesselclass">
          </div>
        </div>
      </div>

      <div class="column is-2">
      <div class="field">
          <label class="label">Dimensions: </label>
          <div class="control">
            <input class="input is-black" type="text" placeholder="e.g.,30.780m X 9.0m X 4.65m" id="dimensions">
          </div>
        </div>
      </div>

      <div class="column is-2">
        <div class="field">
          <label class="label">Engine: </label>
            <div class="control">
                <input class="input is-black" type="text" placeholder="e.g.,KTA-50-M2" id="engine">
            </div>
        </div>
      </div>

      <div class="column is-2">
        <div class="field">
        <label class="label">Image</label>
        <div class="control">
         <input class = "input" type = "file" id="listing_image" placeholder = "Choose Image" >
        </div>
      </div>
      </div>

      

      


  </div>
<div class="field">
  <label class="label">Description for The Vessel</label>
  <div class="control">
    <textarea class=" is-black textarea" placeholder="Description" id="vessel_description"></textarea>
  </div>
</div>



<div class="field is-grouped">
  <div class="control">
    <button class="button is-link">Submit</button>
  </div>
</div>

`;

let submitCommentForm = document.querySelector('#submitcommentform');
postCommentBtn.addEventListener('click', () => {


  submitCommentForm.innerHTML = html;

})

submitcommentform.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log("im in ");
  let vesselName = document.querySelector('#vesselName').value;
  let price = document.querySelector('#price').value;
  let bhp = parseFloat(document.querySelector('#bhp').value);
  let vclass = document.querySelector('#vesselclass').value;
  let dimensions = document.querySelector('#dimensions').value;
  let engine = document.querySelector('#engine').value;
  let vessel_description = document.querySelector('#vessel_description').value;

  let file = document.querySelector("#listing_image").files[0];

  let image = new Date() + "_" + file.name;

  const task = ref.child(image).put(file);

  task
    .then(snapshot => snapshot.ref.getDownloadURL())
    .then((url) => {


      // combine title and description into one object
      let vessel_details = {
        Vessel: vesselName,
        Price: price,
        Bhp: bhp,
        Class: vclass,
        Dimensions: dimensions,
        Engine: engine,
        Description: vessel_description,
        Picture: url,
        Status: "available"
      }

      // add course_details into firebase

      db.collection('vessels').add(vessel_details).then((data) => {
        alert('vessel added!');
        submitcommentform.reset();
      })
      submitCommentForm.innerHTML = "";

      load_vessel_admin("none");
    })

})

function load_vessel_admin(filter) {
  db.collection('vessels').get().then(data => {
    let vesselArray = data.docs;
    let dyContent2 = document.querySelector('#dynamicContent2');
    dyContent2.innerHTML = ``;

    if (filter == "none") {
      vesselArray.forEach(vessel => {
        let html_temp = `<div class="column is-4 available">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
               RM${vessel.data().Price}
            </p>
            <div class="box">
            ${vessel.data().Status}
            </div>
          </header>
         
          <div class="card-content">
          
            <div class="content">
            <div class="portfolio-item">
            <img src="${vessel.data().Picture}" alt="" />
            <div class="portfolio-desc align-center">
                <div class="folio-info">
                    <a href="${vessel.data().Picture}" class="fancybox">
                        <h5 style="color:blue;">${vessel.data().Vessel}</h5>
                        <i class="fa fa-link fa-2x"></i>
                    </a>
                </div>
            </div>
        </div>
            <ul>
              <li>Bhp/Dwt/Teu: ${vessel.data().Bhp} </li>
              <li>Dimension: ${vessel.data().Dimensions}</li>
              <li>Class: ${vessel.data().Class}</li>
              <li>Engine: ${vessel.data().Engine}</li>
              


            </ul>
            `;

        if (vessel.data().Status != "sold") {
          html_temp += `<p>${vessel.data().Description}</p>  
          </div>
          </div>
          <footer class="card-footer">
          
          <p class="card-footer-item">  
      <span>
        <a class="button is-large soldbtn">SOLD</a>
      </span>
    </p>
            </footer>
    
        </div>
      </div>`;
        } else {
          html_temp += `<p>${vessel.data().Description}</p></div>
          </div><footer class="card-footer">
          <p class="card-footer-item">
      <span>
      </span>
    </p>
            </footer> 
    
        </div>
      </div>`;
        }
        dyContent2.innerHTML += html_temp;
        console.log("posted");
      })
    } else {
      vesselArray.forEach(vessel => {
        if (vessel.data().Status == filter) {
          let html_temp = `<div class="column is-4">
          <div class="card">
            <header class="card-header">
            <p class="card-header-title">
            ${vessel.data().Price}
          </p>
          <div class="box">
          ${vessel.data().Status}
        </div>
      
            </header>
            <div class="card-content">
              <div class="content">
              <div class="portfolio-item">
            <img src="${vessel.data().Picture}" alt="" />
            <div class="portfolio-desc align-center">
                <div class="folio-info">
                    <a href="${vessel.data().Picture}" class="fancybox">
                        <h5>${vessel.data().Vessel}</h5>
                        <i class="fa fa-link fa-2x"></i>
                    </a>
                </div>
            </div>
        </div>
              <ul>
              <li>Bhp/Dwt/Teu: ${vessel.data().Bhp} </li>
              <li>Dimension: ${vessel.data().Dimensions}</li>
              <li>Class: ${vessel.data().Class}</li>
              <li>Engine: ${vessel.data().Engine}</li>
              
                          </ul>`;

          if (vessel.data().Status != "sold") {
            html_temp += `<p>${vessel.data().Description}</p> </div>
              </div>
              <footer class="card-footer">
              <p class="card-footer-item">
          <span>
            <a class="button is-large soldbtn">SOLD</a>
          </span>
        </p>
                </footer>
        
            </div>
          </div>`;
          } else {
            html_temp += `<p>${vessel.data().Description}</p></div>
              </div><footer class="card-footer">
              <p class="card-footer-item">
          <span>
          </span>
        </p>
                </footer>
        
            </div>
          </div>`;
          }
          dyContent2.innerHTML += html_temp;
          console.log("posted");
        }
      })
    }


  })

}

function load_vessel_client(filter) {
  db.collection('vessels').get().then(data => {
    let vesselArray = data.docs;
    let dyContent2 = document.querySelector('#dynamicContent2');
    dyContent2.innerHTML = ``;

    if (filter == "none") {
      vesselArray.forEach(vessel => {
        let html_temp = `<div class="column is-4 available">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              RM${vessel.data().Price}
            </p>
            <div class="box">
            ${vessel.data().Status}
            </div>
          </header>
          <div class="card-content">
            <div class="content">
            <div class="portfolio-item">
            <img src="${vessel.data().Picture}" alt="" />
            <div class="portfolio-desc align-center">
                <div class="folio-info">
                    <a href="${vessel.data().Picture}" class="fancybox">
                        <h5>${vessel.data().Vessel}</h5>
                        <i class="fa fa-link fa-2x"></i>
                    </a>
                </div>
            </div>
        </div>
            <ul>
              <li>Bhp/Dwt/Teu: ${vessel.data().Bhp} </li>
              <li>Dimension: ${vessel.data().Dimensions}</li>
              <li>Class: ${vessel.data().Class}</li>
              <li>Engine: ${vessel.data().Engine}</li>
              
            </ul>
            <p>${vessel.data().Description}</p>
          </div>
          </div> `;

        dyContent2.innerHTML += html_temp;
        console.log("posted");
      })
    } else {
      vesselArray.forEach(vessel => {
        if (vessel.data().Status == filter) {
          let html_temp = `<div class="column is-4">
          <div class="card">
            <header class="card-header">
            <p class="card-header-title">
            ${vessel.data().Vessel}
          </p>
          <div class="box">
          ${vessel.data().Status}
        </div>
      
            </header>
            <div class="card-content">
              <div class="content">
              <div class="portfolio-item">
            <img src="${vessel.data().Picture}" alt="" />
            <div class="portfolio-desc align-center">
                <div class="folio-info">
                    <a href="${vessel.data().Picture}" class="fancybox">
                        <h5>${vessel.data().Vessel}</h5>
                        <i class="fa fa-link fa-2x"></i>
                    </a>
                </div>
            </div>
        </div>
              <ul>
              <li>Bhp/Dwt/Teu: ${vessel.data().Bhp} </li>
              <li>Dimension: ${vessel.data().Dimensions}</li>
              <li>Class: ${vessel.data().Class}</li>
              <li>Engine: ${vessel.data().Engine}</li>
            </ul>
            <p>${vessel.data().Description}</p>
            </div>
            </div>`;

          dyContent2.innerHTML += html_temp;
          console.log("posted");
        }
      })
    }


  })
}


let soldLinks = document.getElementsByClassName('.soldbtn');
console.log(soldLinks);