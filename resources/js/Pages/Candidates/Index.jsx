import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    Plus,
    SlidersHorizontal,
    MapPin,
    Briefcase,
    MoreHorizontal,
    Star,
    ChevronDown,
    Brain,
    Send,
    Sparkles,
    Zap,
    Upload,
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const statusStyles = {
    Available: 'bg-emerald-50 text-emerald-700',
    Interview: 'bg-yellow-50 text-yellow-700',
    Hired: 'bg-blue-50 text-blue-700',
    Rejected: 'bg-red-50 text-red-700',
};

export default function Index({ candidates = [], filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? '');
    const [filter, setFilter] = useState(filters.status ?? 'All');
    const [outreachDone, setOutreachDone] = useState({});

    // client-side filter on top of server results
    const visible = candidates.filter((c) => {
        const q = search.toLowerCase();
        const matchesSearch =
            c.name.toLowerCase().includes(q) ||
            c.role.toLowerCase().includes(q) ||
            (c.skills ?? []).some((s) => s.toLowerCase().includes(q));
        const matchesFilter = filter === 'All' || c.status === filter;
        return matchesSearch && matchesFilter;
    });

    function handleOutreach(id) {
        setOutreachDone((prev) => ({ ...prev, [id]: true }));
        router.post(route('outreach.store'), {
            candidate_id: id,
            channel: 'Email',
            message: 'Halo, kami tertarik dengan profil Anda dan ingin menghubungi Anda lebih lanjut.',
        }, { preserveScroll: true });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Candidates" />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* ── PAGE HEADER ───────────────────────────────── */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-xs font-medium text-[#16A085]">
                            Candidate Management
                        </p>
                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                            Candidates
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Kelola dan temukan kandidat terbaik untuk perusahaan.
                        </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                        <Link
                            href={route('cv.import')}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50"
                        >
                            <Upload size={14} />
                            Import CV
                        </Link>

                        <Link
                            href={route('candidates.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0B5D45]"
                        >
                            <Plus size={14} />
                            Tambah Kandidat
                        </Link>
                    </div>
                </div>

                {/* ── AI MATCHING BANNER ────────────────────────── */}
                <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#043927] via-[#0B5D45] to-[#16A085] p-6 text-white shadow-xl shadow-[#043927]/20 transition-all duration-300 hover:scale-[1.01]">

                    {/* decorative circles */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border-[24px] border-white/10" />
                    <div className="pointer-events-none absolute -bottom-14 right-28 h-32 w-32 rounded-full border-[20px] border-white/5" />

                    <div className="relative z-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                                <Brain size={24} className="text-[#65D6B5]" />
                            </div>

                            <div>
                                <div className="flex items-center gap-2">
                                    <Sparkles size={13} className="text-[#65D6B5]" />
                                    <span className="text-[11px] font-semibold uppercase tracking-widest text-[#65D6B5]">
                                        AI Matching
                                    </span>
                                </div>

                                <h2 className="mt-1 text-lg font-bold leading-snug">
                                    Let's find your dream candidates —
                                    <br className="hidden sm:block" />
                                    <span className="text-[#65D6B5]"> smarter, faster, better.</span>
                                </h2>

                                <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/60">
                                    AI kami menganalisis ribuan kandidat secara otomatis dan
                                    menampilkan yang paling cocok dengan lowongan aktifmu.
                                </p>
                            </div>
                        </div>

                        <button className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-[#043927] shadow-md hover:bg-gray-50">
                            <Zap size={14} />
                            Run AI Matching
                        </button>

                    </div>
                </div>

                {/* ── STATS STRIP ───────────────────────────────── */}
                <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-3">
                    {[
                        { label: 'Total Candidates', value: candidates.length },
                        { label: 'Available', value: candidates.filter(c => c.status === 'Available').length },
                        { label: 'Hasil Filter', value: visible.length },
                    ].map(({ label, value }) => (
                        <div key={label} className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md">
                            <p className="text-[10px] font-medium text-gray-400">{label}</p>
                            <p className="mt-1 text-xl font-bold rounded-lg text-transparent bg-clip-text bg-gradient-to-r from-[#16A085] to-[#043927]">{value}</p>
                        </div>
                    ))}
                </div>

                {/* ── SEARCH & FILTER ───────────────────────────── */}
                <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-3 lg:flex-row">

                        {/* search input */}
                        <div className="relative flex-1">
                            <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="🔍  Cari nama, posisi, atau skill..."
                                className="w-full rounded-xl border-gray-200 py-2.5 pl-11 pr-4 text-sm focus:border-[#043927] focus:ring-[#043927]"
                            />
                        </div>

                        {/* status filters */}
                        <div className="flex gap-2 overflow-x-auto pb-0.5">
                            {['All', 'Available', 'Interview', 'Hired'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setFilter(item)}
                                    className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${filter === item
                                            ? 'bg-[#043927] text-white shadow-sm'
                                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>

                        {/* advanced filter */}
                        <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                            <SlidersHorizontal size={15} />
                            Filter
                            <ChevronDown size={13} />
                        </button>
                    </div>
                </div>

                {/* ── CANDIDATE GRID ────────────────────────────── */}
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {visible.map((candidate) => (
                        <CandidateCard
                            key={candidate.id}
                            candidate={candidate}
                            outreachSent={!!outreachDone[candidate.id]}
                            onOutreach={() => handleOutreach(candidate.id)}
                        />
                    ))}
                </div>

                {/* ── EMPTY STATE ───────────────────────────────── */}
                {visible.length === 0 && (
                    <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
                        <Search size={32} className="mx-auto text-gray-300" />
                        <h3 className="mt-4 text-sm font-semibold text-gray-700">
                            Kandidat tidak ditemukan
                        </h3>
                        <p className="mt-1 text-xs text-gray-400">
                            Coba gunakan kata pencarian yang berbeda.
                        </p>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}


/* ── CANDIDATE CARD ─────────────────────────────────────────── */

function CandidateCard({ candidate, outreachSent, onOutreach }) {
    return (
        <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#65D6B5]/50 hover:shadow-xl hover:shadow-[#16A085]/10">

            {/* top row */}
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#E8F3EE] text-sm font-bold text-[#043927]">
                        {candidate.initials}
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-gray-900">
                            {candidate.name}
                        </h3>
                        <p className="text-[11px] text-gray-400">
                            {candidate.role}
                        </p>
                    </div>
                </div>

                <button className="rounded-lg p-1.5 text-gray-300 hover:bg-gray-50 hover:text-gray-600">
                    <MoreHorizontal size={17} />
                </button>
            </div>

            {/* match score */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F5F9F7] px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <Star size={15} className="fill-[#043927] text-[#043927]" />
                    <span className="text-xs font-medium text-gray-600">Match Score</span>
                </div>
                <span className="text-sm font-bold text-[#043927]">{candidate.score}%</span>
            </div>

            {/* info */}
            <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin size={13} className="shrink-0" />
                    {candidate.location}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Briefcase size={13} className="shrink-0" />
                    {candidate.experience_years ? `${candidate.experience_years} Tahun` : '—'}
                </div>
            </div>

            {/* skills */}
            <div className="mt-3 flex flex-wrap gap-1.5">
                {candidate.skills.map((skill) => (
                    <span
                        key={skill}
                        className="rounded-lg bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-500"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* status badge */}
            <div className="mt-3">
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${statusStyles[candidate.status]}`}>
                    {candidate.status}
                </span>
            </div>

            {/* action buttons — pushed to bottom */}
            <div className="mt-auto flex gap-2 pt-4">
                <Link
                    href={route('candidates.show', candidate.id)}
                    className="flex-1 rounded-xl border border-[#043927] py-2 text-center text-xs font-semibold text-[#043927] transition hover:bg-[#043927] hover:text-white"
                >
                    Lihat Profil
                </Link>

                <button
                    onClick={onOutreach}
                    disabled={outreachSent}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${outreachSent
                            ? 'cursor-default bg-emerald-50 text-emerald-600'
                            : 'bg-[#E4F3EE] text-[#043927] hover:bg-[#043927] hover:text-white'
                        }`}
                >
                    <Send size={12} />
                    {outreachSent ? 'Sent' : 'Outreach'}
                </button>
            </div>

        </div>
    );
}
