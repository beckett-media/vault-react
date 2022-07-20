import React from 'react';
import Header from './app/components/Generic/Header';
import Footer from './app/components/Generic/Footer';
import Faq from './app/components/Generic/Faq';
import Privacy from './app/components/Generic/Privacy';
import Support from './app/components/Generic/Support';
import Terms from './app/components/Generic/Terms';
import Homepage from './app/pages/Homepage/Homepage';
import AdminPage from './app/pages/Admin/AdminPage';
import AdminSubmissionPage from './app/pages/Admin/SubmissionPage';
import AdminVaultingPage from './app/pages/Admin/VaultingPage';
import AdminCreateVaultingPage from './app/pages/Admin/CreateVaultingPage';
import Submission from './app/pages/Submission/Submission';
import MyCollection from './app/pages/MyCollection/MyCollection';
import Item from './app/pages/Item/Item';
import Withdraw from './app/pages/Withdraw/Withdraw';
import Market from './app/pages/Market/Market';
import Profile from './app/pages/Profile/Profile';
import Cart from './app/pages/Cart/Cart';
import SignIn from './app/pages/SignIn/SignIn';
import Landing from './app/pages/Landing/Landing';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.scss';
import Department from './app/pages/Department/Department';

import AuthProvider, { PrivateRoute, OnlyUnathenticated, AdminRoute } from './app/contexts/auth';
import SubmissionHistory from './app/pages/History/SubmissionHistory';
import CartProvider from './app/contexts/cart';
import ComingSoon from './app/components/Generic/ComingSoon';
import InterestForm from './app/pages/Homepage/InterestForm';

// chakra uses a default theme, this will remove it.
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
                  <Route path='/collection' element={<MyCollection />} />
                  <Route path='/item/:id' element={<Item />} />
                  <Route path='/market' element={<Market />} />
                  <Route path='/market/:department' element={<Department />} />

                  <Route path='/withdraw' element={<Withdraw />} />
                  <Route path='/cart' element={<Cart />} />
                  <Route exact path='/profile' element={<Profile />} />
                  <Route path='/history' element={<SubmissionHistory />} />
                  <Route path='/support' element={<Support />} />
                  <Route path='/' element={<Homepage />} />
                </Route>
                <Route path='/admin' element={<AdminRoute />}>
                  <Route exact path='' element={<AdminPage />} />
                  <Route exact path='submission/:submissionId' element={<AdminCreateVaultingPage />} />
                  <Route exact path='submission' element={<AdminSubmissionPage />} />
                  <Route exact path='vaulting' element={<AdminVaultingPage />} />
                </Route>
                <Route exact path='/signin' element={<OnlyUnathenticated />}>
                  <Route path='' element={<SignIn />} />
                </Route>
                <Route path='/faq' element={<Faq />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/beta-signup' element={<InterestForm />} />
                <Route path='/coming-soon' element={<ComingSoon />} />
                <Route path='/landing' element={<Landing />} />
                <Route path='/*' element={<Navigate to="/" replace={true} />} />
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
