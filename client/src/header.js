import './header.css';

function Header() {
    return (
        <div className="banner">
            <h1 className="bannerName">TrashDivers</h1>
            <div>
                <ul className="links">
                    <li><a>Home</a></li>
                    <li><a>Map</a></li>
                    <li><a>Login/Signup</a></li>
                </ul>
            </div>
        </div>
    )
}

export{Header};