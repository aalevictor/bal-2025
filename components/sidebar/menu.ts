import { Home, LucideIcon, Users } from "lucide-react";

export interface menuItem {
    title: string
    url: string
    icon: LucideIcon
    permission?: string
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
}
export const menu: menuItem[] = [
    {
        title: "Início",
        url: "/",
        icon: Home,
    },
    {
        title: "Usuários",
        url: "/usuarios",
        icon: Users,
        permission: "read_usuarios",
    },
]