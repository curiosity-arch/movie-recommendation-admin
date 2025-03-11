import { Metadata } from "next";
import { fetchUserById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditFormUser from "@/app/ui/users/edit-form";

export const metadata: Metadata = {
    title: 'Edit User',
}

export default async function EditUserPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [userId] = await Promise.all([
        fetchUserById(id),
    ]);

    if (!userId) {
        notFound();
    }

    return (
        <main>
            <h1>Edit User</h1>
            <EditFormUser userById={userId} />
        </main>
    );
}