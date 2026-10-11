import './Footer.css';

function Footer({ storeName, email, phone }) {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div>
          <h2>{storeName}</h2>
          <p>Your destination for quality gaming gear.</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
        </div>
      </div>

      <p className="copyright">
        © 2026 {storeName}. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;