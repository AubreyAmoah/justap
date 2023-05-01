let generateHomePage = () => {
    link.rel = 'stylesheet';
    link.href = './css/style.css';
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
            <div class="one">
                <img src="" alt="JusTap" class="logo">
                <h2>Create</h2>
                <h2 class="margin-bottom">New Account</h2>
                <button class="btn" onclick="genSignUp()">Sign Up</button>
                <button class="btn" onclick="googleSignUp()">Sign In With Google</button>
                <hr class="border-bottom">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quis, sunt voluptates rem iure velit perspiciatis eligendi enim eaque fugit cupiditate minus officiis culpa. Officiis, nobis perspiciatis. Pariatur, dolores! Dignissimos.</p>
                <button class="btn-small">Learn More</button>
            </div>
            <div class="two">
                <form id="login-form" method="post">
                    <label for="email">EMAIL</label>
                    <input type="email" name="email" id="email">
                    <label for="password">PASSWORD</label>
                    <input type="password" name="password" id="password">

                    <button class="form-btn" onclick="submitLogin()">Login</button>

                    <a href="#/forgot-password">Forgotten Password?</a>
                </form>
            </div>
        </div>
        `
    )
}

function genSignUp() {
    window.location.hash = '#/signUp';
}

let submitLogin = () => {
    const form = document.getElementById("login-form");
    const responseDiv = document.getElementById("response");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const data = { email, password };

      try {
        const response = await fetch("http://localhost:5002/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
            const user = await response.json();
            // Save token to local storage
            localStorage.setItem("token", user.token);
            if(responseDiv.classList.contains('hidden')) {
                responseDiv.classList.remove('hidden')
            }
            responseDiv.innerHTML=`Hello, ${user.first_name}`
            setTimeout(() => {
                responseDiv.classList.add('hidden');
                window.location.href="#/dashboard";
                window.location.reload();
            }, 600);

        } else {
            const user = await response.json();
            if(responseDiv.classList.contains('hidden')) {
                responseDiv.classList.remove('hidden')
            }
            responseDiv.innerHTML = `${user.data}`;
            console.log('error')
            setTimeout(() => {
                responseDiv.classList.add('hidden');
            }, 600);
        }
      } catch (error) {
        if(responseDiv.classList.contains('hidden')) {
            responseDiv.classList.remove('hidden')
        }
        responseDiv.innerHTML = "An error occurred. Please try again later.";
        console.error(error);
        setTimeout(() => {
            responseDiv.classList.add('hidden');
        }, 600);
      }
    });
  }

let googleSignUp = () => {
    location.href = "/auth/google"
}