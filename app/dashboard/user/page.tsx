import { Metadata } from "next";
import { fetchUser } from "@/app/lib/data";
import { CreateUser, DeleteUser, UpdateUser } from "@/app/ui/users/button";
import styles from "@/public/styles/mainContent.module.css";

export const metadata: Metadata = {
    title: 'User Page',
}

export default async function Page() {
    const users = await fetchUser();
    
    return (
        <div className={styles.overflow}>
            <div className={styles.header}>
                <h1>User</h1>
                <CreateUser />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.th}>Id</th>
                        <th className={styles.th}>Username</th>
                        <th className={styles.th}>Password</th>
                        <th className={styles.th}>Tahun Lahir</th>
                        <th className={styles.th}>Edit</th>
                        <th className={styles.th}>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className={styles.tr}>
                            <td className={styles.td}>{user.id}</td>
                            <td className={styles.td}>{user.username}</td>
                            <td className={styles.td}>{user.password}</td>
                            <td className={styles.td}>{user.tahun_lahir}</td>
                            <td className={styles.button}>
                                <UpdateUser id={user.id} />
                            </td>
                            <td className={styles.button}>
                                <DeleteUser id={user.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};