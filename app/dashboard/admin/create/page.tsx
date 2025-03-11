import { Metadata } from "next";
import CreateFormAdmin from "@/app/ui/admins/create-form";

export const metadata: Metadata = {
    title: 'Create Admin',
}

export default async function Page() {
    return (
        <main>
            <h1>Create Admin</h1>
            <CreateFormAdmin />
        </main>
    );
}