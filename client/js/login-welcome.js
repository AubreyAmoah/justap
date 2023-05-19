let generateLoginWelcomePage = () => {
    link.rel = 'stylesheet';
    link.href = './css/welcome.css';
    if(document.head.contains(link)) {
        document.head.removeChild(link);
        document.head.appendChild(link);
    } else {
        document.head.appendChild(link);
    }
    return(
        root.innerHTML = `
        <div class="container">
            <div class="welcome-box">
                <div class="circle"></div>
                <div class="header">
                    <i class="heart">&hearts;</i>
                    <img src="" alt="JustTap" class="logo">
                </div>

                <i class="hearts one">&#10084;</i>
                <i class="hearts two">&#10084;</i>
                <i class="hearts three">&#10084;</i>
                <i class="hearts four">&#10084;</i>
                <i class="hearts five">&#10084;</i>
                <i class="hearts six">&#10084;</i>
                <i class="hearts seven">&#10084;</i>
                <i class="hearts eight">&#10084;</i>
                <i class="hearts nine">&#10084;</i>
            
                <img src="./images/blaclkk.jpg" alt="" class="images img-1">
                <img src="./images/pexels-daniel-okafor-5058080.jpg" alt="" class="images img-2">
                <img src="./images/pexels-lucas-da-miranda-1967902.jpg" alt="" class="images img-3">
                <img src="./images/pexels-breston-kenya-4156467.jpg" alt="" class="images img-4">
                <img src="./images/pexels-dellon-thomas-3866527.jpg" alt="" class="images img-5">
                <img src="./images/pexels-nappy-936025.jpg" alt="" class="images img-6">
                <img src="./images/pexels-anna-shvets-3746254.jpg" alt="" class="images img-7">
                <img src="./images/cropped.png" alt="" class="long-img">
            
                <div class="text-box">
                    <h1>The Campus</h1>
                    <h2 class="above">is where love lives</h2>
                    <p>Hugs and kisses. Songs and dance .
                    Some little things brings the best in
                    you. its time to find the one for you, from the campus you love.</p>
                    <h2 class="below">Welcome...</h2>
                </div>
            </div>
        </div>
        `
    )
}

function openDashboard(){
    setTimeout(() => {
        window.location.href="#/dashboard";
        window.location.reload();
    }, 900);
}