let generatePasswordUpdatePage = () => {
    return(
      document.getElementById('dashboard-root').innerHTML = `
      <div id="base-password-form" class="flex-column-center">
        <input id="currpass" type="password" placeholder="current password" />
        <input id="newpass" type="password" placeholder="new password" />
        <input id="reppass" type="password" placeholder="repeat new password" />
        <button id="changepass" onclick="changePassword()">Change Password</button>
      </div>
      `
    )
};

let changePassword = async() => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
  
    const current_password = document.getElementById('currpass').value;
    const new_password = document.getElementById('newpass').value;
    const repeat_password = document.getElementById('reppass').value;
    const responseDiv = document.getElementById("response");
  
      const data = { current_password, new_password, repeat_password };
  
      try {
        const response = await fetch("http://localhost:5002/change-password", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        });
  
        const user = await response.json();
        if (response.ok) {
          if(responseDiv.classList.contains('hidden')) {
            responseDiv.classList.remove('hidden')
          }
          responseDiv.innerHTML = `${user.data}`;
          setTimeout(() => {
              responseDiv.classList.add('hidden');
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
        responseDiv.innerHTML = "An error occurred. Please try again later.";
        setTimeout(() => {
            responseDiv.classList.add('hidden');
        }, 900);
        console.error(error);
      }
  }