"use client"

import { NavBar } from "./nav-bar"
import { Home, User, Briefcase, Cpu, Mail, Rocket } from "lucide-react"

const navItems = [
    { name: "Início", url: "#hero", icon: Home },
    { name: "Sobre", url: "#about", icon: User },
    { name: "Projetos", url: "#projects", icon: Briefcase },
    { name: "Serviços", url: "#services", icon: Cpu },
    { name: "Contato", url: "#contact", icon: Mail },
    { name: "Contratar", url: "#contact", icon: Rocket },
]

export function SiteNav() {
    return <NavBar items={navItems} />
}
