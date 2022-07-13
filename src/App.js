import React from 'react';
import Header from './app/components/Generic/Header';
import Footer from './app/components/Generic/Footer';
import Faq from './app/components/Generic/Faq';
import Privacy from './app/components/Generic/Privacy';
import Support from './app/components/Generic/Support';
import Terms from './app/components/Generic/Terms';
import Homepage from './app/components/Homepage/Homepage';
import Submission from './app/components/Submission/Submission';
import Gallery from './app/components/Gallery/Gallery';
import Item from './app/components/Item/Item';
import Withdraw from './app/components/Withdraw/Withdraw';
import Market from './app/components/Market/Market';
import Profile from './app/components/Profile/Profile';
import Cart from './app/components/Cart/Cart';
import SignIn from './app/components/SignIn/SignIn';
import Landing from './app/components/Homepage/Landing';
import { Routes, Route } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.scss';

import AuthProvider, {
  PrivateRoute,
  OnlyUnathenticated,
} from './app/contexts/auth';
import SubmissionHistory from './app/components/History/SubmissionHistory';
<<<<<<< HEAD
import CartProvider from './app/contexts/cart';
//chakra uses a default theme, this will remove it.
=======
// chakra uses a default theme, this will remove it.
>>>>>>> 37f94c7619f47d329cac637acc7105168dd46927
const emptyChakraTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: '',
        color: 'white',
      },
    }),
  },
});

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <ChakraProvider theme={emptyChakraTheme}>
          <Header />
          <main className=''>
            <Routes>
              <Route exact path='/' element={<PrivateRoute />}>
                <Route path='/submission' element={<Submission />} />
                <Route path='/about' element={<Homepage />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/item/:id' element={<Item />} />
                <Route path='/market' element={<Market />} />
                <Route path='/withdraw' element={<Withdraw />} />
                <Route path='/cart' element={<Cart />} />
                <Route exact path='/profile' element={<Profile />} />
                <Route path='/history' element={<SubmissionHistory />} />
                <Route path='/support' element={<Support />} />
                <Route path='/' element={<Homepage />} />
              </Route>
              <Route exact path='/signin' element={<OnlyUnathenticated />}>
                <Route path='' element={<SignIn />} />
              </Route>
              <Route path='/faq' element={<Faq />} />
              <Route path='/privacy' element={<Privacy />} />
              <Route path='/terms' element={<Terms />} />
              <Route path='/landing' element={<Landing />} />
              <Route path='/*' element={<Landing />} />
            </Routes>
          </main>
          <Footer />
          </ChakraProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
