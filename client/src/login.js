import './login.css';

function Login(){
    return (
        <div className="loginBody">
            <div className="loginBox">
                <div className="text">LOGIN</div>
                <form id="loginData">
                    <input type="text" id="username" name="username" placeholder="Enter username"></input>
                    <input type="text" id="passwrd" placeholder="Enter password"></input>
                    <input type="submit" id="submit" value="Login"/>
                </form>
            </div>
        </div>
    )
};

export {Login};