
'use client';

import { NavBar } from '@/components/ui/nav-bar';
import { Home, User, FolderGit2, Zap, Mail, Code2 } from 'lucide-react';

export function Navbar() {
    const navItems = [
        { name: 'Início', url: '#hero', icon: Home },
        { name: 'Sobre', url: '#about', icon: User },
        { name: 'Projetos', url: '#projects', icon: FolderGit2 },
        { name: 'Serviços', url: '#services', icon: Zap },
        { name: 'Contato', url: '#contact', icon: Mail },
    ];

    return (
        <>
            <div className="fixed top-6 left-6 z-50 hidden md:flex items-center gap-2 group">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 group-hover:border-accent/50 transition-colors">
                    <Code2 className="text-accent h-6 w-6" />
                </div>
                <span className="font-bold text-xl tracking-tight text-white">
                    wesley<span className="text-accent">.dev</span>
                </span>
            </div>

            <NavBar items={navItems} />
        </>
    );
}
