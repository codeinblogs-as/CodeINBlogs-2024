import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function useAdminRedirect() {
  const router = useRouter();
  const { profile } = useAuth();
  const [isClient, setIsClient] = useState(false); // Ensure this logic runs only on the client

  useEffect(() => {
    // Wait until the component mounts on the client
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const userRole = profile?.role;
  
      // Compare with the number 1
      if (userRole !== 1) {
        router.push('/'); // Redirect to homepage or login
      }
    }
  }, [isClient, profile, router]);
}
