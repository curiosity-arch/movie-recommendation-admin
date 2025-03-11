"use client";

import { AdminId } from "@/app/lib/definitions";
import Link from "next/link";
import { Button } from "../button";
import { updateAdmin, AdminState } from "@/app/lib/actions";
import { useActionState } from "react";
import styles from "@/public/styles/edit-form.module.css";
import { error } from "console";

export default function EditFormAdmin({ adminById }: { adminById: AdminId }) {
    const initialState: AdminState = { message: null, errors: {} };
    const updateAdminWithId = updateAdmin.bind(null, adminById.id);
    const [ adminState, formAction ] = useActionState(updateAdminWithId, initialState);

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
                        placeholder={adminById.username_admin}
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
                <Button type="submit" className={styles.edit}>Edit Admin</Button>
            </div>
        </form>
    );
}