let generateDashBoardPage = () => {
    link.rel = 'stylesheet';
    link.href = './css/dashboard.css';
    if(document.head.contains(link)) {
        document.head.removeChild(link);
        document.head.appendChild(link);
    } else {
        document.head.appendChild(link);
    }
    return(
        root.innerHTML = `
        <div id="response" class="hidden"></div>
        <div class="container">
          <div class="section-details">
              <div class="header">
                  <div class="profile">
                      <img src="" alt="" class="profile-img" id="profile-pic" onclick="profile()">
                      <h2 class="profile-name" id="profile-name" onclick="dashboardHome()"></h2>
                  </div>

                  <i id="">&#128269;</i>
                  <i>&#x1F4AC;</i>
                  <i>&#128249;</i>
              </div>
              <div class="middle" id="side-root">

              </div>

              <button onclick="logout()">Logout</button>
          </div>
          <div class="section-page" id="dashboard-root">

          </div>
        </div>
        `
    )
}

let generateUserCarousel = () => {
  return(
    document.getElementById('dashboard-root').innerHTML = `
    <div class="carousel-container" >
        <div class="carousel-slide">
          <img class="carousel-image" id="carousel-image-1" alt="Image 1">
          <img class="carousel-image" id="carousel-image-2" alt="Image 2">
          <img class="carousel-image" id="carousel-image-3" alt="Image 3">
          <img class="carousel-image" id="carousel-image-4" alt="Image 4">
        </div>
        
        <div class="carousel-background" id="carousel"></div>
        <a class="prev" onclick="prevSlide()">&#10094;</a>
        <a class="next" onclick="nextSlide()">&#10095;</a>

        <div class="carousel-text-container">
          <p class="hidden" id="userid"></p>
          <div class="flex-row">
            <p id="username"></p>,
            <p id="userage"></p>
          </div>
          <div class="flex-row">
            <p id="usercampus"></p> 
            Level <p id="userlevel"></p>
          </div>
          <p id="userabout"></p>
        </div>
        <button id="like-btn" class="carousel-btn carousel-btn-love btn-left" onclick="addUserToList()">&hearts;</button>
        <button class="carousel-btn carousel-btn-cancel btn-right">&#9587;</button>
      </div>
    `
  )
}

let activateCarousel = () => {
  let slideIndex = 1;
  showSlide(slideIndex);

  let slideTimer = setInterval(nextSlide, 5000); // set timer for 5 seconds

  function prevSlide() {
    showSlide(slideIndex -= 1);
  }

  function nextSlide() {
    showSlide(slideIndex += 1);
  }

  function showSlide(n) {
    const slides = document.getElementsByClassName("carousel-slide")[0].getElementsByTagName("img");
    
    if (n > slides.length) {
      slideIndex = 1;
    }
    
    if (n < 1) {
      slideIndex = slides.length;
    }
    
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    
    slides[slideIndex - 1].style.display = "block";
  }

  function resetTimer() {
    clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, 5000);
  }

  document.addEventListener("visibilitychange", function() {
    if (document.hidden) {
      clearInterval(slideTimer);
    } else {
      resetTimer();
    }
  });

}

let dashboardHome = () => {
  window.location.href = '#/dashboard';
  //window.location.reload();
}


let getName = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const name = document.getElementById("profile-name");
    
    fetch("http://localhost:5002/get-name", {
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error getting name");
        }
        return response.json();
    })
      .then(user => {
        name.innerHTML = `${user.fname}`;
    })
      .catch(error => {
        console.log(error);
        name.innerHTML = "Error getting name";
    });

}

let profilePic = () => {
  const headers = new Headers({
    "x-access-token": `${token}`,
    "Content-Type": "application/json"
  });
  //console.log(headers);
  
  const profilePic = document.getElementById("profile-pic");
  
  fetch("http://localhost:5002/get-profile-pic", {
    method: "GET",
    headers: headers
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error getting name");
      }
      return response.json();
    })
    .then(user => {
      profilePic.src = `${user.image}`;
    })
    .catch(error => {
      console.log(error);
    });

}

let getUsers = () =>{
  let userid = document.getElementById('userid');
  let carousel = document.getElementById('carousel');
  let fullName = document.getElementById('username');
  let age = document.getElementById('userage');
  let campus = document.getElementById('usercampus');
  let level = document.getElementById('userlevel');
  let about = document.getElementById('userabout');
  const headers = new Headers({
    "x-access-token": `${token}`,
    "Content-Type": "application/json"
  });
  //console.log(headers);
    
  fetch("http://localhost:5002/user-list", {
    method: "GET",
    headers: headers
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error getting name");
      }
      return response.json();
    })
    .then(user => {
      if (user[0]._id === undefined || null){
        
      }

      userid.innerHTML = `${user[0]._id}`;
      fullName.innerHTML = `${user[0].first_name} ${user[0].last_name}`;
      age.innerHTML = `${user[0].dob}`;
      campus.innerHTML = `${user[0].university}`
      level.innerHTML = `${user[0].level}`
      about.innerHTML = `${user[0].description}`
      getUserDetail();

      let i = 1;
      carousel.addEventListener('click', () => {
        userid.innerHTML = `${user[i]._id}`;
        fullName.innerHTML = `${user[i].first_name} ${user[i].last_name}`;
        age.innerHTML = `${user[i].dob}`;
        campus.innerHTML = `${user[i].university}`
        level.innerHTML = `${user[i].level}`
        about.innerHTML = `${user[i].description}`
        getUserDetail();
        i++;
        if(i >= user.length){
          i = 0;
        }
      });
      

      console.log(user)
    })
    .catch(error => {
      console.log(error);
    });
}

let getUserDetail = () =>{
  let user_identity = document.getElementById('userid').innerHTML;
  let image1 = document.getElementById('carousel-image-1');
  let image2 = document.getElementById('carousel-image-2');
  let image3 = document.getElementById('carousel-image-3');
  let image4 = document.getElementById('carousel-image-4');

  console.log(user_identity)
  const headers = new Headers({
    "x-access-token": `${token}`,
    "Content-Type": "application/json"
  });
  //console.log(headers);


  const data = {user_identity};
    
  fetch("http://localhost:5002/user-bio-list", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error getting name");
      }
      return response.json();
    })
    .then(user => {
      image1.src = user.images[0];
      image2.src = user.images[1];
      image3.src = user.images[2];
      image4.src = user.images[3];
      console.log(user)
    })
    .catch(error => {
      console.log(error);
    });
}

let addUserToList = () =>{
  const responseDiv = document.getElementById('response');
  let user_id = document.getElementById('userid').innerHTML;

  console.log(user_id)
  const headers = new Headers({
    "x-access-token": `${token}`,
    "Content-Type": "application/json"
  });
  //console.log(headers);


  const data = {user_id};
    
  fetch("http://localhost:5002/add-to-chat-list", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error adding user");
      }
      return response.json();
    })
    .then(user => {
      if(responseDiv.classList.contains('hidden')) {
        responseDiv.classList.remove('hidden')
    }
    responseDiv.innerHTML =`${user.data}`
    setTimeout(() => {
        responseDiv.classList.add('hidden');
    }, 900);

    })
    .catch(error => {
      console.log(error);
    });
}

let logout = () => {
    localStorage.removeItem("token");
    window.location.href = '#/'
    window.location.reload();
}