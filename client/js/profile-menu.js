let generateProfileMenu = () => {
    return(
      document.getElementById('side-root').innerHTML = `
        <ul>
          <li><a href='#/dashboard/profile-menu/base-profile'>Base Profile</a></li>
          <li><a href='#/dashboard/profile-menu/image-update'>Images</a></li>
          <li><a href='#/dashboard/profile-menu/interests-update'>Interests</a></li>
          <li><a href='#/dashboard/profile-menu/password-update'>Change Password</a></li>
        </ul>
      `
    )
}

let profile = () => {
    window.location.href = '#/dashboard/profile-menu/base-profile';
}