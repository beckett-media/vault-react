import { axiosClient } from './index';

export const VAULTING_STATUS = {
  NotMinted: 0,
  Minting: 1,
  Minted: 2,
  Locking: 3,
  Locked: 4,
  Withdrawing: 5,
  Withdrawn: 6,
};

export const ITEM_TYPE = {
  TRADING_CARD: 1,
  COMIC: 2,
};

const mockItems = [
  {
    id: 1,
    title: '2020-21 Steph Curry #26  National Treasures Signatures Emerald',
    est_value: 2500,
    subject: 'Curry, Steph',
    grade: 'BGS 9 Mint',
    description: '1/5 Autographed',
    ownerId: 1,
    image_url: 'Card1/IMG_0042.JPG',
    imgRev: 'Card1/IMG_0043.JPG',
    date: new Date(),
  },
  {
    id: 2,
    title: '2018-19 Kobe Bryant #1 Select In Flight Signatures Prizms Neon Green',
    est_value: 10800,
    subject: 'Bryant, Kobe',
    grade: 'BGS 9.5 Gem Mint',
    description: 'Autographed',
    ownerId: 1,
    image_url: 'Card2/IMG_0050.JPG',
    imgRev: 'Card2/IMG_0051.JPG',
    date: new Date(),
  },
  {
    id: 3,
    title: '2018-19 Luka Doncic #127 JSY AU National Treasures',
    est_value: 5700,
    subject: 'Doncic, Luka',
    grade: 'BGS 9 Mint',
    description: '46/99 Autographed',
    ownerId: 1,
    image_url: 'Card3/IMG_0235.JPG',
    imgRev: 'Card3/IMG_0236.JPG',
    date: new Date(),
  },
  {
    id: 4,
    title: '2003-04 Lebron James #221 Topps',
    est_value: 4000,
    subject: 'James, Lebron',
    grade: 'BGS 9.5 Gem Mint',
    description: 'Lebron James Rookie Card',
    ownerId: 1,
    image_url: 'Card4/IMG_0353.JPG',
    imgRev: 'Card4/IMG_0354.JPG',
    date: new Date(),
  },
  {
    id: 5,
    title: '2019 Mike Trout Topps Tribute Autographs',
    est_value: 8400,
    subject: 'Trout, Mike',
    grade: 'BGS 9 Mint',
    description: 'Autographed 09/10',
    ownerId: 1,
    image_url: 'Card5/IMG_0651.JPG',
    imgRev: 'Card5/IMG_0652.JPG',
    date: new Date(),
  },
  {
    id: 6,
    title: '1952  Mickey Mantle #311B DP',
    est_value: 180000,
    subject: 'Mantle, Mickey',
    grade: 'BGS 3 Very Good',
    description: 'The iconic Mickey Mantle Rookie Card',
    ownerId: 1,
    image_url: 'Card6/IMG_0741.JPG',
    imgRev: 'Card6/IMG_0742.JPG',
    date: new Date(),
  },
  {
    id: 7,
    title: '1933 Babe Ruth #181 Goudey',
    est_value: 90500,
    subject: 'Ruth, Babe',
    grade: 'BGS 2.5 Good',
    description: 'Iconic Babe Ruth Big League Chewing Gum Card',
    ownerId: 1,
    image_url: 'Card7/IMG_0767.JPG',
    imgRev: 'Card7/IMG_0768.JPG',
    date: new Date(),
  },
  {
    id: 8,
    title: '2017 Patrick Mahomes II #4 Panini Flawless Rookie Patch Autographs',
    est_value: 15000,
    subject: 'Mahomes II, Pattrick',
    grade: 'BGS 9.5 Gem Mint',
    description: 'Patrick Mahomes Rookie Jersey Card Autographed',
    ownerId: 1,
    image_url: 'Card8/IMG_0805.JPG',
    imgRev: 'Card8/IMG_0806.JPG',
    date: new Date(),
  },
  {
    id: 9,
    title: '2019-20 #209 Zion Willaims Panini Mosaic Fast Break Disco Pink',
    est_value: 3000,
    subject: 'Williams, Zion',
    grade: 'BGS 9.5 Gem Mint',
    description: 'Zion William Rookie Card',
    ownerId: 1,
    image_url: 'Card9/IMG_0343.JPG',
    imgRev: 'Card9/IMG_0344.JPG',
    date: new Date(),
  },
  {
    id: 10,
    title: '2020-21 Lamelo Ball #130 AU JSY Nation Treasures',
    est_value: 10300,
    subject: 'Ball, Lamelo',
    grade: 'BGS 9 Mint',
    description: 'LaMelo Ball Autographed Rookie Card 90/99',
    ownerId: 1,
    image_url: 'Card10/IMG_0874.JPG',
    imgRev: 'Card10/IMG_0875.JPG',
    date: new Date(),
  },
  {
    id: 11,
    title: '2013-14 G Antetokounmpo #130 JSY AU National Treasures Gold',
    est_value: 25500,
    subject: 'Antetokounmpo, Giannis',
    grade: 'BGS 7.5 Near Mint',
    description: 'Giannis Antetokounmpo Rookie Jersey Autographed card 02/25',
    ownerId: 1,
    image_url: 'Card11/IMG_1008.JPG',
    imgRev: 'Card11/IMG_1009.JPG',
    date: new Date(),
  },
  {
    id: 12,
    title: '2020 Joe Burrow #156 JSY AU National Treasures',
    est_value: 20000,
    subject: 'Burrow, Joe',
    grade: 'BGS 9.5 Gem Mint',
    description: 'Joe Burrow Rookie Jersey Card Autographed 46/99',
    ownerId: 1,
    image_url: 'Card12/IMG_0853.JPG',
    imgRev: 'Card12/IMG_0854.JPG',
    date: new Date(),
  },
  {
    id: 13,
    title: '1980-81 Bird/Erving/Johnson Topps',
    est_value: 35000,
    subject: 'Bird / Erving / Johnson',
    grade: 'BGS 9 Mint',
    description: 'Larry Bird,Julius Evering,Magic Johnson Tri-card',
    ownerId: 1,
    image_url: 'Card13/IMG_0890.JPG',
    imgRev: 'Card13/IMG_0891.JPG',
    date: new Date(),
  },
  {
    id: 14,
    title: '2001 Tiger Woods #1 Upper Deck',
    est_value: 10500,
    subject: 'Woods, Tiger',
    grade: 'BGS 10 Pristine',
    description: 'Tiger Woods Pristine 10 BGS Black Label',
    ownerId: 1,
    image_url: 'Card14/IMG_0779.JPG',
    imgRev: 'Card14/IMG_0780.JPG',
    date: new Date(),
  },
  {
    id: 15,
    title: '1954 Hank Aaron #128 Topps',
    est_value: 12600,
    subject: 'Aaron, Hank',
    grade: 'BGS 7 Near Mint',
    description: 'Henery Aaron Outfield Milwaukee Braves',
    ownerId: 1,
    image_url: 'Card15/IMG_0743.JPG',
    imgRev: 'Card15/IMG_0744.JPG',
    date: new Date(),
  },
  {
    id: 16,
    title: '1979-80 Wayne Gretzky #15 Topps',
    est_value: 34000,
    subject: 'Gretzky, Wayne',
    grade: 'BGS 8.5',
    description: 'Near Mint Wayne Gretzky Rookie Card Oilers',
    ownerId: 1,
    image_url: 'Card16/IMG_0661.JPG',
    imgRev: 'Card16/IMG_0662.JPG',
    date: new Date(),
  },
];

const mockMarketItems = [
  {
    id: 19,
    ownerId: 2,
    title: `1989 Ken Griffey Jr AUTO`,
    description: `Baseball ipsum dolor sit amet bleeder butcher boy fastball. Range assist batters box southpaw hitter 1-2-3 hack check swing. Corner curve line drive pickoff slugging count practice practice assist. 4-bagger hall of fame hot dog butcher boy starter, plunked baseball swing 4-6-3. Pitchout perfect game baseball card walk off starting pitcher flyout sport. Out double play plate season steal foul pole 4-bagger.`,
    image_url: `http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2017/10/Griffey-Upper-Deck-Auto-BAS.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    est_value: 6700,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 20,
    ownerId: 2,
    title: `1991 Score Mickey Mantle AUTO`,
    description: `On-base percentage ground rule double backstop hot dog outs gapper dead ball era. Retire range dead ball era peanuts grounder warning track cellar right fielder. Robbed balk earned run robbed rainout left on base second base. Hack forkball cork baseline balk slider flyout. Out good eye catcher error first base, outs bullpen gold glove. Third baseman inning manager unearned run cy young airmail cheese rip.`,
    image_url: `https://m.media-amazon.com/images/I/61X0WXxr-iL._AC_SL1049_.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23),
    est_value: 900,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 21,
    ownerId: 2,
    title: `2017 Allen & Ginter Albert Pujos Relic AUTO`,
    description: `Pine tar national pastime manager bullpen around the horn base on balls skipper red sox. Squeeze corner sacrifice fly world series relay, defensive indifference left field fastball good eye. Foul pole baseline slider hit by pitch bleeder pinch hit no decision out. Fielders choice blue shutout club rhubarb disabled list scorecard cycle. Pickoff national pastime mitt losses reliever fair left field nubber inside. Hardball bleeder shutout bush league relay rally walk off count mustard.`,
    image_url: `https://m.media-amazon.com/images/I/71jO2dGKc6L._AC_SY550_.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    est_value: 4400,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 22,
    ownerId: 2,
    title: `1990 Topps Frank Thomas AUTO`,
    description: `Starter tag first baseman double play loogy tapper warning track. Moneyball relief pitcher umpire airmail league bush league tossed world series. Rotation ball reds unearned run screwball, relay backstop outfielder dodgers. Wild pitch red sox left fielder rope helmet pinch hit hit by pitch small ball win. Catcher gold glove stance suicide squeeze forkball assist pennant. Mustard cardinals passed ball mitt mustard wild pitch dribbler cheese silver slugger.`,
    image_url: `https://p1.liveauctioneers.com/7804/247242/128230737_1_x.jpg?quality=80&version=1651855705`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    est_value: 2600,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 23,
    ownerId: 2,
    title: `1989 Fleer Billy Ripken FF`,
    description: `Good eye pinch hit wins 4-bagger grounder sport shutout fan. Ball ejection silver slugger ground ball cup of coffee, bat ball left on base. Catcher line drive wins moneyball bench slider retire plate first baseman. Curve mitt hey batter away rhubarb 1-2-3 golden sombrero. Fenway sweep assist 1-2-3 hot dog slider national pastime. Extra innings off-speed mound skipper bag cork contact fenway.`,
    image_url: `https://www.blowoutcards.com/wp/wp-content/uploads/2018/10/making-the-grade-october-1989-fleer-billy-ripken-FF-error-BGS-9.5.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
    est_value: 600,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 24,
    ownerId: 2,
    title: `2013 Topps Archives Mammy Machado Gold`,
    description: `Away mitt around the horn gold glove in the hole extra innings pinch hit retire. National pastime take fielders choice pull chin music fall classic full count disabled list. Force ejection hall of fame baseball card fenway, ball ball. Away fastball triple-A rally warning track no-hitter 4-6-3 plate hey batter. Bunt swing leadoff suicide squeeze all-star fastball manager. Baseball card red sox contact interleague base bleeder center fielder friendly confines world series.`,
    image_url: `https://i0.wp.com/blog.comc.com/wp-content/uploads/2018/05/51631469.jpg?fit=656%2C1024&ssl=1`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17),
    est_value: 1400,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 25,
    ownerId: 2,
    title: `1989 Ken Griffey Jr AUTO`,
    description: `Baseball ipsum dolor sit amet bleeder butcher boy fastball. Range assist batters box southpaw hitter 1-2-3 hack check swing. Corner curve line drive pickoff slugging count practice practice assist. 4-bagger hall of fame hot dog butcher boy starter, plunked baseball swing 4-6-3. Pitchout perfect game baseball card walk off starting pitcher flyout sport. Out double play plate season steal foul pole 4-bagger.`,
    image_url: `http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2017/10/Griffey-Upper-Deck-Auto-BAS.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    est_value: 6700,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 26,
    ownerId: 2,
    title: `1991 Score Mickey Mantle AUTO`,
    description: `On-base percentage ground rule double backstop hot dog outs gapper dead ball era. Retire range dead ball era peanuts grounder warning track cellar right fielder. Robbed balk earned run robbed rainout left on base second base. Hack forkball cork baseline balk slider flyout. Out good eye catcher error first base, outs bullpen gold glove. Third baseman inning manager unearned run cy young airmail cheese rip.`,
    image_url: `https://m.media-amazon.com/images/I/61X0WXxr-iL._AC_SL1049_.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23),
    est_value: 900,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 27,
    ownerId: 2,
    title: `2017 Allen & Ginter Albert Pujos Relic AUTO`,
    description: `Pine tar national pastime manager bullpen around the horn base on balls skipper red sox. Squeeze corner sacrifice fly world series relay, defensive indifference left field fastball good eye. Foul pole baseline slider hit by pitch bleeder pinch hit no decision out. Fielders choice blue shutout club rhubarb disabled list scorecard cycle. Pickoff national pastime mitt losses reliever fair left field nubber inside. Hardball bleeder shutout bush league relay rally walk off count mustard.`,
    image_url: `https://m.media-amazon.com/images/I/71jO2dGKc6L._AC_SY550_.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    est_value: 4400,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 28,
    ownerId: 2,
    title: `1990 Topps Frank Thomas AUTO`,
    description: `Starter tag first baseman double play loogy tapper warning track. Moneyball relief pitcher umpire airmail league bush league tossed world series. Rotation ball reds unearned run screwball, relay backstop outfielder dodgers. Wild pitch red sox left fielder rope helmet pinch hit hit by pitch small ball win. Catcher gold glove stance suicide squeeze forkball assist pennant. Mustard cardinals passed ball mitt mustard wild pitch dribbler cheese silver slugger.`,
    image_url: `https://p1.liveauctioneers.com/7804/247242/128230737_1_x.jpg?quality=80&version=1651855705`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    est_value: 2600,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 29,
    ownerId: 2,
    title: `1989 Fleer Billy Ripken FF`,
    description: `Good eye pinch hit wins 4-bagger grounder sport shutout fan. Ball ejection silver slugger ground ball cup of coffee, bat ball left on base. Catcher line drive wins moneyball bench slider retire plate first baseman. Curve mitt hey batter away rhubarb 1-2-3 golden sombrero. Fenway sweep assist 1-2-3 hot dog slider national pastime. Extra innings off-speed mound skipper bag cork contact fenway.`,
    image_url: `https://www.blowoutcards.com/wp/wp-content/uploads/2018/10/making-the-grade-october-1989-fleer-billy-ripken-FF-error-BGS-9.5.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
    est_value: 600,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 30,
    ownerId: 2,
    title: `2013 Topps Archives Mammy Machado Gold`,
    description: `Away mitt around the horn gold glove in the hole extra innings pinch hit retire. National pastime take fielders choice pull chin music fall classic full count disabled list. Force ejection hall of fame baseball card fenway, ball ball. Away fastball triple-A rally warning track no-hitter 4-6-3 plate hey batter. Bunt swing leadoff suicide squeeze all-star fastball manager. Baseball card red sox contact interleague base bleeder center fielder friendly confines world series.`,
    image_url: `https://i0.wp.com/blog.comc.com/wp-content/uploads/2018/05/51631469.jpg?fit=656%2C1024&ssl=1`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17),
    est_value: 1400,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 31,
    ownerId: 2,
    title: `1989 Ken Griffey Jr AUTO`,
    description: `Baseball ipsum dolor sit amet bleeder butcher boy fastball. Range assist batters box southpaw hitter 1-2-3 hack check swing. Corner curve line drive pickoff slugging count practice practice assist. 4-bagger hall of fame hot dog butcher boy starter, plunked baseball swing 4-6-3. Pitchout perfect game baseball card walk off starting pitcher flyout sport. Out double play plate season steal foul pole 4-bagger.`,
    image_url: `http://beckett-www.s3.amazonaws.com/news/news-content/uploads/2017/10/Griffey-Upper-Deck-Auto-BAS.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
    est_value: 6700,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 32,
    ownerId: 2,
    title: `1991 Score Mickey Mantle AUTO`,
    description: `On-base percentage ground rule double backstop hot dog outs gapper dead ball era. Retire range dead ball era peanuts grounder warning track cellar right fielder. Robbed balk earned run robbed rainout left on base second base. Hack forkball cork baseline balk slider flyout. Out good eye catcher error first base, outs bullpen gold glove. Third baseman inning manager unearned run cy young airmail cheese rip.`,
    image_url: `https://m.media-amazon.com/images/I/61X0WXxr-iL._AC_SL1049_.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 23),
    est_value: 900,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 33,
    ownerId: 2,
    title: `2017 Allen & Ginter Albert Pujos Relic AUTO`,
    description: `Pine tar national pastime manager bullpen around the horn base on balls skipper red sox. Squeeze corner sacrifice fly world series relay, defensive indifference left field fastball good eye. Foul pole baseline slider hit by pitch bleeder pinch hit no decision out. Fielders choice blue shutout club rhubarb disabled list scorecard cycle. Pickoff national pastime mitt losses reliever fair left field nubber inside. Hardball bleeder shutout bush league relay rally walk off count mustard.`,
    image_url: `https://m.media-amazon.com/images/I/71jO2dGKc6L._AC_SY550_.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
    est_value: 4400,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 34,
    ownerId: 2,
    title: `1990 Topps Frank Thomas AUTO`,
    description: `Starter tag first baseman double play loogy tapper warning track. Moneyball relief pitcher umpire airmail league bush league tossed world series. Rotation ball reds unearned run screwball, relay backstop outfielder dodgers. Wild pitch red sox left fielder rope helmet pinch hit hit by pitch small ball win. Catcher gold glove stance suicide squeeze forkball assist pennant. Mustard cardinals passed ball mitt mustard wild pitch dribbler cheese silver slugger.`,
    image_url: `https://p1.liveauctioneers.com/7804/247242/128230737_1_x.jpg?quality=80&version=1651855705`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    est_value: 2600,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 35,
    ownerId: 2,
    title: `1989 Fleer Billy Ripken FF`,
    description: `Good eye pinch hit wins 4-bagger grounder sport shutout fan. Ball ejection silver slugger ground ball cup of coffee, bat ball left on base. Catcher line drive wins moneyball bench slider retire plate first baseman. Curve mitt hey batter away rhubarb 1-2-3 golden sombrero. Fenway sweep assist 1-2-3 hot dog slider national pastime. Extra innings off-speed mound skipper bag cork contact fenway.`,
    image_url: `https://www.blowoutcards.com/wp/wp-content/uploads/2018/10/making-the-grade-october-1989-fleer-billy-ripken-FF-error-BGS-9.5.jpg`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 11),
    est_value: 600,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
  },
  {
    id: 36,
    ownerId: 2,
    title: `2013 Topps Archives Mammy Machado Gold`,
    description: `Away mitt around the horn gold glove in the hole extra innings pinch hit retire. National pastime take fielders choice pull chin music fall classic full count disabled list. Force ejection hall of fame baseball card fenway, ball ball. Away fastball triple-A rally warning track no-hitter 4-6-3 plate hey batter. Bunt swing leadoff suicide squeeze all-star fastball manager. Baseball card red sox contact interleague base bleeder center fielder friendly confines world series.`,
    image_url: `https://i0.wp.com/blog.comc.com/wp-content/uploads/2018/05/51631469.jpg?fit=656%2C1024&ssl=1`,
    imgRev: 'https://uploads.tapatalk-cdn.com/20180529/ddf1bbba0522b0a64945e765b2b2df4c.jpg',
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 17),
    est_value: 1400,
    owner: 'Seller 123',
    tags: ['tag 1', 'tag 2', 'tag 3', 'tag 4', 'tag 5'],
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

export const fetchItems = () => {
  return axiosClient.get(`/marketplace/vaulting`).then((res) => {
    return res.data;
  });
};

export const fetchMarketItems = () => {
  return axiosClient.get(`/marketplace/listing`).then((res) => res.data);
};
export const getListings = async ({ user, status, offset, limit, order } = {}) => {
  const params = {
    user,
    status,
    offset,
    limit,
    order,
  };

  return axiosClient
    .get(`/marketplace/listing`, {
      params: Object.keys(params).length > 0 ? params : undefined,
    })
    .then((res) => {
      return res.data;
    });
};

export const getSingleListing = (id) => {
  return axiosClient
    .get(`/marketplace/listing/${id}`, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('accessToken')}`,
      },
    })
    .then((res) => {
      res.data;
    });
};

export const getVaulting = async ({ user, status, offset, limit, order } = {}) => {
  const params = {
    user,
    status,
    offset,
    limit,
    order,
  };

  return axiosClient
    .get(`/marketplace/vaulting`, {
      params: Object.keys(params).length > 0 ? params : undefined,
    })
    .then((res) => {
      return modifyItems(res.data);
    });
};

const modifyItems = (data) => {
  if (!Array.isArray(data)) return data;
  return data.map((item) => {
    const playerNames = item.player.split(' ');
    let playerFirstName, playerLastName;
    if (playerNames.length > 1) {
      playerFirstName = playerNames.shift();
      playerLastName = playerNames.join(' ');
    } else {
      playerFirstName = '';
      playerLastName = playerNames[0];
    }
    return { ...item, playerFirstName, playerLastName };
  });
};

export const getSingleVaulting = (id) => {
  return axiosClient.get(`/marketplace/vaulting/${id}`).then((res) => res.data);
};

export const getSingleVaultingByItem = (itemId) => {
  return axiosClient.get(`/marketplace/vaulting/?item=${itemId}`).then((res) => res.data);
};

export const fetchItemBySubmission = (submissionId) => {
  return axiosClient
    .get(`/marketplace/vaulting/submission/${submissionId}`)
    .then((res) => res.data)
    .catch((err) => err);
};

export const createVaulting = (item) => {
  return axiosClient.post(`/marketplace/vaulting`, item).then((res) => {
    return res;
  });
};
export const createItemListing = ({ id, userName, price }) => {
  const listing = { vaulting_id: id, user: userName, est_value: price };
  return axiosClient.post(`/marketplace/listing`, listing);
};

export const updateItemDetails = ({ item }) => {
  // TODO: These are required fields to submit changes to item fields.
  // "type": 1,
  // "chain_id": 99,
  // "item_uuid": "12345678-0000-0000-0000-000000000000",
  // "burn_job_id": 1,
  // "mint_tx_hash": "0x0000000000000000000000000000000000000000",
  // "burn_tx_hash": "0x0000000000000000000000000000000000000000",
  // "collection": "0x0000000000000000000000000000000000000000",
  // "token_id": 1,
  // "status": 1
  return axiosClient.put(`/marketplace/vaulting`, item);
};

export const withdrawItem = (id) => {
  return axiosClient.delete(`/marketplace/vaulting/${id}`).then((res) => {
    return res.data;
  });
};
