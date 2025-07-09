 // Start of Selection
import connectDB from "@/config/database";
import Message from "@/config/message";
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export async function GET(req) {
    try {
        await connectDB();
        const session = await getSessionUser();
        if (!session || !session.user.id) {
            return new Response(JSON.stringify({ message: 'You must be logged in to view messages' }), { status: 401 });
        }

        const { user } = session;
        const readMessages = await Message.find({ recipient: user.id, read: true })
            .populate('property', 'name')
            .populate('sender', 'username')
            .sort({ createdAt: -1 });
        const unreadMessages = await Message.find({ recipient: user.id, read: false })
            .populate('property', 'name')
            .populate('sender', 'username')
            .sort({ createdAt: -1 });

        const messages = [...unreadMessages, ...readMessages];
        return new Response(JSON.stringify({ messages }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Failed to get messages' }), { status: 500 });
    }
}

export async function POST(req) {
    try {
        await connectDB();
        const session = await getSessionUser();

        if (!session || !session.user.id) {
            return new Response(JSON.stringify({ message: 'You must be logged in to send a message' }), { status: 401 });
        }

        const { user } = session;
        const { name, email, phone, message, recipient, property } = await req.json();

        if (user.id === recipient) {
            return new Response(JSON.stringify({ message: 'You cannot send a message to yourself' }), { status: 400 });
        }

        const messageData = new Message({
            name,
            email,
            phone,
            body: message,
            recipient,
            property,
            sender: user.id
        });
        await messageData.save();
        return new Response(JSON.stringify({ message: 'Message sent successfully' }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response(JSON.stringify({ message: 'Failed to send message' }), { status: 500 });
    }
} 