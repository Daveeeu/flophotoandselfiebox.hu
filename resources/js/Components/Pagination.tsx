import { Link } from '@inertiajs/react';

type PaginationLink = {
    url: string | null;
    label: string;
    active: boolean;
};

type PaginationProps = {
    links: PaginationLink[];
};

export default function Pagination({ links }: PaginationProps) {
    if (links.length <= 3) {
        return null;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {links.map((link) =>
                link.url ? (
                    <Link
                        key={`${link.label}-${link.url}`}
                        href={link.url}
                        className={`rounded-2xl px-4 py-2 text-sm transition ${
                            link.active
                                ? 'bg-cyan-500 text-white'
                                : 'border border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:text-slate-900'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={`${link.label}-disabled`}
                        className="cursor-not-allowed rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-400"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ),
            )}
        </div>
    );
}
