import React from 'react';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './auth/login/page';
import SignupPage from './auth/signup/page';

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
