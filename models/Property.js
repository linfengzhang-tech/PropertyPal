import { Schema, model, models } from 'mongoose';

const propertySchema = new Schema({
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'Owner is required'] },
    name: { type: String, required: [true, 'Name is required'] },
    type: { type: String, required: [true, 'Type is required'] },
    description: { type: String, required: [true, 'Description is required'] },
    location: { 
        street: { type: String, required: [true, 'Street is required'] },
        city: { type: String, required: [true, 'City is required'] },
        state: { type: String, required: [true, 'State is required'] },
        zipcode: { type: String, required: [true, 'Zipcode is required'] },
    },
    bedrooms: { type: Number, required: [true, 'Bedrooms is required'] },
    bathrooms: { type: Number, required: [true, 'Bathrooms is required'] },
    square_feet: { type: Number, required: [true, 'Square feet is required'] },
    amenities: [
        {
            type: String
        }
    ],
    rates: {
        nightly: {
            type: Number
        },
        weekly: {
            type: Number
        },
        monthly: {
            type: Number
        },
    },
    seller_info: {
        name: { type: String, required: [true, 'Name is required'] },
        phone: { type: String, required: [true, 'Phone is required'] },
        email: { type: String, required: [true, 'Email is required'] },
    },
    images: [
        {
            type: String
        }
    ],
    is_featured: { type: Boolean, default: false },
}, {
    timestamps: true,
});

const Property = models.Property || model('Property', propertySchema);

export default Property;