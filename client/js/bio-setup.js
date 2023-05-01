let generateDescriptionSetupPage = () => {
    link.rel = 'stylesheet';
    link.href = './css/description.css';

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
        <div class="welcome-box">
            <div class="header">
                <i class="heart">&hearts;</i>
                <img src="" alt="JustTap" class="logo">
                <h1>Tell us something about your self</h1>
            </div>
            <p>Once you click on next you cannot come back to make changes so make sure you go through your selections before you click on next</p>
            <form id="campus-form">
                <textarea name="description" id="description" cols="40" rows="5"></textarea>
                <button class="next" onclick="submitDescription()">next</button>
            </form>
        </div>
    </div>
        `
    )
}

let submitDescription = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const form = document.getElementById("campus-form");
    const responseDiv = document.getElementById("response");

    form.addEventListener("submit", async (event) => {

      event.preventDefault();
      let description = document.getElementById("description").value;

      const data = { description };
      console.log(data)
      try {
        const response = await fetch("http://localhost:5002/submit-description", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data),
        });

        const user = await response.json();
        if (response.ok) {
            if(responseDiv.classList.contains('hidden')) {
                responseDiv.classList.remove('hidden')
            }
            responseDiv.innerHTML = `Success `;
            setTimeout(() => {
                responseDiv.classList.add('hidden');
                window.location.href = '#/set-images'
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
    });
}