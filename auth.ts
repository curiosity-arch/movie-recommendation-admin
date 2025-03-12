import NextAuth from 'next-auth';
import { authAdminConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import type { Admin } from './app/lib/definitions';
import bcrypt from 'bcryptjs';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function getAdmin(username: string): Promise<Admin | undefined> {
  try {
    const admin = await sql<Admin[]>`SELECT * FROM admins WHERE username_admin=${username}`;
    return admin[0];
  } catch (error) {
    console.error('Failed to fetch user: ', error);
    throw new Error('Failed to fetch user.');
  }
}
 
export const { auth, signIn, signOut } = NextAuth({
  ...authAdminConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const admin = await getAdmin(username);

          if (!admin) return null;
          
          const passwordsMatch = await bcrypt.compare(password, admin.password_admin);
          if (passwordsMatch) return admin;
        }

        console.log('Invalid credentials');
        return null
      },
    }),
  ],
});
