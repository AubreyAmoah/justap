let root = document.getElementById('root');
let link = document.createElement('link');


const fileInput1 = document.getElementById("file-input1");
const previewImage1 = document.getElementById("preview-image1");

const fileInput2 = document.getElementById("file-input2");
const previewImage2 = document.getElementById("preview-image2");

const fileInput3 = document.getElementById("file-input3");
const previewImage3 = document.getElementById("preview-image3");

const fileInput4 = document.getElementById("file-input4");
const previewImage4 = document.getElementById("preview-image4");

const token = localStorage.getItem("token");

window.addEventListener('hashchange', () => {
    switch (window.location.hash) {
        case '#/':
            generateHomePage();
            break;
        case '#/signUp':
            generateRegisterPage();
            break;
        case '#/welcome':
            generateWelcomePage();
            break;
        case '#/login-welcome':
            generateLoginWelcomePage();
            setTimeout(() => {
                openDashboard();
            }, 200);
            break;
        case '#/forgot-password':
            generateForgotPasswordPage();
            break;
        case '#/set-interests':
            generateInterestSetupPage();
            break;
        case '#/set-level':
            generateLevelSetupPage();
            break;
        case '#/set-gender':
            generateGenderInterestPage();
            break;
        case '#/set-campus':
            generateCampusSetupPage();
            break;
        case '#/set-description':
            generateDescriptionSetupPage();
            break;
        case '#/set-images':
            generateImagesSetupPage();
            loadimages();
            break;
        case '#/dashboard':
            generateDashBoardPage();
            getName();
            profilePic();
            generateUserCarousel();
            activateCarousel();
            getUsers();
            break;
        case '#/dashboard/profile-menu':
            generateDashBoardPage();
            getName();
            profilePic();
            generateProfileMenu();
            break;
        case '#/dashboard/profile-menu/base-profile':
            generateDashBoardPage();
            getName();
            profilePic();
            generateProfileMenu();
            generateBaseProfilePage();
            profilePicEdit();
            getFname();
            getLname();
            getEmail();
            getUni();
            getLevel();
            getDob();
            getGender();
            getDescription();
            break;
        case '#/dashboard/profile-menu/image-update':
            generateDashBoardPage();
            getName();
            profilePic();
            generateProfileMenu();
            generateImageUpdatePage();
            getImages();
            break;
        case '#/dashboard/profile-menu/interests-update':
            generateDashBoardPage();
            getName();
            profilePic();
            generateProfileMenu();
            generateInterestUpdatePage();
            getUserInterests();
            break;
        case '#/dashboard/profile-menu/password-update':
            generateDashBoardPage();
            getName();
            profilePic();
            generateProfileMenu();
            generatePasswordUpdatePage();
            break;
        default:
            generateHomePage();
    }
  });
  
  // Trigger a hashchange event to handle the initial route
  window.dispatchEvent(new HashChangeEvent('hashchange'));