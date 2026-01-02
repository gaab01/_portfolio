
import { Code2 } from 'lucide-react';

export function Footer() {
    return (
        <footer className="py-8 border-t border-white/5 bg-black/80 backdrop-blur-sm">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <Code2 className="text-accent h-5 w-5" />
                    <span className="font-bold text-lg tracking-tight text-white">
                        Wesley <span className="text-accent">Gabriel</span>
                    </span>
                </div>

                <p className="text-gray-500 text-sm">
                    © {new Date().getFullYear()} Todos os direitos reservados.
                </p>

                <div className="flex items-center gap-6">
                    <a href="#" className="text-gray-500 hover:text-accent transition-colors text-sm">Privacidade</a>
                    <a href="#" className="text-gray-500 hover:text-accent transition-colors text-sm">Termos</a>
                </div>
            </div>
        </footer>
    );
}
