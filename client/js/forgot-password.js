let generateForgotPasswordPage = () => {
    link.rel = 'stylesheet';
    link.href = './css/forgot.css';
    if(document.head.contains(link)) {
        document.head.removeChild(link);
        document.head.appendChild(link);
    } else {
        document.head.appendChild(link);
    }
    return(
        root.innerHTML = `
        <div id="response" class="hidden"></div>
        <form action="">
        <h1>Enter your email for a reset link</h1>
        <label for="email">Email</label>
        <input type="email" name="email" id="email">

        <button class="form-btn">Send Reset Link</button>
    </form>
        `
    )
}