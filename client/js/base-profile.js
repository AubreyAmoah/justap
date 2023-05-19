let generateBaseProfilePage = () => {
    return(
      document.getElementById('dashboard-root').innerHTML = `
        <div id="base-profile-form" class="flex-column-center">
          <form method="POST" action="http://localhost:5002/upload-avatar" enctype="multipart/form-data" class="flex-row" id="profile-img-form">
            <img src="" alt="" class="profile-img-edit" id="profile-pic-edit">
            <input id="profile-img-input" type="file" name="image" class="hidden" onchange="changeProfileImg()"/>
            <div class="flex-column">
              <label class="pencil-label" for="profile-img-input" id="profile-image-label">&#9998;</label>
              <button id="avatar-btn" class='avatar-btn hidden' onclick="setProfilePic()">Save</button>
            </div>

          </form>
          <div class="flex-row">
            <p class="body-text" id="profile-fname-edit"></p>
            <input class="profile-input hidden" onkeypress="displaySaveButton()" onchange="displaySaveButton()" type="text" id="fname-input" />
            <i class="pencil" id="edit-fname" onclick="displayFnameEdit()">&#9998;</i>
            <i class="tick hidden" id="save-fname" onclick="saveFnameEdit()">&#x2714;</i>
            <i class="cross hidden" id="cancel-fname" onclick="cancelFnameEdit()">&#x2716;</i>
  
            <p class="body-text" id="profile-lname-edit"></p>
            <input class="profile-input hidden" onkeypress="displaySaveButton()" onchange="displaySaveButton()" type="text" id="lname-input"/>
            <i class="pencil" id="edit-lname" onclick="displayLnameEdit()">&#9998;</i>
            <i class="tick hidden" id="save-lname" onclick="saveLnameEdit()">&#x2714;</i>
            <i class="cross hidden" id="cancel-lname" onclick="cancelLnameEdit()">&#x2716;</i>
          </div>
          <p class="body-text" id="profile-email-edit"></p>
          <p class="body-text" id="profile-gender-edit"></p>
          <p class="body-text" id="profile-uni-edit"></p>
          <p class="body-text" id="profile-level-edit"></p>
          <p class="body-text" id="profile-dob-edit"></p>
          <div class="flex-row">
            <p class="body-text" id="profile-description-edit"></p>
            <textarea class="profile-input hidden" cols="30" rows="10" onkeypress="displaySaveButton()" onchange="displaySaveButton()" type="text" id="description-input"></textarea>
            <i class="pencil" id="edit-description" onclick="displayDescriptionEdit()">&#9998;</i>
            <i class="tick hidden" id="save-description" onclick="saveDescriptionEdit()">&#x2714;</i>
            <i class="cross hidden" id="cancel-description" onclick="cancelDescriptionEdit()">&#x2716;</i>
          </div>
          <button id="base-profile-save" class='hidden' onclick='saveProfileChanges()'>Save Changes</button>
        </div>
      `
    )
  }


  function changeProfileImg() {
    let image = document.getElementById('profile-pic-edit');
    let imageInput = document.getElementById('profile-img-input');
  
    const [file] = imageInput.files;
  
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
  
      document.getElementById('profile-image-label').classList.add('edited');
      if(document.getElementById('avatar-btn').classList.contains('hidden')){
        document.getElementById('avatar-btn').classList.remove('hidden');
      }
    }
  }
  
  function saveFnameEdit() {
    let input = document.getElementById('fname-input');
    if(input.value !== ''){
      document.getElementById('profile-fname-edit').innerHTML = input.value;
      input.value = '';
      input.classList.add('hidden');
      document.getElementById('save-fname').classList.add('hidden');
      document.getElementById('cancel-fname').classList.add('hidden');
      document.getElementById('edit-fname').classList.remove('hidden');
      document.getElementById('profile-fname-edit').classList.remove('hidden');
      document.getElementById('profile-fname-edit').classList.add('edited');
    }
  }
  
  function saveLnameEdit() {
    let input = document.getElementById('lname-input');
    if(input.value !== ''){
      document.getElementById('profile-lname-edit').innerHTML = input.value;
      input.value = '';
      input.classList.add('hidden');
      document.getElementById('save-lname').classList.add('hidden');
      document.getElementById('cancel-lname').classList.add('hidden');
      document.getElementById('edit-lname').classList.remove('hidden');
      document.getElementById('profile-lname-edit').classList.remove('hidden');
      document.getElementById('profile-lname-edit').classList.add('edited');
    }
  }
  
  function saveDescriptionEdit() {
    let input = document.getElementById('description-input');
    if(input.value !== ''){
      document.getElementById('profile-description-edit').innerHTML = input.value;
      input.value = '';
      input.classList.add('hidden');
      document.getElementById('save-description').classList.add('hidden');
      document.getElementById('cancel-description').classList.add('hidden');
      document.getElementById('edit-description').classList.remove('hidden');
      document.getElementById('profile-description-edit').classList.remove('hidden');
      document.getElementById('profile-description-edit').classList.add('edited');
    }
  }
  
  function cancelFnameEdit() {
    let input = document.getElementById('fname-input');
    input.value = '';
    input.classList.add('hidden');
    document.getElementById('save-fname').classList.add('hidden');
    document.getElementById('cancel-fname').classList.add('hidden');
    document.getElementById('edit-fname').classList.remove('hidden');
    document.getElementById('profile-fname-edit').classList.remove('hidden');
    var btn = document.getElementById('base-profile-save');
    if(!btn.classList.contains('hidden')){
      btn.classList.add('hidden');
    }
  
  }
  
  function cancelLnameEdit() {
    let input = document.getElementById('lname-input');
    input.value = '';
    input.classList.add('hidden');
    document.getElementById('save-lname').classList.add('hidden');
    document.getElementById('cancel-lname').classList.add('hidden');
    document.getElementById('edit-lname').classList.remove('hidden');
    document.getElementById('profile-lname-edit').classList.remove('hidden');
    var btn = document.getElementById('base-profile-save');
    if(!btn.classList.contains('hidden')){
      btn.classList.add('hidden');
    }
  
  }
  
  function cancelDescriptionEdit() {
    let input = document.getElementById('description-input');
    input.value = '';
    input.classList.add('hidden');
    document.getElementById('save-description').classList.add('hidden');
    document.getElementById('cancel-description').classList.add('hidden');
    document.getElementById('edit-description').classList.remove('hidden');
    document.getElementById('profile-description-edit').classList.remove('hidden');
    var btn = document.getElementById('base-profile-save');
    if(!btn.classList.contains('hidden')){
      btn.classList.add('hidden');
    }
  
  }
  function displaySaveButton(){
    var btn = document.getElementById('base-profile-save');
    if(btn.classList.contains('hidden')){
      btn.classList.remove('hidden');
    }
  }
  function displayFnameEdit(){
    let input = document.getElementById('fname-input');
  
    if (input.classList.contains('hidden')){
      input.classList.remove('hidden');
    }
    document.getElementById('profile-fname-edit').classList.add('hidden');
    document.getElementById('edit-fname').classList.add('hidden');
    document.getElementById('save-fname').classList.remove('hidden');
    document.getElementById('cancel-fname').classList.remove('hidden');
  }
  
  function displayLnameEdit(){
      let input = document.getElementById('lname-input');
  
      if (input.classList.contains('hidden')){
        input.classList.remove('hidden');
      }
      document.getElementById('profile-lname-edit').classList.add('hidden');
      document.getElementById('edit-lname').classList.add('hidden');
      document.getElementById('save-lname').classList.remove('hidden');
      document.getElementById('cancel-lname').classList.remove('hidden');
  }
  
  function displayDescriptionEdit(){
    let input = document.getElementById('description-input');
  
    if (input.classList.contains('hidden')){
      input.classList.remove('hidden');
    }
    document.getElementById('profile-description-edit').classList.add('hidden');
    document.getElementById('edit-description').classList.add('hidden');
    document.getElementById('save-description').classList.remove('hidden');
    document.getElementById('cancel-description').classList.remove('hidden');
  }

  let saveProfileChanges = async() => {
    const fname = document.getElementById('profile-fname-edit');
    const lname = document.getElementById('profile-lname-edit');
    const desc = document.getElementById('profile-description-edit');
    const responseDiv = document.getElementById("response");
  
    if (fname.classList.contains('edited') || lname.classList.contains('edited')) {
        const headers = new Headers({
          "x-access-token": `${token}`,
          "Content-Type": "application/json"
        });
  
        const first_name = fname.innerHTML;
        const last_name = lname.innerHTML;
        const data = { first_name, last_name };
  
        try {
          const response = await fetch("http://localhost:5002/update-profile", {
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
  
      if (desc.classList.contains('edited')) {
        const headers = new Headers({
          "x-access-token": `${token}`,
          "Content-Type": "application/json"
        });
  
        const description = desc.innerHTML;
        const data = { description };
  
        try {
          const response = await fetch("http://localhost:5002/update-description", {
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
  }

  let setProfilePic = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      // "Content-Type": "application/json"
    });

    const form = document.getElementById('profile-img-form');

    form.addEventListener("submit", (event) => {
      event.preventDefault();
    
      const imageFile = document.querySelector("input[name=image]").files[0];
    
      const formData = new FormData();
      formData.append("image", imageFile);
    
      const data = { formData };

      fetch('http://localhost:5002/upload-avatar', {
        method: 'POST',
        file: data,
        headers: headers
      })
      .then(response => {
        if (response.ok) {
          console.log('Image uploaded successfully.');
        } else {
          console.error('Error uploading image.');
        }
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
    });
  }
  
  let profilePicEdit = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    const profilePicEdit = document.getElementById("profile-pic-edit");
    
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
        profilePicEdit.src = `${user.image}`;
      })
      .catch(error => {
        console.log(error);
      });
  
  }


  let getFname = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const fname = document.getElementById("profile-fname-edit");
    
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
        fname.innerHTML = `${user.fname}`;
      })
      .catch(error => {
        console.log(error);
        fname.innerHTML = "Error getting name";
      });
  
  }
  
  let getLname = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const lname = document.getElementById("profile-lname-edit");
    
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
        lname.innerHTML = `${user.lname}`;
      })
      .catch(error => {
        console.log(error);
        lname.innerHTML = "Error getting name";
      });
  
  }
  
  let getEmail = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const email = document.getElementById("profile-email-edit");
    
    fetch("http://localhost:5002/get-email", {
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
        email.innerHTML = `${user.email}`;
      })
      .catch(error => {
        console.log(error);
        email.innerHTML = "Error getting name";
      });
  
  }
  
  let getUni = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const uni = document.getElementById("profile-uni-edit");
    
    fetch("http://localhost:5002/get-uni", {
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
        uni.innerHTML = `${user.university}`;
      })
      .catch(error => {
        console.log(error);
        uni.innerHTML = "Error getting name";
      });
  
  }
  
  let getGender = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const gender = document.getElementById("profile-gender-edit");
    
    fetch("http://localhost:5002/get-gender", {
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error getting gender");
        }
        return response.json();
      })
      .then(user => {
        gender.innerHTML = `${user.gender}`;
      })
      .catch(error => {
        console.log(error);
        gender.innerHTML = "Error getting gender";
      });
  
  }
  
  let getLevel = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const level = document.getElementById("profile-level-edit");
    
    fetch("http://localhost:5002/get-level", {
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
        level.innerHTML = `${user.level}`;
      })
      .catch(error => {
        console.log(error);
        level.innerHTML = "Error getting name";
      });
  
  }
  
  let getDob = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const dob = document.getElementById("profile-dob-edit");
    
    fetch("http://localhost:5002/get-dob", {
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error getting dob");
        }
        return response.json();
      })
      .then(user => {
        dob.innerHTML = `${user.dob}`;
      })
      .catch(error => {
        console.log(error);
        dob.innerHTML = "Error getting dob";
      });
  
  }
  
  let getDescription = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    });
    //console.log(headers);
    
    const dob = document.getElementById("profile-description-edit");
    
    fetch("http://localhost:5002/get-description", {
      method: "GET",
      headers: headers
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Error getting description");
        }
        return response.json();
      })
      .then(user => {
        dob.innerHTML = `${user.description}`;
      })
      .catch(error => {
        console.log(error);
        dob.innerHTML = "Error getting description";
      });
  
  }