import React from 'react';
import SignupPage from './(app)/auth/signup/page';
import LoginPage from './(app)/auth/login/page';
import Navbar from '@/components/global/Navbar';
import Home from './page';

const App: React.FC = () => {
    return (
        <>
      
            <LoginPage />
            <SignupPage />
          
        </>
    );
};

export default App;
