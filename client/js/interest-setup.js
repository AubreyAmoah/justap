let generateInterestSetupPage = () => {
    link.rel = 'stylesheet';
    link.href = './css/profile.css';

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
            <h2>Choose as many as you want</h2>
            <p>Once you click on next you cannot come back to make changes so make sure you go through your selections before you click on next</p>
            <form id="interests-form">
                <input type="checkbox" name="label-1" id="label-1" value="reading">
                <label for="label-1">reading</label>

                <input type="checkbox" name="label-2" id="label-2" value="sports">
                <label for="label-2">sports</label>

                <input type="checkbox" name="label-3" id="label-3" value="indoor">
                <label for="label-3">indoor</label>

                <input type="checkbox" name="label-4" id="label-4" value="gym">
                <label for="label-4">gym</label>

                <input type="checkbox" name="label-5" id="label-5" value="music">
                <label for="label-5">music</label>

                <input type="checkbox" name="label-6" id="label-6" value="movies">
                <label for="label-6">movies</label>

                <input type="checkbox" name="label-7" id="label-7" value="outing">
                <label for="label-7">outing</label>

                <input type="checkbox" name="label-8" id="label-8" value="karaoke">
                <label for="label-8">karaoke</label>

                <input type="checkbox" name="label-9" id="label-9" value="parties">
                <label for="label-9">parties</label>

                <input type="checkbox" name="label-10" id="label-10" value="swimming">
                <label for="label-10">swimming</label>

                <input type="checkbox" name="label-11" id="label-11" value="trips">
                <label for="label-11">trips</label>

                <input type="checkbox" name="label-12" id="label-12" value="shopping">
                <label for="label-12">shopping</label>

                <button class="next" onclick="submitInterests()">next</button>
            </form>
        </div>
    </div>
        `
    )
}

let submitInterests = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const form = document.getElementById("interests-form");
    const responseDiv = document.getElementById("response");

    console.log('clicked');

    form.addEventListener("submit", async (event) => {

      event.preventDefault();
      let label_1_ = document.getElementById("label-1");
      let label_2_ = document.getElementById("label-2");
      let label_3_ = document.getElementById("label-3");
      let label_4_ = document.getElementById("label-4");
      let label_5_ = document.getElementById("label-5");
      let label_6_ = document.getElementById("label-6");
      let label_7_ = document.getElementById("label-7");
      let label_8_ = document.getElementById("label-8");
      let label_9_ = document.getElementById("label-9");
      let label_10_ = document.getElementById("label-10");
      let label_11_ = document.getElementById("label-11");
      let label_12_ = document.getElementById("label-12");

      let label_1 = document.getElementById("label-1").value;
      let label_2 = document.getElementById("label-2").value;
      let label_3 = document.getElementById("label-3").value;
      let label_4 = document.getElementById("label-4").value;
      let label_5 = document.getElementById("label-5").value;
      let label_6 = document.getElementById("label-6").value;
      let label_7 = document.getElementById("label-7").value;
      let label_8 = document.getElementById("label-8").value;
      let label_9 = document.getElementById("label-9").value;
      let label_10 = document.getElementById("label-10").value;
      let label_11 = document.getElementById("label-11").value;
      let label_12 = document.getElementById("label-12").value;

      if(!(label_1_.checked)){
        label_1 = "";
      }else{
        label_1 = "reading"
      }

      if(!(label_2_.checked)){
        label_2 = "";
      } else{
        label_2 = "sports"
      }

      if(!(label_3_.checked)){
        label_3 = "";
      } else{
        label_3 = "indoor"
      }

      if(!(label_4_.checked)){
        label_4 = "";
      } else{
        label_4 = "gym"
      }

      if(!(label_5_.checked)){
        label_5 = "";
      } else{
        label_5 = "music"
      }

      if(!(label_6_.checked)){
        label_6 = "";
      } else{
        label_6 = "movies"
      }

      if(!(label_7_.checked)){
        label_7 = "";
      } else{
        label_7 = "outing"
      }

      if(!(label_8_.checked)){
        label_8 = "";
      } else{
        label_8 = "karaoke"
      }

      if(!(label_9_.checked)){
        label_9 = "";
      } else{
        label_9 = "parties"
      }

      if(!(label_10_.checked)){
        label_10 = "";
      } else{
        label_10 = "swimming"
      }

      if(!(label_11_.checked)){
        label_11 = "";
      } else{
        label_11 = "trips"
      }

      if(!(label_12_.checked)){
        label_12 = "";
      } else{
        label_12 = "shopping"
      }

      const data = { label_1, label_2, label_3, label_4, label_5, label_6, label_7, label_8, label_9, label_10, label_11, label_12 };
      console.log(data)
      try {
        const response = await fetch("http://localhost:5002/submit-interests", {
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
                window.location.href = '#/set-campus'
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