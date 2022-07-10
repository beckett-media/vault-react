import React from 'react';
import './Landing.scss';
import { Button } from 'react-bootstrap';

const Landing = () => {
  document.body.classList.add('landing-container');
  return (
    <div className='page-wrapper landing-page-wrapper'>
      <div className='section_landing-hero'>
        <div className='landing-hero_component'>
          <div className='landing-hero_image-wrapper'>
            <img src='' alt='' className='landing-image' />
          </div>
          <div className='landing-hero_content-wrapper'>
            <h1 className='landing-hero_heading'>Beckett Vault</h1>
            <div className='landing-hero_button-wrapper'>
              <Button>Join Today</Button>
            </div>
          </div>
        </div>
      </div>
      <div className='section_landing-content'>
        <div className='landing-block_component'>
          <div className='page-padding'>
            <div className='container-large'>
              <div className='landing-block_layout'>
                <div className='landing-block_image-wrapper'>
                  <img src='' alt='' className='landing-block_image' />
                </div>
                <div className='landing-block_content-wrapper'>
                  <div className='landing-block_heading'>
                    Sed ut perspiciatis unde omnis
                  </div>
                  <p className='landing-block_content'>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='landing-block_component landing-block_component--alt'>
          <div className='page-padding'>
            <div className='container-large'>
              <div className='landing-block_layout landing-block_layout--alt'>
                <div className='landing-block_image-wrapper'>
                  <img src='' alt='' className='landing-block_image' />
                </div>
                <div className='landing-block_content-wrapper'>
                  <div className='landing-block_heading'>
                    Sed ut perspiciatis unde omnis
                  </div>
                  <p className='landing-block_content'>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='landing-block_component'>
          <div className='page-padding'>
            <div className='container-large'>
              <div className='landing-block_layout'>
                <div className='landing-block_image-wrapper'>
                  <img src='' alt='' className='landing-block_image' />
                </div>
                <div className='landing-block_content-wrapper'>
                  <div className='landing-block_heading'>
                    Sed ut perspiciatis unde omnis
                  </div>
                  <p className='landing-block_content'>
                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                    odit aut fugit, sed quia consequuntur magni dolores eos qui
                    ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                    qui dolorem.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='section_landing-cta'>
        <div className='landing-cta_component'>
          <div className='page-padding'>
            <div className='container-large'>
              <div className='landing-cta_layout'>
                <div className='landing-cta_heading'>Apply to beta</div>
                <div className='landing-cta_button-wrapper'>
                  <Button>Join Today</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
