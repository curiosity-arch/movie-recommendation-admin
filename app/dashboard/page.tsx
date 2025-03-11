import { Metadata } from "next";
import styles from "@/public/styles/mainContent.module.css";

export const metadata: Metadata = {
    title: 'Dashboard Admin',
}

export default async function Page() {
    return (
        <div>
            <h1>Home</h1>
            <p className={styles.home}>Selamat datang di halaman admin sistem rekomendasi film! <br />
                Di sini, Anda dapat mengelola data admin dan pengguna untuk memastikan sistem berjalan dengan lancar. 
                Pastikan setiap akun dikelola dengan baik agar keamanan dan kenyamanan tetap terjaga. 
                Dengan fitur yang tersedia, Anda dapat menambah, mengedit, atau menghapus data sesuai kebutuhan. 
                Gunakan akses ini dengan bijak untuk menjaga sistem tetap terorganisir dan optimal.
            </p>
        </div>
    )
}