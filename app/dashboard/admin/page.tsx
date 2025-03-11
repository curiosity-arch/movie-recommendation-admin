import { Metadata } from "next";
import { fetchAdmin } from "@/app/lib/data";
import { CreateAdmin, DeleteAdmin, UpdateAdmin } from "@/app/ui/admins/button";
import styles from "@/public/styles/mainContent.module.css";

export const metadata: Metadata = {
    title: 'Admin Page',
}

export default async function Page() {
    const admins = await fetchAdmin();

    return (
        <div className={styles.overflow}>
            <div className={styles.header}>
                <h1>Admin</h1>
                <CreateAdmin />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Id</th>
                        <th className={styles.th}>Username</th>
                        <th className={styles.th}>Password</th>
                        <th className={styles.th}>Edit</th>
                        <th className={styles.th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map((admin) => (
                        <tr key={admin.id}>
                            <td className={styles.td}>{admin.id}</td>
                            <td className={styles.td}>{admin.username_admin}</td>
                            <td className={styles.td}>{admin.password_admin}</td>
                            <td className={styles.button}>
                                <UpdateAdmin id={admin.id} />
                            </td>
                            <td className={styles.button}>
                                <DeleteAdmin id={admin.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}