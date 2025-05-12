
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext'
import { AdminAuthProvider } from './Admin_Compo/AdminAuthContext'
import AdminProtectedRoute from './Admin_Compo/AdminProtectedRoute'
import React from 'react'
import './App.css'
import HomeLayout from './Component/HomeLayout'
import Login from './User/Login'
import Signup from './User/Signup'
import AdminLayout from './Admin_Compo/AdminLayout'
import AdminDashboard from './Admin_Compo/AdminDashboard'
import AdminInventory from './Admin_Compo/AdminInventory'
import AdminOrders from './Admin_Compo/AdminOrders'

import Mobiles from './Category_Pages/Mobiles'
import Appliances from './Category_Pages/Appliances'
import ComputingDevices from './Category_Pages/ComputingDevices'
import AudioEquipments from './Category_Pages/AudioEquipments'
import Accessories from './Category_Pages/Accessories'
import SmartHomeDevices from './Category_Pages/SmartHomeDevices'


import ProductDetails from "./Component/ProductDetails";
import CartProvider from './Context/CartContext'
import CheckOutPage from './Payment/CheckOutPage'
import Orders from './Pages/Orders'
import PaymentPage from './Payment/PaymentPage';
import PaymentSuccess from './Payment/PaymentSuccess'
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Careers from './Pages/Careers';
import TermsOfUse from './Pages/TermsOfUse';
import ContactForm from './Admin_Compo/ContactForms';
import { WishlistProvider } from './Context/WishlistContext'
import NotFound from './Component/NotFound';
import Transactions from './Admin_Compo/Transactions';
import AdminLogin from './Admin_Compo/AdminLogin'
import ForgotPassword from './User/ForgotPassword'
import UserProtectedRoute from './Context/UserProtectedRoute'


export function App() {
  return (
    <AuthProvider>
      <AdminAuthProvider>
        <WishlistProvider>
          <CartProvider>
            <BrowserRouter>
              <Routes>

                <Route path='/' element={<HomeLayout />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path="/product/:id" element={<ProductDetails />} />
              
                <Route path='/appliances' element={<Appliances />} />
                <Route path='/mobile' element={<Mobiles />} />
                <Route path='/smarthomedevices' element={<SmartHomeDevices />} />
                <Route path='/accessories' element={<Accessories />} />
                <Route path='/computingdevices' element={<ComputingDevices />} />
                <Route path='/audioequipments' element={<AudioEquipments />} />



                <Route path="/payment" element={
                  <UserProtectedRoute><PaymentPage /></UserProtectedRoute>
                } />
                 <Route path="/orders" element={
                  <UserProtectedRoute><Orders /></UserProtectedRoute>
                } />

                <Route path="/payment-success" element={<PaymentSuccess />} />
                <Route path="/checkout" element={<CheckOutPage />} />
              <Route path='/terms_of_use' element={<TermsOfUse />} />
                <Route path='/careers' element={<Careers />} />
                <Route path='/contact_us' element={<ContactUs />} />
                <Route path='/about_us' element={<AboutUs />} />
                <Route path='/contactforms' element={<ContactForm />} />
                <Route path='*' element={<NotFound />} />

                {/* Admin Auth Route */}
                <Route path='/adminlogin' element={<AdminLogin />} />
                <Route path='/dashboard' element={
                  <AdminProtectedRoute>
                    <AdminDashboard />
                  </AdminProtectedRoute>
                } />
                <Route path='/inventory' element={
                  <AdminProtectedRoute>
                    <AdminInventory />
                  </AdminProtectedRoute>
                } />
                <Route path='/adminorders' element={
                  <AdminProtectedRoute>
                    <AdminOrders />
                  </AdminProtectedRoute>
                } />
                <Route path='/transactions' element={
                  <AdminProtectedRoute>
                    <Transactions />
                  </AdminProtectedRoute>
                } />

              </Routes>
            </BrowserRouter>
          </CartProvider>
        </WishlistProvider>
      </AdminAuthProvider>
    </AuthProvider>
  );
}

export default App;
