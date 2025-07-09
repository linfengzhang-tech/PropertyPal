 // Start of Selection
 import connectDB from "@/config/database";
 import Message from "@/config/message";
 import { getSessionUser } from '@/utils/getSessionUser';
 
//  export const dynamic = 'force-dynamic';
 
 export async function GET(req) {
     try {
         await connectDB();
         const session = await getSessionUser();
         if (!session || !session.user.id) {
             return new Response(JSON.stringify({ message: 'You must be logged in to view messages' }), { status: 401 });
         }

         const { user } = session;
         const unreadMessages = await Message.countDocuments({ recipient: user.id, read: false })
 
         return new Response(JSON.stringify({ count: unreadMessages }), { status: 200 });
     } catch (error) {
         console.log(error);
         return new Response(JSON.stringify({ message: 'Failed to get messages' }), { status: 500 });
     }
 }
