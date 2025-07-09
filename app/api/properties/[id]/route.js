import Property from '@/models/Property';
import connectDB from '@/config/database';
import { getServerSession } from 'next-auth';
import { getSessionUser } from '@/utils/getSessionUser';

export const GET = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = await params;
        const property = await Property.findById(id);
        if (!property) {
            return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
        }
        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.error('Error fetching property:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch property' }), { status: 500 });
    }
}

export const DELETE = async (request, { params }) => { 
    try {
        const session = await getServerSession();
        if (!session) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }
        const { userId } = session;
        await connectDB();
        const { id } = await params;
        const property = await Property.findById(id);

        if (!property) {
            return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
        }
        if (property.owner.toString() !== userId) {
            await Property.findByIdAndDelete(id);
            return Response.redirect(`${process.env.NEXTAUTH_URL}/profile?deleted=true`);
        } else {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }
    } catch (error) {
        console.error('Error deleting property:', error);
        return new Response(JSON.stringify({ error: 'Failed to delete property' }), { status: 500 });
    }
}

export const PUT = async (request, { params }) => {
    try {
        await connectDB();
        const { id } = await params;
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }
        const { userId } = sessionUser;

        const property = await Property.findById(id);
        if (!property) {
            return new Response(JSON.stringify({ error: 'Property not found' }), { status: 404 });
        }

        if (property.owner.toString() !== userId) {
            return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
        }

        const formData = await request.formData();
        const amenities = formData.getAll('amenities');

        const propertyData = {
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            bedrooms: Number(formData.get('beds')),
            bathrooms: Number(formData.get('baths')),
            square_feet: Number(formData.get('square_feet')),
            amenities: amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly')
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        };  

        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

        return new Response(JSON.stringify(updatedProperty), { status: 200 });
    } catch (error) {
        console.error('Error updating property:', error);
        return new Response(JSON.stringify({ error: 'Failed to update property' }), { status: 500 });
    }
}