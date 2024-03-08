import { useEffect } from 'react';
import { useRouter } from 'next/router';

const HomePage = () => {
    const router = useRouter();

    useEffect(() => {
        router.push("/foodies");
    }, []);


    return null;
};

export default HomePage;