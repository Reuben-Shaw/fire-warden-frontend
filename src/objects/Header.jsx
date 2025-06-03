import './Header.css';

function Header() {
    return (
        <header className="hopbar">
            <img
                src="/images/logo-black.svg"
                alt="Welcome illustration"
                className="header-logo"
            />
            <nav className="hopbar-nav">
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
            </nav>
        </header>
    );
}

export default Header;