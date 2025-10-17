import { supabaseAdmin } from '../../config';

async function seedAuth() {
  console.log('🌱 Seeding auth users...');

  const users = [
    { email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { email: 'owner@example.com', password: 'owner123', role: 'owner' },
  ];

  for (const user of users) {
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: user.email,
      password: user.password,
      email_confirm: true,
      user_metadata: { role: user.role },
    });

    if (error) console.error(`❌ Failed to create ${user.email}:`, error);
    else console.log(`✅ Created user:`, data.user?.email);
  }
}

seedAuth().catch(console.error);
