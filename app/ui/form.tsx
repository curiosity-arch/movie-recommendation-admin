"use client";

import styles from "@/public/styles/styles.module.css";
import buttonSignIn from "@/public/styles/button.module.css";

import { useActionState } from "react";
import { authenticate } from "@/app/lib/actions";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/admin/dashboard';
    const [errorMessage, formAction] = useActionState(
        authenticate,
        undefined,
    );

    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 3000));
        setLoading(false);
    };

    return (
        <div>
            <form
                action={formAction}
                onSubmit={handleLogin}
                className={styles.form}
            >
                <h2 className={styles.h2}>Login</h2>
                <label htmlFor='username'>
                    Username
                </label>
                <input 
                    type='text'
                    name='username'
                    id='username'
                    placeholder='Input username'
                    required
                />
                <label htmlFor='password'>
                    Password
                </label>
                <input 
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Input Password'
                    minLength={6}
                    required
                />
                <br />
                <input type="hidden" name='redirectTo' value={callbackUrl}/>
                <button
                    type="submit"
                    disabled={loading}
                    className={buttonSignIn.buttonSignIn}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
                <div>
                    {errorMessage && (
                        <>
                            <p>{errorMessage}</p>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
}