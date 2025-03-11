"use client";

import Link from "next/link";
import { Button } from "../button";
import { createUser, State } from "@/app/lib/actions";
import { useState, useActionState } from "react";
import styles from "@/public/styles/create-form.module.css";

export default function CreateFormUser() {
    const initialState: State = { message: null, errors: {} };
    const [ state, formAction ] = useActionState(createUser, initialState);

    // Mendapatkan tahun saat ini
    const currentYear = new Date().getFullYear();
    
    // Membuat array tahun dari 55 tahun terakhir
    const years = Array.from({ length: 55 }, (_, i) => currentYear - i);

    // State untuk menyimpan tahun yang dipilih
    const [selectedYear, setSelectedYear] = useState<number>(currentYear);

    // Menangani perubahan tahun
    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(Number(event.target.value));
    };

    return (
        <form action={formAction} className={styles.form}>
            <div className={styles.main}>
                <div className={styles.content}>
                    {/* Username */}
                    <label htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="Input Username"
                        required
                    />
                    <div>
                        {state.errors?.username &&
                            state.errors.username.map((error: string) => (
                                <p key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>

                    {/* Password */}
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Input Password"
                        minLength={6}
                        required
                    />

                    {/* Tahun Lahir */}
                    <label htmlFor="tahunLahir">
                        Tahun Lahir
                    </label>
                    <select
                        id="tahunLahir"
                        name="tahunLahir"
                        value={selectedYear}
                        onChange={handleYearChange}
                        required
                    >
                        <option disabled>Pilih Tahun Lahir</option>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <div>
                        {state.errors?.tahunLahir &&
                            state.errors.tahunLahir.map((error: string) => (
                                <p key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                </div>
            </div>
            <div className={styles.button}>
                <Link href="/dashboard/user" className={styles.cancel}>Cancel</Link>
                <Button type="submit" className={styles.create}>Create User</Button>
            </div>
        </form>
    );
}