"use server";

import { z } from "zod";
import postgres from "postgres";
import bcrypt from 'bcryptjs';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

{/* Users Page */}
const FormSchema = z.object({
    id: z.string().optional(),
    username: z.string({
        invalid_type_error: 'Please input a user.',
    }),
    password: z.string({
        invalid_type_error: 'Please input a password.',
    }),
    tahunLahir: z.string({
        invalid_type_error: 'Please input a valid birth year.',
    }),
});

const CreateUser = FormSchema.omit({ id: true });
const UpdateUser = FormSchema.omit({ id: true });

export type State = {
    errors?: {
        username?: string[];
        password?: string[];
        tahunLahir?: string[];
    };
    message?: string | null;
};

export async function createUser(prevState: State, formData: FormData) {
    // Validate form fields using Zod
    const validateFields = CreateUser.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        tahunLahir: formData.get('tahunLahir'),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create User.',
        };
    }

    // Prepare data for insertion into the database
    const { username, password, tahunLahir } = validateFields.data; // Ini berhubungan dengan variabel CreateUser
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert data into the database
    try {
        await sql`
            INSERT INTO users (username, password, tahun_lahir) 
            VALUES (${username}, ${hashedPassword}, ${tahunLahir})
        `;
    } catch (error) {
        // If a database error occurs, return a more specific error.
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create User.',
        };
    }

    // Revalidate the cache for the users page and redirect the user.
    revalidatePath('/dashboard/user');
    redirect('/dashboard/user');
}

export async function updateUser(id: string, prevState: State, formData: FormData) {
    const validateFields = UpdateUser.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
        tahunLahir: formData.get('tahunLahir'),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update User.',
        };
    }

    const { username, password, tahunLahir } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
            UPDATE users SET username = ${username}, password = ${hashedPassword}, tahun_lahir = ${tahunLahir} 
            WHERE id = ${id}
        `;
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to Update User.' };
    }

    revalidatePath('/dashboard/user');
    redirect('/dashboard/user');
}

export async function deleteUser(id: string) {
    await sql`DELETE FROM users WHERE id = ${id}`;
    revalidatePath('/dashboard/user');
}

{/* Admins Page */}
const FormSchemaAdmin = z.object({
    id: z.string().optional(),
    username: z.string({
        invalid_type_error: 'Please input an admin.',
    }),
    password: z.string({
        invalid_type_error: 'Please input a password.',
    }),
});

const CreateAdmin = FormSchemaAdmin.omit({ id: true });
const UpdateAdmin = FormSchemaAdmin.omit({ id: true });

export type AdminState = {
    errors?: {
        username?: string[];
        password?: string[];
    };
    message?: string | null;
};

export async function createAdmin(prevState: AdminState, formData: FormData) {
    const validateFields = CreateAdmin.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Admin.',
        };
    }

    const { username, password } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
            INSERT INTO admins (username_admin, password_admin) 
            VALUES (${username}, ${hashedPassword})
        `;
    } catch (error) {
        console.error('Database Error:', error);
        return {
            message: 'Database Error: Failed to Create Admin.',
        }
    }

    revalidatePath('/dashboard/admin');
    redirect('/dashboard/admin');
}

export async function updateAdmin(id: string, prevState: AdminState, formData: FormData) {
    const validateFields = UpdateAdmin.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    });

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Admin.',
        };
    }

    const { username, password } = validateFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await sql`
            UPDATE admins SET username_admin = ${username}, password_admin = ${hashedPassword} 
            WHERE id = ${id}
            `;
    } catch (error) {
        console.error('Database Error:', error);
        return { message: 'Database Error: Failed to Update Admin.'};
    }
    
    revalidatePath('/dashboard/admin');
    redirect('/dashboard/admin');
}

export async function deleteAdmin(id: string) {
    await sql`DELETE FROM admins WHERE id = ${id}`;
    revalidatePath('/dashboard/admin');
}

{/* Authenticate */}
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid credentials.";
                default:
                    return "Something went wrong.";
            }
        }
        throw error;
    }
}
