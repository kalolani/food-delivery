import "./Footer.css";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-logo-box">
        <img src="dila-uni.png" alt="dilla-uni-logo" className="footer-logo" />
      </div>
      <div className="footer-content-container">
        <div className="footer-nav-nav">
          <ul className="footer-nav">
            <li className="footer-item">
              {" "}
              <a href="#" className="footer-link">
                COMPANY
              </a>
            </li>
            <li className="footer-item">
              {" "}
              <a href="#" className="footer-link">
                CONTACT US
              </a>
            </li>
            <li className="footer-item">
              {" "}
              <a href="#" className="footer-link">
                CARRERS
              </a>
            </li>
            <li className="footer-item">
              {" "}
              <a href="#" className="footer-link">
                PRIVACY POLICY
              </a>
            </li>
            <li className="footer-item">
              {" "}
              <a href="#" className="footer-link">
                TERMS
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-copyright">
          <p className="footer-text">
           Copyright © by Ayana Basha. You are 100%
            allowed to use this webpage for both personal and commercial use,
            but NOT to claim it as your own design.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
