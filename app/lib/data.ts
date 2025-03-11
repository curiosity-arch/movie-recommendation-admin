import type { User, Admin, UserId, AdminId } from "./definitions";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function fetchUser() {
    try {
        const data = await sql<User[]>`SELECT * FROM users`;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user data');
    }
}

export async function fetchAdmin() {
    try {
        const data = await sql<Admin[]>`SELECT * FROM admins`;

        return data;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch admin data');
    }
}

export async function fetchUserById(id: string) {
    try {
        const data = await sql<UserId[]>`
            SELECT 
                users.id,
                users.username,
                users.password,
                users.tahun_lahir 
            FROM users 
            WHERE users.id = ${id};
        `;

        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user data.');
    }
}

export async function fetchAdminById(id: string) {
    try {
        const data = await sql<AdminId[]>`
            SELECT
                admins.id,
                admins.username_admin,
                admins.password_admin
            FROM admins 
            WHERE admins.id = ${id}
        `;

        return data[0];
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch admin data.');
    }
}