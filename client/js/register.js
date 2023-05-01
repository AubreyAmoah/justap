let generateRegisterPage = () => {
    link.rel = 'stylesheet';
    link.href = './css/register.css';

    if(document.head.contains(link)) {
        document.head.removeChild(link);
        document.head.appendChild(link);
    } else {
        document.head.appendChild(link);
    }

    return (
        root.innerHTML = `
        <div id="response" class="hidden"></div>
        <div class="container">
            <div class="two">
                <form method="post" id="register-form">
                    <div class="head">
                        <h3>Register</h3>
                        <p>By clicking on sign up you agree to all our terms and agreements</p>
                    </div>
                    <label for="fname">First Name</label>
                    <input type="text" name="fname" id="fname">
                    <label for="fname">Last Name</label>
                    <input type="text" name="lname" id="lname">
                    <label for="dob">Date Of Birth</label>
                    <input type="date" name="dob" id="dob">
                    <label for="gender">Gender</label>
                    <select name="gender" id="gender">
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <label for="email">Email</label>
                    <input type="email" name="email" id="email">
                    <label for="uni">University</label>
                    <select name="uni" id="uni">
                        <option value="uew">UEW</option>
                        <option value="knust">KNUST</option>
                        <option value="ug">UG</option>
                        <option value="ucc">UCC</option>
                    </select>
                    <label for="level">Level</label>
                    <select name="level" id="level">
                        <option value="100">Level 100</option>
                        <option value="200">Level 200</option>
                        <option value="300">Level 300</option>
                        <option value="400">Level 400</option>
                    </select>
                    <div class="form-grp">
                        <div class="one">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password">
                        </div>
                        <div class="one">
                            <label for="repeatpassword">Repeat Password</label>
                            <input type="password" name="repeatpassword" id="repeat_password">
                        </div>
                    </div>

                    <button class="form-btn" onclick="submitRegister()">sign up</button>

                    <p class="text">Already Have an account? <a href="#/">Login</a></p>
                </form>
            </div>
        </div>
        `
    )
}


let submitRegister = () => {
    const form = document.getElementById("register-form");
    const responseDiv = document.getElementById("response");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const first_name = document.getElementById("fname").value;
      const last_name = document.getElementById("lname").value;
      const gender = document.getElementById("gender").value;
      const dob = document.getElementById("dob").value;
      const university = document.getElementById("uni").value;
      const level = document.getElementById("level").value;
      const password = document.getElementById("password").value;
      const repeat_password = document.getElementById("repeat_password").value;
      const data = { email, password, first_name, last_name, gender, dob, university, level, repeat_password };

      try {
        const response = await fetch("http://localhost:5002/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const user = await response.json();
        if (response.ok) {
            if(responseDiv.classList.contains('hidden')) {
                responseDiv.classList.remove('hidden')
            }
            responseDiv.innerHTML = `Account succesfully created `;
            localStorage.setItem("token", user.token);
            setTimeout(() => {
                responseDiv.classList.add('hidden');
                window.location.href = '#/welcome';
                window.location.reload();
            }, 900);
        } else {
            if(responseDiv.classList.contains('hidden')) {
                responseDiv.classList.remove('hidden')
            }
            responseDiv.innerHTML = `${user.data}`;
            setTimeout(() => {
                responseDiv.classList.add('hidden');
            }, 900);
        }
      } catch (error) {
        if(responseDiv.classList.contains('hidden')) {
            responseDiv.classList.remove('hidden')
        }
        responseDiv.innerHTML = "Failed to connect to server";
        setTimeout(() => {
            responseDiv.classList.add('hidden');
        }, 900);
        console.error(error);
      }
    });
}