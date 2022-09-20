import React from 'react';

export const support = {
  title: 'Support',
  sectionTitles: ['Email', 'Address'],
  sectionContent: [
    {
      type: 'p',
      content: [
        <a key={0} href='mailto:Vaultconcierge@Beckett.com'>
          Vaultconcierge@Beckett.com
        </a>,
        <br key={1} />,
        <br key={2} />,
      ],
    },
    {
      type: 'p',
      content: [
        'Beckett Collectibles',
        <br key={0} />,
        'C/O Beckett Vault',
        <br key={1} />,
        '2700 Summit Ave, Ste 100',
        <br key={2} />,
        'Plano, TX 75074',
      ],
    },
  ],
};
