import { Metadata } from "next";
import CreateFormUser from "@/app/ui/users/create-form";

export const metadata: Metadata = {
    title: 'Create User',
}

export default async function Page() {
    return (
        <main>
            <h1>Create User</h1>
            <CreateFormUser />
        </main>
    );
}