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


    } else {
        console.log('user is now signed out!');
        configureNav();

    }
})

let postCommentBtn = document.querySelector("#postcommentbtn");

let html = '<h1 class="title is-size-3">Post a Comment</h1>';
html += `
<div class="field">
    <div class="columns">
      <div class="column is-6">
        <label class="label"> Title </label>
        <div class="control">
          <input class="input" type="text" placeholder="Course Name (e.g., STAT 301)" id="course_title">
        </div>

      </div>

      <div class="column is-6">
        <label class="label"> Professor </label>
        <div class="control">
          <input class="input" type="text" placeholder="Prof's Name" id="prof_name">
        </div>

      </div>


    </div>
  </div>


  <div class="field">
    <div class="columns">
      <div class="column is-2">

        <div class="field">
          <label class="label">Professor Rating: </label>
          <div class="control">
            <input class="input" type="text" placeholder="Sacle of 1-10" id="course_rating">
          </div>
        </div>
      </div>

      <div class="column is-2">
        <div class="field">
          <label class="label">Grade: </label>
          <div class="control">
            <input class="input" type="text" placeholder="e.g.,A, AB, B" id="grade">
          </div>
        </div>
      </div>

      <div class="column is-2">
      <div class="field">
          <label class="label">Number of Credits: </label>
          <div class="control">
            <div class="select">
              <select id = "num_credits">
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-2">
        <div class="field">
          <label class="label">Attendance: </label>
          <div class="control">
            <div class="select">
              <select id = "attendance">
                <option>Mandatory</option>
                <option>Not Mandatory</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-2">
      <div class="field">
          <label class="label">Mode of Delivery: </label>
          <div class="control">
            <div class="select">
              <select id = "mode_of_delivery">
                <option>In-person</option>
                <option>Hybrid</option>
                <option>Online</option>
              </select>
            </div>
          </div>
        </div>
        
      </div>

      <div class="column is-2">
      <div class="field">
          <label class="label">Would Take Again: </label>
          <div class="control">
            <div class="select">
              <select id = "would_take_again">
                <option id="Yes">Yes</option>
                <option id="No">No</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>



</div>
<div class="field">
  <label class="label">Comments About The Course</label>
  <div class="control">
    <textarea class="textarea" placeholder="Comments" id="course_description"></textarea>
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

    document.querySelector('#dynamicContent').innerHTML = "";

    submitCommentForm.innerHTML = html;

})

submitcommentform.addEventListener('submit', (e) => {
    e.preventDefault();
    let dy
    console.log("im in ");
    let course_title = document.querySelector('#course_title').value;
    let prof_name = document.querySelector('#prof_name').value;
    let course_rating = parseFloat(document.querySelector('#course_rating').value);
    let grade = document.querySelector('#grade').value;
    let attendance = document.querySelector('#attendance').value;
    let mode_of_delivery = document.querySelector('#mode_of_delivery').value;
    let num_credits = parseInt(document.querySelector('#num_credits').value);
    let would_take_again = document.querySelector('#would_take_again').value;
    let course_description = document.querySelector('#course_description').value;

    // combine title and description into one object
    let course_details = {
        title: course_title,
        prof: prof_name,
        rating: course_rating,
        grad: grade,
        attend: attendance,
        mode: mode_of_delivery,
        credit: num_credits,
        take: would_take_again,
        desc: course_description,
        status: "Available"
    }

    // add course_details into firebase

    db.collection('courses').add(course_details).then((data) => {
        console.log('course added!');
        submitcommentform.reset();
    })
    submitCommentForm.innerHTML = "";
    db.collection('courses').get().then(data => {
        let courseArray = data.docs;
        let dyContent2 = document.querySelector('.dynamicContent2');
        let html2 = `<article class="col-sm-4 isotopeItem available isotope-item" style="position: absolute; left: 0px; top: 0px; transform: translate3d(0px, 0px, 0px);">
        <div class="portfolio-item">
            <img src="assets/images/portfolio/img1.jpg" alt="" />
            <div class="portfolio-desc align-center">
                <div class="folio-info">
                    <a href="assets/images/portfolio/img1.jpg" class="fancybox">
                        <h5>Project Title</h5>
                        <i class="fa fa-link fa-2x"></i>
                    </a>
                </div>
            </div>
        </div>
    </article>`;
        dyContent2.innerHTML = html2;
        console.log("posted");
    })

})