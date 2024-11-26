import React from 'react';
import SignupPage from './(app)/auth/signup/page';
import LoginPage from './(app)/auth/login/page';
import Navbar from '@/components/global/Navbar';
import Home from './page';
import ForgotPassword from './(app)/auth/forgotPassword/page';

const App: React.FC = () => {
    return (
        <>
      
            <LoginPage />
            <SignupPage />
          <ForgotPassword/>
        </>
    );
};

export default App;
