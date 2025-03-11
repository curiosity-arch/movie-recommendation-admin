import { Metadata } from "next";
import LoginForm from "./ui/form";
import styles from "@/public/styles/styles.module.css";

export const metadata: Metadata = {
    title: 'Login Admin Page',
}

export default function LoginAdmin() {
    return (
        <div className={styles.content}>
            <div>
                <h1>Selamat Datang di Halaman Login Admin</h1>
            </div>
            <div className={styles.main}>
                <section className={styles.section}>
                    <p>Halo, Admin!</p>
                    <p>Selamat datang di panel admin sistem rekomendasi film berbasis <strong>K-Means Clustering. </strong> 
                        Di sini, Anda dapat mengelola data admin dan pengguna untuk memastikan sistem berjalan dengan lancar.
                    </p>
                    <ul>
                        <li><strong>Kelola Data Admin</strong> - Tambah, edit, atau hapus akun admin.</li>
                        <li><strong>Kelola Data Pengguna</strong> - Pantau, edit, atau hapus akun pengguna.</li>
                    </ul>
                </section>
                <section className={styles.section}>
                    <LoginForm />
                </section>
            </div>
            <div>
                <p>Sistem Rekomendasi Film &copy; 2025 - Fahril Ilham Pangestu</p>
            </div>
        </div>
    );
}