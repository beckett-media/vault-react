const mockItems = [
  {
    id: 1,
    ownerId: 1,
    title: `1933 Goudey Babe Ruth PSA 3  Test for Really Long Title that will not fit on the card`,
    description: `Baseball ipsum dolor sit amet bleeder butcher boy fastball. Range assist batters box southpaw hitter 1-2-3 hack check swing. Corner curve line drive pickoff slugging count practice practice assist. 4-bagger hall of fame hot dog butcher boy starter, plunked baseball swing 4-6-3. Pitchout perfect game baseball card walk off starting pitcher flyout sport. Out double play plate season steal foul pole 4-bagger.`,
    img: `https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    price: 1200,
  },
  {
    id: 2,
    ownerId: 1,
    title: `1954 Bowman Mickey Mantle PSA 4`,
    description: `On-base percentage ground rule double backstop hot dog outs gapper dead ball era. Retire range dead ball era peanuts grounder warning track cellar right fielder. Robbed balk earned run robbed rainout left on base second base. Hack forkball cork baseline balk slider flyout. Out good eye catcher error first base, outs bullpen gold glove. Third baseman inning manager unearned run cy young airmail cheese rip.`,
    img: `https://cdn10.bigcommerce.com/s-omz8v4fn35/product_images/uploaded_images/corners2.png`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    price: 1600,
  },
  {
    id: 3,
    ownerId: 1,
    title: `1959 Topps Mickey Mantle PSA 1`,
    description: `Pine tar national pastime manager bullpen around the horn base on balls skipper red sox. Squeeze corner sacrifice fly world series relay, defensive indifference left field fastball good eye. Foul pole baseline slider hit by pitch bleeder pinch hit no decision out. Fielders choice blue shutout club rhubarb disabled list scorecard cycle. Pickoff national pastime mitt losses reliever fair left field nubber inside. Hardball bleeder shutout bush league relay rally walk off count mustard.`,
    img: `https://www.oldsportscards.com/wp-content/uploads/2019/04/1959-Topps-10-Mickey-Mantle-Baseball-Card-Graded-PSA-1.jpg`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    price: 12000,
  },
  {
    id: 4,
    ownerId: 1,
    title: `1933 Goudey Babe Ruth PSA 3`,
    description: `Starter tag first baseman double play loogy tapper warning track. Moneyball relief pitcher umpire airmail league bush league tossed world series. Rotation ball reds unearned run screwball, relay backstop outfielder dodgers. Wild pitch red sox left fielder rope helmet pinch hit hit by pitch small ball win. Catcher gold glove stance suicide squeeze forkball assist pennant. Mustard cardinals passed ball mitt mustard wild pitch dribbler cheese silver slugger.`,
    img: `https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 21),
    price: 7200,
  },
  {
    id: 5,
    ownerId: 1,
    title: `1948 Leaf Jackie Robinson PSA 9`,
    description: `Good eye pinch hit wins 4-bagger grounder sport shutout fan. Ball ejection silver slugger ground ball cup of coffee, bat ball left on base. Catcher line drive wins moneyball bench slider retire plate first baseman. Curve mitt hey batter away rhubarb 1-2-3 golden sombrero. Fenway sweep assist 1-2-3 hot dog slider national pastime. Extra innings off-speed mound skipper bag cork contact fenway.`,
    img: `https://miro.medium.com/max/1200/1*JaWyJo7nrnouwmb8FSDD9g.jpeg`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 33),
    price: 5500,
  },
  {
    id: 6,
    ownerId: 1,
    title: `1954 Topps Henry Aaron PSA 9`,
    description: `Away mitt around the horn gold glove in the hole extra innings pinch hit retire. National pastime take fielders choice pull chin music fall classic full count disabled list. Force ejection hall of fame baseball card fenway, ball ball. Away fastball triple-A rally warning track no-hitter 4-6-3 plate hey batter. Bunt swing leadoff suicide squeeze all-star fastball manager. Baseball card red sox contact interleague base bleeder center fielder friendly confines world series.`,
    img: `https://pbs.twimg.com/media/FHJ9gdUXIAM58gC.jpg`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1),
    price: 3200,
  },
];

const mockMarketItems = [
  {
    id: 7,
    ownerId: 2,
    title: `1989 Ken Griffey Jr AUTO`,
    description: `Baseball ipsum dolor sit amet bleeder butcher boy fastball. Range assist batters box southpaw hitter 1-2-3 hack check swing. Corner curve line drive pickoff slugging count practice practice assist. 4-bagger hall of fame hot dog butcher boy starter, plunked baseball swing 4-6-3. Pitchout perfect game baseball card walk off starting pitcher flyout sport. Out double play plate season steal foul pole 4-bagger.`,
    img: `http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2017/10/Griffey-Upper-Deck-Auto-BAS.jpg`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    price: 6700,
  },
  {
    id: 8,
    ownerId: 2,
    title: `1991 Score Mickey Mantle AUTO`,
    description: `On-base percentage ground rule double backstop hot dog outs gapper dead ball era. Retire range dead ball era peanuts grounder warning track cellar right fielder. Robbed balk earned run robbed rainout left on base second base. Hack forkball cork baseline balk slider flyout. Out good eye catcher error first base, outs bullpen gold glove. Third baseman inning manager unearned run cy young airmail cheese rip.`,
    img: `https://m.media-amazon.com/images/I/61X0WXxr-iL._AC_SL1049_.jpg`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23),
    price: 900,
  },
  {
    id: 9,
    ownerId: 2,
    title: `2017 Allen & Ginter Albert Pujos Relic AUTO`,
    description: `Pine tar national pastime manager bullpen around the horn base on balls skipper red sox. Squeeze corner sacrifice fly world series relay, defensive indifference left field fastball good eye. Foul pole baseline slider hit by pitch bleeder pinch hit no decision out. Fielders choice blue shutout club rhubarb disabled list scorecard cycle. Pickoff national pastime mitt losses reliever fair left field nubber inside. Hardball bleeder shutout bush league relay rally walk off count mustard.`,
    img: `https://m.media-amazon.com/images/I/71jO2dGKc6L._AC_SY550_.jpg`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    price: 4400,
  },
  {
    id: 10,
    ownerId: 2,
    title: `1990 Topps Frank Thomas AUTO`,
    description: `Starter tag first baseman double play loogy tapper warning track. Moneyball relief pitcher umpire airmail league bush league tossed world series. Rotation ball reds unearned run screwball, relay backstop outfielder dodgers. Wild pitch red sox left fielder rope helmet pinch hit hit by pitch small ball win. Catcher gold glove stance suicide squeeze forkball assist pennant. Mustard cardinals passed ball mitt mustard wild pitch dribbler cheese silver slugger.`,
    img: `https://p1.liveauctioneers.com/7804/247242/128230737_1_x.jpg?quality=80&version=1651855705`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    price: 2600,
  },
  {
    id: 11,
    ownerId: 2,
    title: `1989 Fleer Billy Ripken FF`,
    description: `Good eye pinch hit wins 4-bagger grounder sport shutout fan. Ball ejection silver slugger ground ball cup of coffee, bat ball left on base. Catcher line drive wins moneyball bench slider retire plate first baseman. Curve mitt hey batter away rhubarb 1-2-3 golden sombrero. Fenway sweep assist 1-2-3 hot dog slider national pastime. Extra innings off-speed mound skipper bag cork contact fenway.`,
    img: `https://www.blowoutcards.com/wp/wp-content/uploads/2018/10/making-the-grade-october-1989-fleer-billy-ripken-FF-error-BGS-9.5.jpg`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
    price: 600,
  },
  {
    id: 12,
    ownerId: 2,
    title: `2013 Topps Archives Mammy Machado Gold`,
    description: `Away mitt around the horn gold glove in the hole extra innings pinch hit retire. National pastime take fielders choice pull chin music fall classic full count disabled list. Force ejection hall of fame baseball card fenway, ball ball. Away fastball triple-A rally warning track no-hitter 4-6-3 plate hey batter. Bunt swing leadoff suicide squeeze all-star fastball manager. Baseball card red sox contact interleague base bleeder center fielder friendly confines world series.`,
    img: `https://i0.wp.com/blog.comc.com/wp-content/uploads/2018/05/51631469.jpg?fit=656%2C1024&ssl=1`,
    imgRev:
      'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17),
    price: 1400,
  },
];

export const getItems = async () => {
  // const data = axios.post(url, {userId: user.id})
  return mockItems;
};

export const getItem = async (id) => {
  // const data = axios.post(url, {userId: user.id, itemId: id})
  return [...mockItems, ...mockMarketItems].filter((item) => item.id == id)[0];
};

export const getMarketItems = async () => {
  // const data = axios.post(url, {userId: user.id})
  return mockMarketItems;
};
