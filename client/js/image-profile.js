let generateImageUpdatePage = () => {
    return(
      document.getElementById('dashboard-root').innerHTML = `
        <div id="image-update-form" class="flex-row">
            <label for="image-1"><img class="image-box" src="" alt="" id="previewImage-1"></label>
            <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-1" id="image-1" class="hidden">
  
            <label for="image-2"><img class="image-box" src="" alt="" id="previewImage-2"></label>
            <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-2" id="image-2" class="hidden">
  
            <label for="image-3"><img class="image-box" src="" alt="" id="previewImage-3"></label>
            <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-3" id="image-3" class="hidden">
  
  
            <label for="image-4"><img class="image-box" src="" alt="" id="previewImage-4"></label>
            <input type="file" accept=".jpg, .png, .gif, .pdf" name="image-4" id="image-4" class="hidden">
        </div>
        <button class="images-save-button" id="images-save-button">Save Changes</button>
      `
    )
}

let getImages = () =>{
    const headers = new Headers({
      "x-access-token": `${token}`,
      "Content-Type": "application/json"
    })
  
    let image1 = document.getElementById('previewImage-1');
    let image2 = document.getElementById('previewImage-2');
    let image3 = document.getElementById('previewImage-3');
    let image4 = document.getElementById('previewImage-4');
  
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
        image1.src = user.images[0];
        image2.src = user.images[1];
        image3.src = user.images[2];
        image4.src = user.images[3];
      })
      .catch(error => {
        console.log(error);
      });
  }