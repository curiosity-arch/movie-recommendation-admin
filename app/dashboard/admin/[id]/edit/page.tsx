import { Metadata } from "next";
import { fetchAdminById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import EditFormAdmin from "@/app/ui/admins/edit-form";

export const metadata: Metadata = {
    title: 'Edit Admin',
}

export default async function EditAdminPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const id = params.id;
    const [adminId] = await Promise.all([
        fetchAdminById(id),
    ]);

    if (!adminId) {
        notFound();
    }

    return (
        <main>
            <h1>Edit Admin</h1>
            <EditFormAdmin adminById={adminId} />
        </main>
    );
}