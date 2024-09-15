import React from 'react';
import SignupPage from './(app)/auth/signup/page';
import LoginPage from './(app)/auth/login/page';
import { AuthProvider } from '@/context/AuthContext';

const App: React.FC = () => {
    return (
        <AuthProvider>
            {/* Your routing logic here */}
            <LoginPage />
            <SignupPage />
        </AuthProvider>
    );
};

export default App;
