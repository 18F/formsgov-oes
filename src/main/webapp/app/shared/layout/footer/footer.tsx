import './footer.scss';
import React from 'react';
const Footer = () => (
  <footer>
    <hr />
    <div className="grid-row grid-gap">
      <div className="tablet:grid-col-12 child">
        <a href="https://oes.gsa.gov/" target="_blank" rel="noopener noreferrer" className="usa-link">
          oes.gsa.gov
        </a>
      </div>
    </div>
  </footer>
);
export default Footer;
