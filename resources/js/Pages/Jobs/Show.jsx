import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, MapPin, Clock, Briefcase, Users, Star, CalendarCheck, CheckCircle2, Trash2 } from 'lucide-react';

const statusStyles = {
    Open: 'bg-emerald-50 text-emerald-700',
    Closed: 'bg-gray-100   text-gray-500',
    Draft: 'bg-yellow-50  text-yellow-700',
};

export default function Show({ job }) {
    function deleteJob() {
        if (confirm(`Hapus lowongan "${job.title}"?`)) {
            router.delete(route('jobs.destroy', job.id));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title={job.title} />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* HEADER */}
                <div className="flex items-center gap-4">
                    <Link href={route('jobs.index')}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50">
                        <ArrowLeft size={17} />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
                        <p className="text-sm text-gray-400">{job.department}</p>
                    </div>
                    <button onClick={deleteJob}
                        className="flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-100">
                        <Trash2 size={14} /> Hapus
                    </button>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_280px]">

                    {/* LEFT */}
                    <div className="space-y-5">

                        {/* JOB DETAIL */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#16A085]/10">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[job.status]}`}>{job.status}</span>
                                <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700">{job.type}</span>
                            </div>

                            <div className="mt-4 grid gap-2 sm:grid-cols-2">
                                {job.location && <InfoRow icon={MapPin} label={job.location} />}
                                {job.deadline && <InfoRow icon={Clock} label={`Deadline: ${job.deadline}`} />}
                                {job.salary_range && <InfoRow icon={Briefcase} label={job.salary_range} />}
                            </div>

                            {job.description && (
                                <div className="mt-5">
                                    <p className="mb-2 text-xs font-bold text-gray-500">Deskripsi</p>
                                    <p className="whitespace-pre-line text-sm leading-relaxed text-gray-700">{job.description}</p>
                                </div>
                            )}

                            {job.requirements?.length > 0 && (
                                <div className="mt-5">
                                    <p className="mb-3 text-xs font-bold text-gray-500">Persyaratan</p>
                                    <ul className="space-y-2">
                                        {job.requirements.map((r, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#16A085]" />
                                                {r}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* MATCHED CANDIDATES */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#16A085]/10">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-900">Kandidat Cocok</h3>
                                <span className="text-xs text-gray-400">{job.matches?.length ?? 0} kandidat</span>
                            </div>
                            {job.matches?.length > 0 ? (
                                <div className="mt-4 space-y-3">
                                    {job.matches.map((m) => (
                                        <div key={m.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#E8F3EE] text-xs font-bold text-[#043927]">
                                                {m.candidate.initials}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-gray-800">{m.candidate.name}</p>
                                                <p className="text-[10px] text-gray-400">{m.candidate.role}</p>
                                            </div>
                                            <div className="flex items-center gap-1 text-xs font-bold text-[#043927]">
                                                <Star size={12} className="fill-[#043927]" />{m.score}%
                                            </div>
                                            <Link href={route('candidates.show', m.candidate.id)}
                                                className="text-[10px] font-semibold text-[#043927] hover:underline">
                                                Lihat
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-4 text-xs text-gray-400">Belum ada kandidat yang di-match.</p>
                            )}
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-5">

                        {/* QUICK STATS */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#16A085]/10">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">Overview</h3>
                            <div className="space-y-3">
                                <Stat icon={Users} label="Total Match" value={job.matches?.length ?? 0} />
                                <Stat icon={CalendarCheck} label="Total Interview" value={job.interviews?.length ?? 0} />
                            </div>
                        </div>

                        {/* ACTIONS */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-[#16A085]/10">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">Quick Actions</h3>
                            <div className="space-y-2">
                                <Link href={route('interviews.create')}
                                    className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                                    <CalendarCheck size={16} /> Jadwalkan Interview
                                </Link>
                                <Link href={route('candidates.index')}
                                    className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                                    <Users size={16} /> Lihat Semua Kandidat
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

function InfoRow({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon size={14} className="shrink-0 text-gray-400" />
            <span className="truncate">{label}</span>
        </div>
    );
}

function Stat({ icon: Icon, label, value }) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
                <Icon size={15} className="text-gray-400" />{label}
            </div>
            <span className="text-sm font-bold text-gray-900">{value}</span>
        </div>
    );
}
