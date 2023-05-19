let generateImagesSetupPage = () => {
    link.rel = 'stylesheet';
    link.href = './css/image.css';

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
                <h1>Lets see what you really look like</h1>
            </div>
            <h2>Upload four images</h2>
            <p>Once you click on next you cannot come back to make changes so make sure you go through your selections before you click on next</p>
            <form id="image-form">
                <div class="grp">
                    <label for="image-1"><img class="image-box" src="" alt="" id="previewImage-1"></label>
                    <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-1" id="image-1">
                </div>
                <div class="grp">
                    <label for="image-2"><img class="image-box" src="" alt="" id="previewImage-2"></label>
                    <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-2" id="image-2">
                </div>
                <div class="grp">
                    <label for="image-3"><img class="image-box" src="" alt="" id="previewImage-3"></label>
                    <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-3" id="image-3">
                </div>
                <div class="grp">
                    <label for="image-4"><img class="image-box" src="" alt="" id="previewImage-4"></label>
                    <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-4" id="image-4">
                </div>
                <button class="next" onclick="toDashboard()">next</button>
            </form>

        </div>
    </div>
        `
    )
}

let loadimages = () => {
    document.getElementById('image-1').addEventListener("change", function() {
      const file = this.files[0];
      const reader = new FileReader();
    
      reader.addEventListener("load", function() {
        document.getElementById('previewImage-1').src = reader.result;
      });
    
      if (file) {
        reader.readAsDataURL(file);
      }
  });
  
  document.getElementById('image-2').addEventListener("change", function() {
      const file = this.files[0];
      const reader = new FileReader();
    
      reader.addEventListener("load", function() {
        document.getElementById('previewImage-2').src = reader.result;
      });
    
      if (file) {
        reader.readAsDataURL(file);
      }
  });
  
  document.getElementById('image-3').addEventListener("change", function() {
      const file = this.files[0];
      const reader = new FileReader();
    
      reader.addEventListener("load", function() {
        document.getElementById('previewImage-3').src = reader.result;
      });
    
      if (file) {
        reader.readAsDataURL(file);
      }
  });
  
  document.getElementById('image-4').addEventListener("change", function() {
      const file = this.files[0];
      const reader = new FileReader();
    
      reader.addEventListener("load", function() {
        document.getElementById('previewImage-4').src = reader.result;
      });
    
      if (file) {
        reader.readAsDataURL(file);
      }
  });
}

let toDashboard = () => {
  window.location.href = '#/dashboard';
  window.location.reload();
}

  let submitImages = () => {
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json",
      'enctype': 'multipart/form-data'
    });
    const form = document.getElementById("image-form");
    const responseDiv = document.getElementById("response");
  
    form.addEventListener("submit", async (event) => {
  
      event.preventDefault();

      // let image1 = document.getElementById("image-1").files[0];
      // let image2 = document.getElementById("image-2").files[0];
      // let image3 = document.getElementById("image-3").files[0];
      // let image4 = document.getElementById("image-4").files[0];

      let image1 = document.getElementById('previewImage-1').src;
      let image2 = document.getElementById('previewImage-2').src;
      let image3 = document.getElementById('previewImage-3').src;
      let image4 = document.getElementById('previewImage-4').src;

      // const formData = new FormData();
      // formData.append('image1', image1);
      // formData.append('image2', image2);
      // formData.append('image3', image3);
      // formData.append('image4', image4);

      // console.log(formData)
      const data = { image1, image2, image3, image4};
      console.log(data)
  
      try {
        const response = await fetch("http://localhost:5002/upload-images", {
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
                window.location.href = '#/dashboard'
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
  
  