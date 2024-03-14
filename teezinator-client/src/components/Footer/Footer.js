function Footer() {
  // Get the current year
  const year = new Date().getFullYear();

  return (
    <div className="footer-container">
      <p className="footer-copyright">
        © {year} ronanski11. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
