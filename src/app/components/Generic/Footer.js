import React from 'react';
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = ({ setShowFooterModal }) => {
  return (
    <footer className='footer_component'>
      <div className='page-padding'>
        <div className='container-large'>
          <div className='footer_layout'>
            <div className='footer_logo-wrapper'>
              <Link to='/'>
                <img src={require('../../assets/beta-logo.png')} alt='Beckett logo' className='footer_logo' />
              </Link>
            </div>
            <div className='footer_links-wrapper'>
              <div className='footer_link-wrapper' onClick={() => setShowFooterModal('terms')}>
                {/* to='/privacy' */}
                <div className='footer_link-div'>
                  <div className='footer_link'>Terms of Service</div>
                </div>
              </div>
              <div className='footer_link-wrapper' onClick={() => setShowFooterModal('privacy')}>
                {/* to='/privacy' */}
                <div className='footer_link-div'>
                  <div className='footer_link'>Privacy Policy</div>
                </div>
              </div>
              <div className='footer_link-wrapper' onClick={() => setShowFooterModal('faq')}>
                {/* to='/privacy' */}
                <div className='footer_link-div'>
                  <div className='footer_link'>FAQ</div>
                </div>
              </div>
              <div className='footer_link-wrapper'>
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='top'
                >
                  {/* to='/support' */}
                  <Link to='#'>
                    <div className='footer_link'>Support</div>
                  </Link>
                </OverlayTrigger>
              </div>
            </div>
            {/** TODO: Verify this should be 2021 */}
            <div className='footer_end'>© 2022 Beckett Collectibles, LLC</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
