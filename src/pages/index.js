import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        // Redirect to "/foodies" page
        router.push("/foodies");
    }, []);

    // No need to return any content since the redirection is automatic
    return null;
};

export default HomePage;