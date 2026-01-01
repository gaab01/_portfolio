"use client"

import { Github, Linkedin } from "lucide-react"

const socials = [
    {
        name: "GitHub",
        href: "https://github.com/gaab01",
        icon: Github,
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/wesley-gabriel-sousa-126329280",
        icon: Linkedin,
    },
]

export function SocialIcons() {
    return (
        <div className="flex items-center gap-3">
            {socials.map((social) => {
                const Icon = social.icon
                return (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.name}
                        style={{ pointerEvents: 'auto', cursor: 'pointer', zIndex: 9999 }}
                        className="group p-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(30,77,255,0.3)]"
                    >
                        <Icon className="w-5 h-5" />
                    </a>
                )
            })}
        </div>
    )
}
