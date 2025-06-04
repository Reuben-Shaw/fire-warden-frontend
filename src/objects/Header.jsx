import './Header.css';

function Header() {
  return (
    <header className="header">
      <img
        src="/images/logo-white.svg"
        alt="Welcome illustration"
        className="header-logo"
      />
      <nav className="header-nav">
        <a href="/">Logout</a>
      </nav>
    </header>
  );
}

export default Header;