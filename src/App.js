import React, { useState } from 'react';
import TopNav from './app/components/Generic/TopNav';
import Footer from './app/components/Generic/Footer';
import Faq from './app/components/Generic/Faq';
import Privacy from './app/components/Generic/Privacy';
import Support from './app/components/Generic/Support';
import Terms from './app/components/Generic/Terms';
import SignUp from './app/pages/SignIn/SignUp';
import SignIn from './app/pages/SignIn/SignIn';
import OrderDetails from './app/pages/OrderDetails/OrderDetails';
import OrderPrint from './app/pages/OrderDetails/OrderPrint';
import AdminPage from './app/pages/Admin/AdminPage';
import AdminSubmissionPage from './app/pages/Admin/SubmissionPage';
import AdminVaultingPage from './app/pages/Admin/VaultingPage';
import AdminCreateVaultingPage from './app/pages/Admin/CreateVaultingPage';
import AdminEditSubmissionPage from './app/pages/Admin/EditSubmissionPage';
import Submission from './app/pages/Submission/Submission';
import MyCollection from './app/pages/MyCollection/MyCollection';
import Item from './app/pages/Item/Item';
import Withdraw from './app/pages/Withdraw/Withdraw';
import Market from './app/pages/Market/Market';
import Profile from './app/pages/Profile/Profile';
import Cart from './app/pages/Cart/Cart';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import './index.scss';
import Department from './app/pages/Department/Department';
import AuthProvider, { PrivateRoute, OnlyUnathenticated, AdminRoute, RedirectHome } from './app/contexts/auth';
import History from './app/pages/History/History';
import CartProvider from './app/contexts/cart';
// import ComingSoon from './app/components/Generic/ComingSoon';
import InterestForm from './app/pages/InterestForm/InterestForm';
import ComingSoon from './app/pages/ComingSoon/ComingSoon';
import FooterModal from './app/components/FooterModal/FooterModal';
import AdminCreateAccount from './app/pages/Admin/CreateAccountPage';
import ErrorBoundary from './ErrorBoundary';

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
  const [showFooterModal, setShowFooterModal] = useState('');
  const dismissModal = () => setShowFooterModal('');
  return (
    <>
      <ErrorBoundary>
        <AuthProvider>
          <CartProvider>
            <ChakraProvider theme={emptyChakraTheme}>
              <TopNav />
              <main className='w-100 h-100'>
                <Routes>
                  <Route exact path='/' element={<PrivateRoute />}>
                    <Route path='/submission' element={<Submission />} />
                    <Route path='/order-details' element={<OrderDetails />}>
                      <Route path='/order-details/:orderId' element={<OrderPrint />} />
                    </Route>
                    {/* <Route path='/about' element={<Homepage />} /> */}
                    <Route path='/my-collection' element={<MyCollection />} />
                    <Route path='/my-collection/item/:id' element={<Item />} />
                    <Route path='/market' element={<Market />} />
                    <Route path='/market/:department' element={<Department />} />

                    <Route path='/withdraw' element={<Withdraw />} />
                    <Route path='/cart' element={<Cart />} />
                    <Route exact path='/profile' element={<Profile />} />
                    <Route path='/history' element={<History />} />
                    <Route path='/support' element={<Support />} />
                    {/* <Route path='/' element={<Homepage />} /> */}
                    <Route path='/' element={<RedirectHome />} />
                  </Route>
                  <Route path='/admin' element={<AdminRoute />}>
                    <Route exact path='' element={<AdminPage />} />
                    <Route exact path='submission/edit/:submissionId' element={<AdminEditSubmissionPage />} />
                    <Route exact path='submission/vaulting/:submissionId' element={<AdminCreateVaultingPage />} />
                    <Route exact path='submission' element={<AdminSubmissionPage />} />
                    <Route exact path='vaulting' element={<AdminVaultingPage />} />
                    <Route exact path='create-account' element={<AdminCreateAccount />} />
                  </Route>
                  <Route exact path='/signin' element={<OnlyUnathenticated />}>
                    <Route path='' element={<SignIn />} />
                  </Route>
                  <Route path='/faq' element={<Faq />} />
                  <Route path='/privacy' element={<Privacy />} />
                  <Route path='/terms' element={<Terms />} />
                  <Route path='/beta-signup' element={<InterestForm />} />
                  <Route path='/coming-soon' element={<ComingSoon />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/*' element={<Navigate to='/' replace={true} />} />
                </Routes>
              </main>
              <Footer setShowFooterModal={setShowFooterModal} />
              <FooterModal
                showFooterModal={showFooterModal}
                openModal={showFooterModal.length}
                dismissModal={dismissModal}
              />
            </ChakraProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorBoundary>
    </>
  );
}

export default App;
