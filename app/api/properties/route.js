import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudniry';

// GET
export const GET = async (request) => {
    try {
        await connectDB();
        const searchParams = new URLSearchParams(request.nextUrl.searchParams);
        for (const [key, value] of searchParams.entries()) {
            searchParams.set(key.toLowerCase(), value.toLowerCase());
        }
        const page = searchParams.get('page') || 1;
        const pageSize = searchParams.get('pagesize') || 6;
        const skip = (page - 1) * pageSize;

        const totalItems = await Property.countDocuments();

        const properties = await Property.find({}).skip(skip).limit(pageSize);

        return new Response(JSON.stringify({ properties, totalItems }), { status: 200 });
    } catch (error) {
        console.error('Error fetching properties:', error);
        return new Response('Failed to fetch properties', { status: 500 });
    }
}

export const POST = async (request) => {
    try {
        await connectDB();

        const sessionUser = await getSessionUser();

        if (!sessionUser || !sessionUser.userId) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { userId } = sessionUser;

        const formData = await request.formData();
        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images').filter(image => image.name !== '');

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
            images: images,
        }

        // Convert rate values to numbers if they exist
        // if (propertyData.rates.weekly) {
        //     propertyData.rates.weekly = Number(propertyData.rates.weekly);
        // }
        // if (propertyData.rates.monthly) {
        //     propertyData.rates.monthly = Number(propertyData.rates.monthly);
        // }
        // if (propertyData.rates.nightly) {
        //     propertyData.rates.nightly = Number(propertyData.rates.nightly);
        // }

        const imageUploadPromises = [];

        if (!process.env.CLOUDINARY_CLOUD_NAME) {
            throw new Error('Must supply cloud_name');
        }

        for (const image of images) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer));
            const imageData = Buffer.from(imageArray);

            const imageBase64 = imageData.toString('base64');
            const result = await cloudinary.uploader.upload(`data:image/jpeg;base64,${imageBase64}`, { 
                folder: 'propertypal'
            });
            imageUploadPromises.push(result.secure_url);
        }

        const uploadedImages = await Promise.all(imageUploadPromises);
        propertyData.images = uploadedImages;

        const property = await Property.create(propertyData);
        await property.save();
        return Response.redirect(`${process.env.NEXTAUTH_URL}/properties/${property._id}`);
    } catch (error) {
        console.error('Error creating property:', error);
        return new Response(JSON.stringify({ error: 'Failed to create property' }), { status: 500 });
    }
}