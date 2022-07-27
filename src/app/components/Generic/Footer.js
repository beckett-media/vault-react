import React from 'react';
import { Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.scss';

const Footer = () => {
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
              <div xl={4} className='footer_link-wrapper'>
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  {/* to='/terms' */}
                  <Link to='#'>
                    <div className='footer_link'>Terms of Service</div>
                  </Link>
                </OverlayTrigger>
              </div>
              <div xl={3} className='footer_link-wrapper'>
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  {/* to='/privacy' */}
                  <Link to='#'>
                    <div className='footer_link'>Privacy Policy</div>
                  </Link>
                </OverlayTrigger>
              </div>
              <div xl={2} className='footer_link-wrapper'>
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
                >
                  {/* to='/faq' */}
                  <Link to='#'>
                    <div className='footer_link'>FAQ</div>
                  </Link>
                </OverlayTrigger>
              </div>
              <div xl={2} className='footer_link-wrapper'>
                <OverlayTrigger
                  delay={{ hide: 450, show: 300 }}
                  overlay={(props) => <Tooltip {...props}>Coming Soon!</Tooltip>}
                  placement='bottom'
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
