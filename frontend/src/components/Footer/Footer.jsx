import { assets } from "../../assets/assets";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam
            tenetur ducimus facilis harum quo hic, repellendus nemo odit
            reprehenderit iste a, id nisi ex facere doloremque modi asperiores
            labore officia.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt=""></img>
            <img src={assets.twitter_icon} alt=""></img>
            <img src={assets.linkedin_icon} alt=""></img>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+251916163516</li>
            <li>kgemechu908@gmail.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        Copyright @ kaleab.com - All Right Reserved
      </p>
    </div>
  );
}

export default Footer;
