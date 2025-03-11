"use client";

import Link from "next/link";
import { Button } from "../button";
import { createAdmin, AdminState } from "@/app/lib/actions";
import { useActionState } from "react";
import styles from "@/public/styles/create-form.module.css";

export default function CreateFormAdmin() {
    const initialState: AdminState = { message: null, errors: {} };
    const [ adminState, formAction ] = useActionState(createAdmin, initialState);

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
                        {adminState.errors?.username &&
                            adminState.errors.username.map((error: string) => (
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
                </div>
            </div>
            <div className={styles.button}>
                <Link href="/dashboard/admin" className={styles.cancel}>Cancel</Link>
                <Button type="submit" className={styles.create}>Create Admin</Button>
            </div>
        </form>
    );
}