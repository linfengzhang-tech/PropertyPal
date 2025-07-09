const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;
export const dynamic = 'force-dynamic';

async function fetchProperties() {
    try {
        if (!apiDomain) {
            return [];
        }
        const res = await fetch(`${apiDomain}/api/properties`, {
            cache: 'no-store',
        });

        console.log(res);

        if (!res.ok) {
            throw new Error('Failed to fetch properties');
        }

        const data = await res.json();
        return data.properties;
    } catch (error) {
        console.error('Error fetching properties:', error);
        return [];
    }
}

async function fetchProperty(id) {
    try {
        const res = await fetch(`${apiDomain}/api/properties/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching property:', error);
        return null;
    }
}

export { fetchProperties, fetchProperty };