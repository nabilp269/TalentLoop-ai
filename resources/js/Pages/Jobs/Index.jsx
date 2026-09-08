import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, Briefcase, MapPin, Clock, Users, ChevronRight, Trash2 } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const statusStyles = {
    Open: 'bg-emerald-50 text-emerald-700',
    Closed: 'bg-gray-100   text-gray-500',
    Draft: 'bg-yellow-50  text-yellow-700',
};

const typeStyles = {
    'Full-time': 'bg-blue-50   text-blue-700',
    'Part-time': 'bg-purple-50 text-purple-700',
    'Contract': 'bg-orange-50 text-orange-700',
    'Internship': 'bg-pink-50   text-pink-700',
};

export default function Index({ jobs = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [status, setStatus] = useState(filters.status ?? 'All');

    const visible = jobs.filter((j) => {
        const q = search.toLowerCase();
        const matchSearch = j.title.toLowerCase().includes(q) ||
            (j.department ?? '').toLowerCase().includes(q) ||
            (j.location ?? '').toLowerCase().includes(q);
        const matchStatus = status === 'All' || j.status === status;
        return matchSearch && matchStatus;
    });

    function deleteJob(id, title) {
        if (confirm(`Hapus lowongan "${title}"?`)) {
            router.delete(route('jobs.destroy', id), { preserveScroll: true });
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title="Jobs / Vacancies" />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* HEADER */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-medium text-[#16A085]">Vacancy Management</p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Jobs / Vacancies</h1>
                        <p className="mt-1 text-sm text-gray-400">Kelola semua lowongan pekerjaan aktif.</p>
                    </div>
                    <Link href={route('jobs.create')}
                        className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-gradient-to-r from-[#16A085] to-[#043927] px-5 py-2.5 text-xs font-bold text-white shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[#16A085]/30">
                        <Plus size={14} /> Buat Lowongan
                    </Link>
                </div>

                {/* STATS */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                    {[
                        { label: 'Total', value: jobs.length },
                        { label: 'Open', value: jobs.filter(j => j.status === 'Open').length },
                        { label: 'Closed', value: jobs.filter(j => j.status === 'Closed').length },
                    ].map(({ label, value }) => (
                        <div key={label} className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                            <p className="text-[10px] font-medium text-gray-400">{label}</p>
                            <p className="mt-1 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-tr from-[#16A085] to-[#043927]">{value}</p>
                        </div>
                    ))}
                </div>

                {/* SEARCH + FILTER */}
                <div className="mt-4 flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:flex-row">
                    <div className="relative flex-1">
                        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                            placeholder="Cari lowongan, departemen, atau lokasi..."
                            className="w-full rounded-xl border-gray-200 py-2.5 pl-11 pr-4 text-sm focus:border-[#043927] focus:ring-[#043927]" />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-0.5">
                        {['All', 'Open', 'Closed', 'Draft'].map((s) => (
                            <button key={s} onClick={() => setStatus(s)}
                                className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${status === s ? 'bg-[#043927] text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                    }`}>
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                {/* JOB LIST */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {visible.map((job) => (
                        <div key={job.id}
                            className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#65D6B5]/50 hover:shadow-xl hover:shadow-[#16A085]/10">

                            <div className="flex items-start justify-between gap-2">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E4F3EE] text-[#043927]">
                                    <Briefcase size={20} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h3 className="truncate text-sm font-bold text-gray-900">{job.title}</h3>
                                    <p className="mt-0.5 text-[11px] text-gray-400">{job.department ?? 'No Department'}</p>
                                </div>
                                <button onClick={() => deleteJob(job.id, job.title)}
                                    className="shrink-0 rounded-lg p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-400">
                                    <Trash2 size={15} />
                                </button>
                            </div>

                            <div className="mt-4 space-y-1.5">
                                {job.location && (
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <MapPin size={13} className="shrink-0" />{job.location}
                                    </div>
                                )}
                                {job.deadline && (
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <Clock size={13} className="shrink-0" />Deadline: {job.deadline}
                                    </div>
                                )}
                                {job.salary_range && (
                                    <div className="flex items-center gap-2 text-xs text-gray-400">
                                        <span className="text-gray-300">Rp</span>{job.salary_range}
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[job.status]}`}>
                                    {job.status}
                                </span>
                                <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${typeStyles[job.type] ?? 'bg-gray-50 text-gray-500'}`}>
                                    {job.type}
                                </span>
                            </div>

                            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                    <Users size={13} />{job.matches_count ?? 0} kandidat cocok
                                </div>
                                <Link href={route('jobs.show', job.id)}
                                    className="flex items-center gap-1 text-xs font-semibold text-[#043927] hover:underline">
                                    Detail <ChevronRight size={13} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {visible.length === 0 && (
                    <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
                        <Briefcase size={32} className="mx-auto text-gray-300" />
                        <h3 className="mt-4 text-sm font-semibold text-gray-700">Belum ada lowongan</h3>
                        <p className="mt-1 text-xs text-gray-400">Klik "Buat Lowongan" untuk menambahkan.</p>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}
