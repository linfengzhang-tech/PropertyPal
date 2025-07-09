const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

async function fetchProperties() {
    try {
        if (!apiDomain) {
            throw new Error('API domain is not set');
        }
        const res = await fetch(`${apiDomain}/api/properties`, {
            cache: 'no-store',
        });

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