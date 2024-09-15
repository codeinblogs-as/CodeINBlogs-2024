import React from 'react';
import SignupPage from './(app)/auth/signup/page';
import { AuthProvider } from '@/context/AuthContext';
// import LoginPage from './auth/login/page';

const App: React.FC = () => {
    return (
        <AuthProvider>
            {/* Your routing logic here */}
            {/* <LoginPage /> */}
            <SignupPage />
        </AuthProvider>
    );
};

export default App;
