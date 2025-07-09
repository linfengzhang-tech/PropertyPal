import connectDB from "@/config/database";
import Property from "@/models/Property";

export async function GET(request) {
    try {
        await connectDB();
        console.log('Connected to database');
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location');
        const propertyType = searchParams.get('propertyType');

        const locationRegex = new RegExp(location, 'i');

        let query = {
            $or: [
                { location: locationRegex },
                { description: locationRegex },
                { 'location.street': locationRegex },
                { 'location.city': locationRegex },
                { 'location.state': locationRegex },
                { 'location.zipcode': locationRegex },
            ],
        };

        if (propertyType && propertyType !== 'All') {
            const propertyTypeRegex = new RegExp(propertyType, 'i');
            query.type = propertyTypeRegex;
        }

        const properties = await Property.find(query);
        console.log(properties);
        return new Response(JSON.stringify({ properties }), { status: 200 });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return new Response('Error fetching properties', { status: 500 });
    }
}