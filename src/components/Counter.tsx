'use client';

import { useEffect, useState } from 'react';
import { registerVisit } from '@/services/home';

function CounterClient() {
    const [visit, setVisit] = useState<number | null>(null);

    useEffect(() => {
        async function fetchVisit() {
            try {
                const count = await registerVisit();
                setVisit(count);
            } catch (error) {
                console.error('Error fetching visit count:', error);
            }
        }

        fetchVisit();
    }, []);

    if (visit === null) return null;

    return (
        <div className='fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-md shadow-lg'>
            <p className='font-light text-sm'>Nº Visitas: {visit}</p>
        </div>
    );
}

export default CounterClient;