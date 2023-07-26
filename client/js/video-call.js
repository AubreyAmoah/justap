let generateVideoList = () => {
    return(
        document.getElementById('side-root').innerHTML = `
        <ul id="video-list"></ul>
        `
    )
}

let generateVideoCallPage = () => {
    return(
      document.getElementById('dashboard-root').innerHTML = `
        <div class="video">
                <video class="large-video" id="local-video" autoplay muted></video>
                <video id="remote-video" autoplay></video>
                <button id="hangup-btn" class="hangup hidden">Hang up</button>
        </div>
      `
    )
}

let getUserStream = () => {
    let localVideo = document.getElementById("local-video");
    let remoteVideo = document.getElementById("remote-video");
    let mediaDevices = navigator.mediaDevices;
    //Video call
    // document.addEventListener("DOMContentLoaded", () => {


    // });

    localVideo.muted = true;
            // Accessing the user camera and video.
        mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {

                // Changing the source of video to current stream.
                localVideo.srcObject = stream;
                localVideo.addEventListener("loadedmetadata", () => {
                    localVideo.play();
                });
            })
            .catch(alert);
}

let GetVideoList = async () => {
    const headers = new Headers({
        "x-access-token": `${token}`,
        "Content-Type": "application/json",
      });
      const list = document.getElementById('video-list')
    try {
        const response = await fetch("http://localhost:5002/video-list", {
        method: "POST",
        headers: headers,
        });

        const user = await response.json();
        if (response.ok) {
            console.log(user);
            for(let i=0; i < user.length; i++){
                let newList = document.createElement('li');
                newList.innerHTML = `${user[i].first_name} ${user[i].last_name}`; 
                list.appendChild(newList);
            }
        } else {
            
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