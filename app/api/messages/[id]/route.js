import connectDB from '@/config/database';
import Message from '@/config/message';
import { getSessionUser } from '@/utils/getSessionUser';

// export const dynamic = 'force-dynamic';

export async function PUT(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const session = await getSessionUser();
        if (!session || !session.user.id) {
            return new Response(JSON.stringify({ message: 'You must be logged in to view messages' }), { status: 401 });
        }

        const { user } = session;
        const message = await Message.findById(id);
        if (!message) {
            return new Response(JSON.stringify({ message: 'Message not found' }), { status: 404 });
        }

        if (message.recipient.toString() !== user.id) {
            return new Response(JSON.stringify({ message: 'You are not authorized to update this message' }), { status: 403 });
        }

        message.read = !message.read;
        await message.save();
        return new Response(JSON.stringify({ message }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Failed to get message' }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        await connectDB();
        const { id } = await params;
        const session = await getSessionUser();
        if (!session || !session.user.id) {
            return new Response(JSON.stringify({ message: 'You must be logged in to delete messages' }), { status: 401 });
        }

        const { user } = session;
        const message = await Message.findById(id);
        if (!message) {
            return new Response(JSON.stringify({ message: 'Message not found' }), { status: 404 });
        }

        if (message.recipient.toString() !== user.id) {
            return new Response(JSON.stringify({ message: 'You are not authorized to delete this message' }), { status: 403 });
        }

        await message.deleteOne();
        return new Response(JSON.stringify({ message: 'Message deleted successfully' }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Failed to delete message' }), { status: 500 });
    }
}
