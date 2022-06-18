const mockItems = [
  {
    id: 1,
    title: `1933 Goudey Babe Ruth PSA 3`,
    description: `Baseball ipsum dolor sit amet bleeder butcher boy fastball. Range assist batters box southpaw hitter 1-2-3 hack check swing. Corner curve line drive pickoff slugging count practice practice assist. 4-bagger hall of fame hot dog butcher boy starter, plunked baseball swing 4-6-3. Pitchout perfect game baseball card walk off starting pitcher flyout sport. Out double play plate season steal foul pole 4-bagger.`,
    img: `https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG`,
  },
  {
    id: 2,
    title: `1954 Bowman Mickey Mantle PSA 4`,
    description: `On-base percentage ground rule double backstop hot dog outs gapper dead ball era. Retire range dead ball era peanuts grounder warning track cellar right fielder. Robbed balk earned run robbed rainout left on base second base. Hack forkball cork baseline balk slider flyout. Out good eye catcher error first base, outs bullpen gold glove. Third baseman inning manager unearned run cy young airmail cheese rip.`,
    img: `https://cdn10.bigcommerce.com/s-omz8v4fn35/product_images/uploaded_images/corners2.png`,
  },
  {
    id: 3,
    title: `1959 Topps Mickey Mantle PSA 1`,
    description: `Pine tar national pastime manager bullpen around the horn base on balls skipper red sox. Squeeze corner sacrifice fly world series relay, defensive indifference left field fastball good eye. Foul pole baseline slider hit by pitch bleeder pinch hit no decision out. Fielders choice blue shutout club rhubarb disabled list scorecard cycle. Pickoff national pastime mitt losses reliever fair left field nubber inside. Hardball bleeder shutout bush league relay rally walk off count mustard.`,
    img: `https://www.oldsportscards.com/wp-content/uploads/2019/04/1959-Topps-10-Mickey-Mantle-Baseball-Card-Graded-PSA-1.jpg`,
  },
  {
    id: 4,
    title: `1933 Goudey Babe Ruth PSA 3`,
    description: `Starter tag first baseman double play loogy tapper warning track. Moneyball relief pitcher umpire airmail league bush league tossed world series. Rotation ball reds unearned run screwball, relay backstop outfielder dodgers. Wild pitch red sox left fielder rope helmet pinch hit hit by pitch small ball win. Catcher gold glove stance suicide squeeze forkball assist pennant. Mustard cardinals passed ball mitt mustard wild pitch dribbler cheese silver slugger.`,
    img: `https://www.deanscards.com/images/Basic%20pages/Babe%20Ruth%201933%20Goudey%20PSA%203.JPG`,
  },
  {
    id: 5,
    title: `1948 Leaf Jackie Robinson PSA 9`,
    description: `Good eye pinch hit wins 4-bagger grounder sport shutout fan. Ball ejection silver slugger ground ball cup of coffee, bat ball left on base. Catcher line drive wins moneyball bench slider retire plate first baseman. Curve mitt hey batter away rhubarb 1-2-3 golden sombrero. Fenway sweep assist 1-2-3 hot dog slider national pastime. Extra innings off-speed mound skipper bag cork contact fenway.`,
    img: `https://miro.medium.com/max/1200/1*JaWyJo7nrnouwmb8FSDD9g.jpeg`,
  },
  {
    id: 6,
    title: `1954 Topps Henry Aaron PSA 9`,
    description: `Away mitt around the horn gold glove in the hole extra innings pinch hit retire. National pastime take fielders choice pull chin music fall classic full count disabled list. Force ejection hall of fame baseball card fenway, ball ball. Away fastball triple-A rally warning track no-hitter 4-6-3 plate hey batter. Bunt swing leadoff suicide squeeze all-star fastball manager. Baseball card red sox contact interleague base bleeder center fielder friendly confines world series.`,
    img: `https://pbs.twimg.com/media/FHJ9gdUXIAM58gC.jpg`,
  },
];

export const getItems = async () => {
  // const data = axios.post(url, {userId: user.id})
  return mockItems;
};

export const getItem = async (id) => {
  // const data = axios.post(url, {userId: user.id, itemId: id})
  return mockItems.filter((item) => item.id == id)[0];
};
