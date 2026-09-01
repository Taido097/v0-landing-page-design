const RESIDENTIAL_HREF = '/client-demos/client-8889/residential';
const CONTACT = 'mailto:info@nguyen-ae.com';

export default function Navbar() {
  return (
    <nav className="nrd-nav">
      <div className="nrd-shell nrd-nav-in">
        <div className="nrd-nav-left">
          <a href={RESIDENTIAL_HREF} className="nrd-nav-link">Design Process</a>
          <a href={RESIDENTIAL_HREF} className="nrd-nav-link">Projects</a>
          <a href={RESIDENTIAL_HREF} className="nrd-nav-link">Services</a>
        </div>
        <a href={RESIDENTIAL_HREF} className="nrd-brand">NGUYEN Architecture &amp; Engineering</a>
        <div className="nrd-nav-right">
          <a href={CONTACT} className="nrd-contact">Contact Us</a>
        </div>
      </div>
    </nav>
  );
}
