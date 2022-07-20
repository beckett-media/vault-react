const mockTopStories = [
  {
    title: 'Top Ten Cards',
    body: 'Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    cta: 'Discover More',
  },
  {
    title: 'New Releases',
    body: 'Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    cta: 'Shop Now',
  },
  {
    title: 'New Releases',
    body: 'Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
    cta: 'Shop Now',
  },
];

const mockMarketplaceTopStories = [
  {
    title: 'This is a test',
    body: 'This is a test',
    cta: 'This is a test',
  },
  {
    title: 'This is a test',
    body: 'This is a test',
    cta: 'This is a test',
  },
  {
    title: 'This is a test',
    body: 'This is a test',
    cta: 'This is a test',
  },
];

export const getTopStories = async () => {
  // const data = axios.post(url, {userId: user.id})
  return mockTopStories;
};

export const getMarketplaceTopStories = async () => {
  // const data = axios.post(url, {userId: user.id})
  return mockMarketplaceTopStories;
};
