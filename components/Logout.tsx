'use client'

import { signOut } from "@/auth";
import { Button } from "./ui/button";

export default function Logout() {
    return (
        <Button onClick={async () => {
            await signOut({ redirect: true, redirectTo: '/login' });
        }}>Logout</Button>
    )
}