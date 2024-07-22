import { registerVisit } from '@/services/home';

export const dynamic = 'force-dynamic';

async function fetchData() {
    try {
        const visit = await registerVisit();
        return visit;
    } catch (error) {
        throw new Error('Error fetching data');
    }
}

async function Counter() {
    const visit = await fetchData();
    return (
        <div className='fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-md shadow-lg'>
            <p className='font-light text-sm'>Nº Visitas: {visit}</p>
        </div>
    )
}

export default Counter