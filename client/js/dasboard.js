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
    <div class="carousel-container">
        <div class="carousel-slide">
          <img class="carousel-image" src="" alt="Image 1">
          <img class="carousel-image" src="" alt="Image 2">
          <img class="carousel-image" src="" alt="Image 3">
          <img class="carousel-image" src="" alt="Image 4">
        </div>
        
        <a class="prev" onclick="prevSlide()">&#10094;</a>
        <a class="next" onclick="nextSlide()">&#10095;</a>
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
  const headers = new Headers({
    "x-access-token": `${token}`,
    "Content-Type": "application/json"
  });
  //console.log(headers);
  
  const images = document.querySelectorAll('img[class="carousel-image"]');
  
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
      console.log(user[0])
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