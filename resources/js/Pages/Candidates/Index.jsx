import { useState, useMemo } from 'react';
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
    Users,
    ArrowUpRight,
    RefreshCw,
} from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const statusStyles = {
    Available: 'bg-emerald-50 text-emerald-700',
    Interview: 'bg-yellow-50 text-yellow-700',
    Hired: 'bg-blue-50 text-blue-700',
    Rejected: 'bg-red-50 text-red-700',
};

export default function Index({ candidates = [], jobs = [], filters = {} }) {
    const [activeTab, setActiveTab] = useState(filters.tab === 'matching' ? 'matching' : 'all');
    const [search, setSearch] = useState(filters.search ?? '');
    const [filter, setFilter] = useState(filters.status ?? 'All');
    const [outreachDone, setOutreachDone] = useState({});

    // AI Matching state
    const defaultJobId = jobs.length > 0 ? String(jobs[0].id) : 'frontend';
    const [selectedJobId, setSelectedJobId] = useState(defaultJobId);
    const [matchingSearch, setMatchingSearch] = useState('');
    const [isScanning, setIsScanning] = useState(false);

    // Selected job data
    const currentJob = useMemo(() => {
        return jobs.find((j) => String(j.id) === String(selectedJobId)) || {
            id: 'frontend',
            title: 'Frontend Developer',
            department: 'Engineering',
            requirements: ['React', 'JavaScript', 'TypeScript'],
        };
    }, [jobs, selectedJobId]);

    // Client-side filter for All Candidates tab
    const visible = useMemo(() => {
        return candidates.filter((c) => {
            const q = search.toLowerCase();
            const matchesSearch =
                c.name.toLowerCase().includes(q) ||
                c.role.toLowerCase().includes(q) ||
                (c.skills ?? []).some((s) => s.toLowerCase().includes(q));
            const matchesFilter = filter === 'All' || c.status === filter;
            return matchesSearch && matchesFilter;
        });
    }, [candidates, search, filter]);

    // AI Matching candidate scoring & reasoning
    const matchedCandidates = useMemo(() => {
        const jobTitle = (currentJob?.title || '').toLowerCase();

        return candidates
            .map((c) => {
                const candidateSkills = (c.skills ?? []).map((s) => s.toLowerCase());
                const candidateRole = (c.role ?? '').toLowerCase();

                // Calculate match score based on role and skills compatibility
                let matchScore = c.score || 80;
                if (
                    (jobTitle.includes('frontend') && candidateRole.includes('frontend')) ||
                    (jobTitle.includes('backend') && candidateRole.includes('backend')) ||
                    (jobTitle.includes('design') && candidateRole.includes('design')) ||
                    (jobTitle.includes('data') && candidateRole.includes('data')) ||
                    (jobTitle.includes('marketing') && candidateRole.includes('marketing'))
                ) {
                    matchScore = Math.max(matchScore, 88);
                } else {
                    matchScore = Math.min(matchScore, 74);
                }

                // AI match rationale based on role & skills
                let reason = `Profil dan keahlian kandidat dalam ${(c.skills ?? []).slice(0, 3).join(', ')} memiliki relevansi tinggi dengan posisi ${currentJob?.title}.`;
                if (candidateRole.includes('frontend') && jobTitle.includes('frontend')) {
                    reason = 'Pengalaman React yang solid, pemahaman state management yang baik, dan portofolio UI yang relevan.';
                } else if (candidateRole.includes('backend') && jobTitle.includes('backend')) {
                    reason = 'Keahlian arsitektur backend, database relational, serta REST API yang kuat dan teruji.';
                } else if (candidateRole.includes('design') && jobTitle.includes('design')) {
                    reason = 'Keahlian visual UI/UX mendalam, penguasaan sistem desain Figma, dan pendekatan user-centered.';
                } else if (candidateRole.includes('data') && jobTitle.includes('data')) {
                    reason = 'Keahlian analisis data mendalam dengan SQL/Python serta visualisasi data yang tajam.';
                }

                return {
                    ...c,
                    matchScore,
                    reason,
                };
            })
            .sort((a, b) => b.matchScore - a.matchScore)
            .filter((c) => {
                if (!matchingSearch) return true;
                const q = matchingSearch.toLowerCase();
                return (
                    c.name.toLowerCase().includes(q) ||
                    c.role.toLowerCase().includes(q) ||
                    (c.skills ?? []).some((s) => s.toLowerCase().includes(q))
                );
            });
    }, [candidates, currentJob, matchingSearch]);

    function handleOutreach(id) {
        setOutreachDone((prev) => ({ ...prev, [id]: true }));
        router.post(
            route('outreach.store'),
            {
                candidate_id: id,
                channel: 'Email',
                message: 'Halo, kami tertarik dengan profil Anda dan ingin menghubungi Anda lebih lanjut.',
            },
            { preserveScroll: true }
        );
    }

    function runAiMatching() {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
        }, 500);
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
                            Candidates & AI Matching
                        </h1>
                        <p className="mt-1 text-sm text-gray-400">
                            Kelola database talenta dan gunakan kecerdasan buatan untuk mencocokkan kandidat terbaik.
                        </p>
                    </div>

                    <div className="flex shrink-0 gap-2">
                        <Link
                            href={route('cv.import')}
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                        >
                            <Upload size={14} />
                            Import CV
                        </Link>

                        <Link
                            href={route('candidates.create')}
                            className="inline-flex items-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#0B5D45]"
                        >
                            <Plus size={14} />
                            Tambah Kandidat
                        </Link>
                    </div>
                </div>

                {/* ── TAB NAVIGATION ────────────────────────────── */}
                <div className="mt-6 flex border-b border-gray-200">
                    <div className="flex gap-2">
                        <button
                            onClick={() => setActiveTab('all')}
                            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition ${
                                activeTab === 'all'
                                    ? 'border-[#043927] text-[#043927]'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            }`}
                        >
                            <Users size={16} />
                            Semua Kandidat
                            <span
                                className={`rounded-full px-2 py-0.5 text-xs font-bold transition ${
                                    activeTab === 'all'
                                        ? 'bg-[#043927] text-white'
                                        : 'bg-gray-100 text-gray-600'
                                }`}
                            >
                                {candidates.length}
                            </span>
                        </button>

                        <button
                            onClick={() => setActiveTab('matching')}
                            className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-semibold transition ${
                                activeTab === 'matching'
                                    ? 'border-[#043927] text-[#043927]'
                                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                            }`}
                        >
                            <Brain
                                size={16}
                                className={activeTab === 'matching' ? 'text-[#16A085]' : 'text-gray-400'}
                            />
                            AI Matching
                            <span className="rounded-full bg-gradient-to-r from-[#16A085] to-[#043927] px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                                AI
                            </span>
                        </button>
                    </div>
                </div>

                {/* ── TAB 1: ALL CANDIDATES ─────────────────────── */}
                {activeTab === 'all' && (
                    <div className="mt-6 space-y-6">

                        {/* AI MATCHING BANNER (Quick Switch) */}
                        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#043927] via-[#0B5D45] to-[#16A085] p-6 text-white shadow-xl shadow-[#043927]/20 transition-all duration-300 hover:scale-[1.005]">
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
                                                AI Smart Matcher
                                            </span>
                                        </div>

                                        <h2 className="mt-1 text-lg font-bold leading-snug">
                                            Let's find your dream candidates —
                                            <br className="hidden sm:block" />
                                            <span className="text-[#65D6B5]"> smarter, faster, better.</span>
                                        </h2>

                                        <p className="mt-1.5 max-w-md text-xs leading-relaxed text-white/70">
                                            AI menganalisis kandidat secara otomatis dan menampilkan yang paling cocok dengan lowongan aktifmu.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setActiveTab('matching')}
                                    className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs font-bold text-[#043927] shadow-md transition hover:bg-[#F5F7F6] hover:scale-105"
                                >
                                    <Zap size={14} className="text-[#16A085]" />
                                    Buka AI Matching
                                </button>
                            </div>
                        </div>

                        {/* STATS STRIP */}
                        <div className="grid grid-cols-3 gap-3">
                            {[
                                { label: 'Total Candidates', value: candidates.length },
                                { label: 'Available', value: candidates.filter((c) => c.status === 'Available').length },
                                { label: 'Hasil Filter', value: visible.length },
                            ].map(({ label, value }) => (
                                <div
                                    key={label}
                                    className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                                >
                                    <p className="text-[10px] font-medium text-gray-400">{label}</p>
                                    <p className="mt-1 text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#16A085] to-[#043927]">
                                        {value}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* SEARCH & FILTER */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
                            <div className="flex flex-col gap-3 lg:flex-row">
                                <div className="relative flex-1">
                                    <Search
                                        size={17}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="🔍  Cari nama, posisi, atau skill..."
                                        className="w-full rounded-xl border-gray-200 py-2.5 pl-11 pr-4 text-sm focus:border-[#043927] focus:ring-[#043927]"
                                    />
                                </div>

                                <div className="flex gap-2 overflow-x-auto pb-0.5">
                                    {['All', 'Available', 'Interview', 'Hired'].map((item) => (
                                        <button
                                            key={item}
                                            onClick={() => setFilter(item)}
                                            className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
                                                filter === item
                                                    ? 'bg-[#043927] text-white shadow-sm'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>

                                <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-medium text-gray-600 hover:bg-gray-50">
                                    <SlidersHorizontal size={15} />
                                    Filter
                                    <ChevronDown size={13} />
                                </button>
                            </div>
                        </div>

                        {/* CANDIDATE GRID */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {visible.map((candidate) => (
                                <CandidateCard
                                    key={candidate.id}
                                    candidate={candidate}
                                    outreachSent={!!outreachDone[candidate.id]}
                                    onOutreach={() => handleOutreach(candidate.id)}
                                />
                            ))}
                        </div>

                        {/* EMPTY STATE */}
                        {visible.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
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
                )}

                {/* ── TAB 2: AI MATCHING ────────────────────────── */}
                {activeTab === 'matching' && (
                    <div className="mt-6 space-y-6">

                        {/* VACANCY SELECTION & RUN MATCHING */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <Briefcase size={14} className="text-[#16A085]" />
                                        <label className="text-xs font-bold text-gray-700">
                                            Pilih Lowongan Aktif (Vacancy)
                                        </label>
                                    </div>

                                    <select
                                        value={selectedJobId}
                                        onChange={(e) => setSelectedJobId(e.target.value)}
                                        className="mt-2 w-full rounded-xl border-gray-200 text-xs font-medium focus:border-[#16A085] focus:ring-[#16A085]"
                                    >
                                        {jobs.length > 0 ? (
                                            jobs.map((job) => (
                                                <option key={job.id} value={job.id}>
                                                    {job.title} — {job.department ?? 'Umum'}
                                                </option>
                                            ))
                                        ) : (
                                            <>
                                                <option value="frontend">Senior Frontend Developer (Engineering)</option>
                                                <option value="backend">Backend Developer (Laravel) (Engineering)</option>
                                                <option value="uiux">UI/UX Designer (Design)</option>
                                                <option value="data">Data Analyst (Analytics)</option>
                                            </>
                                        )}
                                    </select>
                                </div>

                                <button
                                    onClick={runAiMatching}
                                    disabled={isScanning}
                                    className="flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-6 py-3 text-xs font-bold text-white shadow-sm transition hover:bg-[#0B5D45] active:scale-95 disabled:opacity-75"
                                >
                                    {isScanning ? (
                                        <>
                                            <RefreshCw size={15} className="animate-spin text-[#65D6B5]" />
                                            Scanning Candidates...
                                        </>
                                    ) : (
                                        <>
                                            <Sparkles size={15} className="text-[#65D6B5]" />
                                            Run AI Matching
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* RESULT SUMMARY & SEARCH */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-sm font-bold text-gray-900">
                                    {matchedCandidates.length} Potential Matches untuk{' '}
                                    <span className="text-[#043927]">{currentJob?.title}</span>
                                </h2>
                                <p className="mt-0.5 text-[11px] text-gray-400">
                                    Diurutkan otomatis berdasarkan skor kecocokan keahlian, pengalaman, dan profil.
                                </p>
                            </div>

                            <div className="flex gap-2">
                                <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-xs">
                                    <Search size={14} className="text-gray-400" />
                                    <input
                                        placeholder="Cari kandidat..."
                                        value={matchingSearch}
                                        onChange={(e) => setMatchingSearch(e.target.value)}
                                        className="w-28 border-0 p-0 text-xs outline-none focus:ring-0 sm:w-36"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* MATCH CARDS */}
                        <div className="grid gap-4 md:grid-cols-2">
                            {matchedCandidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#65D6B5]/50 hover:shadow-lg"
                                >
                                    <div className="flex items-start gap-3.5">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#DCEFE9] text-xs font-bold text-[#043927]">
                                            {candidate.initials}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-start justify-between gap-2">
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-900">
                                                        {candidate.name}
                                                    </h3>
                                                    <p className="mt-0.5 text-[11px] text-gray-400">
                                                        {candidate.role} • {candidate.location}
                                                    </p>
                                                </div>

                                                <div className="text-right">
                                                    <p className="text-xl font-black text-[#043927]">
                                                        {candidate.matchScore}%
                                                    </p>
                                                    <p className="text-[8px] font-bold uppercase tracking-wider text-[#16A085]">
                                                        AI MATCH
                                                    </p>
                                                </div>
                                            </div>

                                            {/* PROGRESS BAR */}
                                            <div className="mt-3.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-[#16A085] to-[#043927] transition-all duration-500"
                                                    style={{ width: `${candidate.matchScore}%` }}
                                                />
                                            </div>

                                            {/* SKILLS */}
                                            <div className="mt-3.5 flex flex-wrap gap-1.5">
                                                {(candidate.skills ?? []).map((skill) => (
                                                    <span
                                                        key={skill}
                                                        className="rounded-lg bg-[#F5F7F6] px-2.5 py-1 text-[10px] font-medium text-gray-600"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* AI REASON */}
                                            <div className="mt-3.5 rounded-xl bg-[#F5F9F7] p-3 border border-[#E4F3EE]">
                                                <div className="flex gap-2">
                                                    <Sparkles
                                                        size={14}
                                                        className="mt-0.5 shrink-0 text-[#16A085]"
                                                    />
                                                    <p className="text-[11px] leading-relaxed text-gray-600">
                                                        {candidate.reason}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* CARD ACTIONS */}
                                            <div className="mt-4 flex items-center justify-between pt-2 border-t border-gray-50">
                                                <button
                                                    onClick={() => handleOutreach(candidate.id)}
                                                    disabled={!!outreachDone[candidate.id]}
                                                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition ${
                                                        outreachDone[candidate.id]
                                                            ? 'bg-emerald-50 text-emerald-600'
                                                            : 'bg-[#E4F3EE] text-[#043927] hover:bg-[#043927] hover:text-white'
                                                    }`}
                                                >
                                                    <Send size={12} />
                                                    {outreachDone[candidate.id] ? 'Outreach Sent' : 'Kirim Outreach'}
                                                </button>

                                                <Link
                                                    href={route('candidates.show', candidate.id)}
                                                    className="flex items-center gap-1 text-xs font-bold text-[#043927] hover:text-[#16A085]"
                                                >
                                                    Lihat Profil
                                                    <ArrowUpRight size={13} />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {matchedCandidates.length === 0 && (
                            <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
                                <Brain size={32} className="mx-auto text-gray-300" />
                                <h3 className="mt-4 text-sm font-semibold text-gray-700">
                                    Tidak ada kandidat yang cocok
                                </h3>
                                <p className="mt-1 text-xs text-gray-400">
                                    Coba ubah lowongan atau kata kunci pencarian.
                                </p>
                            </div>
                        )}

                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}

/* ── CANDIDATE CARD (ALL CANDIDATES TAB) ─────────────────────────── */

function CandidateCard({ candidate, outreachSent, onOutreach }) {
    return (
        <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#65D6B5]/50 hover:shadow-xl hover:shadow-[#16A085]/10">
            {/* TOP ROW */}
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

            {/* MATCH SCORE */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-[#F5F9F7] px-4 py-2.5">
                <div className="flex items-center gap-2">
                    <Star size={15} className="fill-[#043927] text-[#043927]" />
                    <span className="text-xs font-medium text-gray-600">Match Score</span>
                </div>
                <span className="text-sm font-bold text-[#043927]">{candidate.score}%</span>
            </div>

            {/* INFO */}
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

            {/* SKILLS */}
            <div className="mt-3 flex flex-wrap gap-1.5">
                {(candidate.skills ?? []).map((skill) => (
                    <span
                        key={skill}
                        className="rounded-lg bg-gray-50 px-2.5 py-1 text-[10px] font-medium text-gray-500"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* STATUS BADGE */}
            <div className="mt-3">
                <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                        statusStyles[candidate.status] ?? 'bg-gray-50 text-gray-700'
                    }`}
                >
                    {candidate.status}
                </span>
            </div>

            {/* ACTION BUTTONS */}
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
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        outreachSent
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
