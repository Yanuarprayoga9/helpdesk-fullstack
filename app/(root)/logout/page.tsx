"use client";

import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const signOut = async () => {
            try {
                const csrfToken = await fetch('/api/auth/csrf')
                    .then(res => res.json())
                    .then(data => data.csrfToken);

                await fetch('/api/auth/signout?callbackUrl=/api/auth/session', {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ csrfToken }) // Perbaikan body request
                });

            } catch (error) {
                console.error("Logout error:", error);
            }
        };

        signOut();
    }, []);

    return <div>halo</div>;
}
