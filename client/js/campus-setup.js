let generateCampusSetupPage = () => {
    link.rel = 'stylesheet';
    link.href = './css/campus.css';

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
                    <h1>Select your interest</h1>
                </div>
                <h2>Which campus are you more interested in</h2>
                <p>Once you click on next you cannot come back to make changes so make sure you go through your selections before you click on next</p>
                <form id="campus-form">
                    <input type="checkbox" name="label-1" id="label-1" value="knust">
                    <label for="label-1">knust</label>

                    <input type="checkbox" name="label-2" id="label-2" value="ug">
                    <label for="label-2">legon</label>

                    <input type="checkbox" name="label-3" id="label-3" value="ucc">
                    <label for="label-3">ucc</label>

                    <input type="checkbox" name="label-4" id="label-4" value="uew">
                    <label for="label-4">uew</label>

                    <button class="next" onclick="submitCampus()">next</button>
                </form>
            </div>
        </div>
        `
    )
}

let submitCampus = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const form = document.getElementById("campus-form");
    const responseDiv = document.getElementById("response");

    form.addEventListener("submit", async (event) => {

      event.preventDefault();
      let label_1_ = document.getElementById("label-1");
      let label_2_ = document.getElementById("label-2");
      let label_3_ = document.getElementById("label-3");
      let label_4_ = document.getElementById("label-4");

      let label_1 = document.getElementById("label-1").value;
      let label_2 = document.getElementById("label-2").value;
      let label_3 = document.getElementById("label-3").value;
      let label_4 = document.getElementById("label-4").value;

      if(!(label_1_.checked)){
        label_1 = "";
      }else{
        label_1 = "knust"
      }

      if(!(label_2_.checked)){
        label_2 = "";
      } else{
        label_2 = "ug"
      }

      if(!(label_3_.checked)){
        label_3 = "";
      } else{
        label_3 = "ucc"
      }

      if(!(label_4_.checked)){
        label_4 = "";
      } else{
        label_4 = "uew"
      }

      const data = { label_1, label_2, label_3, label_4 };
      console.log(data)
      try {
        const response = await fetch("http://localhost:5002/submit-campus", {
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
                window.location.href = '#/set-level'
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