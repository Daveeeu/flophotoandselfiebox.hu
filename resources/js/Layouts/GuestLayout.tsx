import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 py-8">
            <div className="w-full max-w-md">
                <div className="text-center">
                    <Link href="/" className="inline-flex flex-col items-center">
                        <ApplicationLogo className="h-16 w-16 fill-current text-cyan-300" />
                        <span className="mt-4 text-sm uppercase tracking-[0.35em] text-cyan-300">
                            Flophoto
                        </span>
                        <span className="mt-2 text-3xl font-semibold text-white">
                            Admin belépés
                        </span>
                    </Link>
                </div>

                <div className="mt-8 overflow-hidden rounded-[2rem] border border-white/10 bg-white px-6 py-6 shadow-2xl">
                    {children}
                </div>
            </div>
        </div>
    );
}
