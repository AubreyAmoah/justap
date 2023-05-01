let generateInterestUpdatePage = () => {
    return(
      document.getElementById('dashboard-root').innerHTML = `
        <div id="interest-container" class="flex-column-center">
          <div class="flow-wrap">
           <div id="interest-group">
            <input class="interest-update-input" type="checkbox" name="label-1-interests" id="label-1-interests" value="reading">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-1-interests">reading</label>
  
            <input class="interest-update-input" type="checkbox" name="label-2-interests" id="label-2-interests" value="sports">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-2-interests">sports</label>
  
            <input class="interest-update-input" type="checkbox" name="label-3-interests" id="label-3-interests" value="indoor">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-3-interests">indoor</label>
  
            <input class="interest-update-input" type="checkbox" name="label-4-interests" id="label-4-interests" value="gym">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-4-interests">gym</label>
  
            <input class="interest-update-input" type="checkbox" name="label-5-interests" id="label-5-interests" value="music">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-5-interests">music</label>
  
            <input class="interest-update-input" type="checkbox" name="label-6-interests" id="label-6-interests" value="movies">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-6-interests">movies</label>
  
            <input class="interest-update-input" type="checkbox" name="label-7-interests" id="label-7-interests" value="outing">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-7-interests">outing</label>
  
            <input class="interest-update-input" type="checkbox" name="label-8-interests" id="label-8-interests" value="karaoke">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-8-interests">karaoke</label>
  
            <input class="interest-update-input" type="checkbox" name="label-9-interests" id="label-9-interests" value="parties">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-9-interests">parties</label>
  
            <input class="interest-update-input" type="checkbox" name="label-10-interests" id="label-10-interests" value="swimming">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-10-interests">swimming</label>
  
            <input class="interest-update-input" type="checkbox" name="label-11-interests" id="label-11-interests" value="trips">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-11-interests">trips</label>
  
            <input class="interest-update-input" type="checkbox" name="label-12-interests" id="label-12-interests" value="shopping">
            <label class="interest-update-label" onclick="displayInterestButton(),addEditedToInterests()" for="label-12-interests">shopping</label>
            </div>
  
            <div id="campus-group">
              <input class="interest-update-input" type="checkbox" name="label-1-campus" id="label-1-campus" value="knust">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToCampus()"  for="label-1-campus">knust</label>
  
              <input class="interest-update-input" type="checkbox" name="label-2-campus" id="label-2-campus" value="ug">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToCampus()"  for="label-2-campus">legon</label>
  
              <input class="interest-update-input" type="checkbox" name="label-3-campus" id="label-3-campus" value="ucc">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToCampus()"  for="label-3-campus">ucc</label>
  
              <input class="interest-update-input" type="checkbox" name="label-4-campus" id="label-4-campus" value="uew">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToCampus()"  for="label-4-campus">uew</label>
            </div>
  
            <div id="gender-group">
              <input class="interest-update-input" type="checkbox" name="label-1-gender" id="label-1-gender" value="male">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToGender()"  for="label-1-gender">Male</label>
  
              <input class="interest-update-input" type="checkbox" name="label-2-gender" id="label-2-gender" value="female">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToGender()"  for="label-2-gender">Female</label>
            </div>
  
            <div id="level-group">
  
              <input class="interest-update-input" type="checkbox" name="label-1-level" id="label-1-level" value="100">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToLevel()" for="label-1-level">Level 100</label>
  
              <input class="interest-update-input" type="checkbox" name="label-2-level" id="label-2-level" value="200">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToLevel()" for="label-2-level">Level 200</label>
  
              <input class="interest-update-input" type="checkbox" name="label-3-level" id="label-3-level" value="300">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToLevel()" for="label-3-level">Level 300</label>
  
              <input class="interest-update-input" type="checkbox" name="label-4-level" id="label-4-level" value="400">
              <label class="interest-update-label" onclick="displayInterestButton(),addEditedToLevel()" for="label-4-level">Level 400</label>
            </div>
  
          </div>
          <div class="flow-wrap">
              <button class="hidden" id="interest-button" onclick="saveAllInterestUpdates()">Save Changes</button>
              <button class="hidden" id="interest-cancel" onclick="generateInterestUpdatePage(),getUserInterests();">Cancel Changes</button
          </div>
        </div>
      `
    )
  }

  let cancelInterestChanges = () => {
    let interests = document.getElementById('interest-group');
    let campus = document.getElementById('campus-group');
    let gender = document.getElementById('gender-group');
    let level = document.getElementById('level-group');
  
    if(interests.classList.contains('edited')){
      interests.classList.remove('edited');
    }
  
    if(campus.classList.contains('edited')){
      campus.classList.remove('edited');
    }
  
    if(gender.classList.contains('edited')){
      gender.classList.remove('edited');
    }
  
    if(level.classList.contains('edited')){
      level.classList.remove('edited');
    }
  }
  
  let addEditedToLevel = () => {
    let level = document.getElementById('level-group');
    level.classList.add('edited');
  }
  
  let addEditedToGender = () => {
    let gender = document.getElementById('gender-group');
    gender.classList.add('edited');
  }
  
  let addEditedToCampus = () => {
    let campus = document.getElementById('campus-group');
    campus.classList.add('edited');
  }
  
  let addEditedToInterests = () => {
    let interests = document.getElementById('interest-group');
    interests.classList.add('edited');
  }
  
  let saveAllInterestUpdates = () => {
    let interests = document.getElementById('interest-group');
    let campus = document.getElementById('campus-group');
    let gender = document.getElementById('gender-group');
    let level = document.getElementById('level-group');
  
    if(interests.classList.contains('edited')){
      saveInterestUpdateChanges();
    }
  
    if(campus.classList.contains('edited')){
      saveCampusUdateChanges();
    }
  
    if(gender.classList.contains('edited')){
      saveGenderUpdateChanges();
    }
  
    if(level.classList.contains('edited')){
      saveLevelUpdateChanges();
    }
  
    if(interests.classList.contains('edited')){
      interests.classList.remove('edited');
    }
  
    if(campus.classList.contains('edited')){
      campus.classList.remove('edited');
    }
  
    if(gender.classList.contains('edited')){
      gender.classList.remove('edited');
    }
  
    if(level.classList.contains('edited')){
      level.classList.remove('edited');
    }
  
    window.location.href='#/dashboard/profile-menu/interests-update';
    window.location.reload();
  }
  
  let saveGenderUpdateChanges = async () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const responseDiv = document.getElementById("response");
  
    let label_1_ = document.getElementById("label-1-gender");
    let label_2_ = document.getElementById("label-2-gender");
  
    let label_1 = label_1_.value;
    let label_2 = label_2_.value;
  
    if(!(label_1_.checked)){
      label_1 = "";
    }else{
      label_1 = "male"
    }
  
    if(!(label_2_.checked)){
      label_2 = "";
    } else{
      label_2 = "female"
    }
  
    const data = { label_1, label_2 };
    console.log(data)
    try {
      const response = await fetch("http://localhost:5002/submit-gender-preference", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const user = await response.json();
      if (response.ok) {
          if(responseDiv.classList.contains('hidden')) {
              responseDiv.classList.remove('hidden')
          }
          responseDiv.innerHTML = `changes for gender successfully made `;
          setTimeout(() => {
              responseDiv.classList.add('hidden');
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
  
  let saveLevelUpdateChanges = async () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const responseDiv = document.getElementById("response");
  
    let label_1_ = document.getElementById("label-1-level");
    let label_2_ = document.getElementById("label-2-level");
    let label_3_ = document.getElementById("label-3-level");
    let label_4_ = document.getElementById("label-4-level");
  
    let label_1 = label_1_.value;
    let label_2 = label_2_.value;
    let label_3 = label_3_.value;
    let label_4 = label_4_.value;
  
    if(!(label_1_.checked)){
      label_1 = "";
    }else{
      label_1 = "100"
    }
  
    if(!(label_2_.checked)){
      label_2 = "";
    } else{
      label_2 = "200"
    }
  
    if(!(label_3_.checked)){
      label_3 = "";
    } else{
      label_3 = "300"
    }
  
    if(!(label_4_.checked)){
      label_4 = "";
    } else{
      label_4 = "400"
    }
  
    const data = { label_1, label_2, label_3, label_4 };
    console.log(data)
    try {
      const response = await fetch("http://localhost:5002/submit-level-preference", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const user = await response.json();
      if (response.ok) {
          if(responseDiv.classList.contains('hidden')) {
              responseDiv.classList.remove('hidden')
          }
          responseDiv.innerHTML = `changes for level succesfully made`;
          setTimeout(() => {
              responseDiv.classList.add('hidden');
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
  
  let saveCampusUdateChanges = async () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const responseDiv = document.getElementById("response");
  
    let label_1_ = document.getElementById("label-1-campus");
    let label_2_ = document.getElementById("label-2-campus");
    let label_3_ = document.getElementById("label-3-campus");
    let label_4_ = document.getElementById("label-4-campus");
  
    let label_1 = label_1_.value;
    let label_2 = label_2_.value;
    let label_3 = label_3_.value;
    let label_4 = label_4_.value;
  
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
          responseDiv.innerHTML = `changes for campus made successfully`;
          setTimeout(() => {
              responseDiv.classList.add('hidden');
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
  
  let saveInterestUpdateChanges = async () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const responseDiv = document.getElementById("response");
  
    let label_1_ = document.getElementById("label-1-interests");
    let label_2_ = document.getElementById("label-2-interests");
    let label_3_ = document.getElementById("label-3-interests");
    let label_4_ = document.getElementById("label-4-interests");
    let label_5_ = document.getElementById("label-5-interests");
    let label_6_ = document.getElementById("label-6-interests");
    let label_7_ = document.getElementById("label-7-interests");
    let label_8_ = document.getElementById("label-8-interests");
    let label_9_ = document.getElementById("label-9-interests");
    let label_10_ = document.getElementById("label-10-interests");
    let label_11_ = document.getElementById("label-11-interests");
    let label_12_ = document.getElementById("label-12-interests");
  
    let label_1 = label_1_.value;
    let label_2 = label_2_.value;
    let label_3 = label_3_.value;
    let label_4 = label_4_.value;
    let label_5 = label_5_.value;
    let label_6 = label_6_.value;
    let label_7 = label_7_.value;
    let label_8 = label_8_.value;
    let label_9 = label_9_.value;
    let label_10 = label_10_.value;
    let label_11 = label_11_.value;
    let label_12 = label_12_.value;
  
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
          responseDiv.innerHTML = `changes for interests made succesfully`;
          setTimeout(() => {
              responseDiv.classList.add('hidden');
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
  
  function displayInterestButton() {
    let btn = document.getElementById('interest-button');
    let btn1 = document.getElementById('interest-cancel');
    if(btn.classList.contains('hidden')){
      btn.classList.remove('hidden');
    }
  
    if(btn1.classList.contains('hidden')){
      btn1.classList.remove('hidden');
    }
  }
  
  let getUserInterests = async () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    })
  
    let boxes = document.querySelectorAll('input[type="checkbox"]')
  
    fetch("http://localhost:5002/get-user-interests", {
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
        console.log(user.campus[0]);
        // for(var i = 0; i < boxes.length; i++){
  
        // }
        for (const i in boxes) {
          for(const j in user.campus){
            if(boxes[i].value === user.campus[j]){
              boxes[i].checked = true;
              console.log(boxes[i].value);
            }
          }
  
          for(const k in user.gender_interest){
            if(boxes[i].value === user.gender_interest[k]){
              boxes[i].checked = true;
              console.log(boxes[i].value);
            }
          }
  
          for(const l in user.level_interest){
            if(boxes[i].value === user.level_interest[l]){
              boxes[i].checked = true;
              console.log(boxes[i].value);
            }
          }
  
          for(const m in user.interest){
            if(boxes[i].value === user.interest[m]){
              boxes[i].checked = true;
              console.log(boxes[i].value);
            }
          }
        }
      })
      .catch(error => {
        console.log(error);
      });
  }