import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LayoutUsuarios({ children }: { children: React.ReactNode }) {
    const session = await auth();
    if (!session) redirect('/login');
    if (session.user.permissions.find(permission => permission.name === 'read_usuarios')) return children;
    redirect('/');
};