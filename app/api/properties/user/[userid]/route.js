import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET
export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const { userid } = await params;

        if (!userid) {
            return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
        }

        const properties = await Property.find({ owner: userid })

        return new Response(JSON.stringify({ properties }), { status: 200 });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch properties' }), { status: 500 });
    }
}
