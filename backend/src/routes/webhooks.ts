import express from 'express';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/clerk', express.raw({ type: 'application/json' }), async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
  }

  // Get the headers
  const svix_id = req.headers['svix-id'] as string;
  const svix_timestamp = req.headers['svix-timestamp'] as string;
  const svix_signature = req.headers['svix-signature'] as string;

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).json({
      success: false,
      message: 'Error occured -- no svix headers',
    });
  }

  // Get the body
  const payload = req.body;
  const body = payload.toString('utf8');

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: any;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return res.status(400).json({
      success: false,
      message: 'Error occured',
    });
  }

  // Handle the webhook
  const eventType = evt.type;

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;
    
    const email = email_addresses[0]?.email_address;
    
    if (email) {
      await prisma.user.upsert({
        where: { clerkId: id },
        update: {
          email,
          firstName: first_name,
          lastName: last_name,
          avatarUrl: image_url,
        },
        create: {
          clerkId: id,
          email,
          firstName: first_name,
          lastName: last_name,
          avatarUrl: image_url,
        }
      });
      console.log(`User ${id} synchronized in database`);
    }
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data;
    await prisma.user.delete({
      where: { clerkId: id }
    });
    console.log(`User ${id} deleted from database`);
  }

  return res.status(200).json({
    success: true,
    message: 'Webhook received',
  });
});

export default router;
