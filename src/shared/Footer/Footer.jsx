import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer-main">
      <footer>
        {/* <!--The main area of the footer --> */}
        <div class="footer-content">
          <h3>Place of Kindness</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            nobis iste nisi, necessitatibus architecto maxime temporibus omnis
            deleniti ut adipisci, ipsa placeat qui natus.
          </p>
        </div>

        <div class="footer-bottom">
          <p>
            Design By - <span>Hamza</span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
