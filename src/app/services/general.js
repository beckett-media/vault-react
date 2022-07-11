
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

export const getTopStories = async () => {
    // const data = axios.post(url, {userId: user.id})
    return mockTopStories;
};