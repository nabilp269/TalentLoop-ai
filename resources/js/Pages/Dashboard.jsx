import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import StatCard from '@/Components/StatCard';
import CandidateCard from '@/Components/CandidateCard';

import {
    Users,
    UserCheck,
    Brain,
    MessageSquare,
    ArrowUpRight,
    Plus,
    Upload,
    Search,
    BriefcaseBusiness,
    Clock3,
    CheckCircle2,
    FileText,
} from 'lucide-react';

import { Head, Link, usePage } from '@inertiajs/react';

export default function Dashboard() {
    const { auth } = usePage().props;

    const candidates = [
        {
            name: 'Ahmad Rizky',
            role: 'Frontend Developer',
            skills: ['React', 'Laravel', 'JavaScript'],
            score: 92,
            initials: 'AR',
        },
        {
            name: 'Fajar Ramadhan',
            role: 'Frontend Developer',
            skills: ['React', 'Node.js', 'TypeScript'],
            score: 88,
            initials: 'FR',
        },
        {
            name: 'Dimas Pratama',
            role: 'Backend Developer',
            skills: ['Laravel', 'Vue', 'PostgreSQL'],
            score: 84,
            initials: 'DP',
        },
    ];

    const activities = [
        {
            title: '247 CV berhasil di-import',
            time: '10 menit lalu',
            icon: Upload,
        },
        {
            title: 'AI Matching selesai untuk Frontend Developer',
            time: '32 menit lalu',
            icon: Brain,
        },
        {
            title: 'Ahmad Rizky merespons outreach',
            time: '1 jam lalu',
            icon: MessageSquare,
        },
        {
            title: 'Interview baru ditambahkan',
            time: '2 jam lalu',
            icon: CheckCircle2,
        },
    ];

    return (
        <AuthenticatedLayout>

            <Head title="Dashboard" />

            {/* extra bottom padding on mobile to clear the fixed bottom nav */}
            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* HEADER */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                        <p className="text-xs font-medium text-[#16A085]">
                            Friday, September 4, 2026
                        </p>

                        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
                            Good Morning, {auth?.user?.name ?? 'Nabil Puram'} 👋
                        </h1>

                        <p className="mt-1 text-sm text-gray-400">
                            Here's what's happening with your talent pool today.
                        </p>
                    </div>

                    <div className="flex shrink-0 gap-2">

                        <Link href={route('cv.import')} className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 shadow-sm hover:bg-gray-50">
                            <Upload size={14} />
                            Import CV
                        </Link>

                        <Link href={route('jobs.create')} className="flex items-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0B5D45]">
                            <Plus size={14} />
                            New Vacancy
                        </Link>

                    </div>
                </div>

                {/* HERO — shortcut langsung ke Talent Pool saat dashboard dibuka */}
                <section className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#043927] to-[#01140E] p-6 text-white shadow-xl shadow-[#043927]/20 sm:p-8">

                    <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div className="max-w-xl">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                                <FileText size={20} />
                            </div>

                            <h2 className="mt-4 text-xl font-bold leading-snug sm:text-2xl">
                                Turn Dead CVs Into
                                <br />
                                Ready-to-Hire Assets.
                            </h2>

                            <p className="mt-2 max-w-md text-xs leading-relaxed text-white/50 sm:text-sm">
                                Gunakan kembali kandidat terbaik dari database lama
                                sebelum mencari kandidat baru.
                            </p>

                            <div className="mt-5 flex flex-wrap gap-3">
                                <Link
                                    href={route('candidates.index')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-[#043927] hover:bg-gray-100"
                                >
                                    <Search size={14} />
                                    Explore Talent Pool
                                </Link>

                                <Link
                                    href={route('cv.import')}
                                    className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/10"
                                >
                                    <Upload size={14} />
                                    Import CV
                                </Link>
                            </div>

                        </div>

                    </div>

                    {/* DECORATION */}
                    <div className="absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full bg-gradient-to-bl from-[#65D6B5] to-[#16A085] opacity-20 blur-[50px] mix-blend-screen" />
                    <div className="absolute -bottom-20 right-20 h-[150px] w-[150px] rounded-full bg-[#16A085] opacity-30 blur-[40px]" />

                </section>

                {/* STATS — 2 cols on mobile, 4 on large */}
                <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">

                    <StatCard
                        title="Total Candidates"
                        value="2,847"
                        trend="+12.8%"
                        description="vs last month"
                        icon={Users}
                    />

                    <StatCard
                        title="Available"
                        value="1,264"
                        trend="+8.2%"
                        description="vs last month"
                        icon={UserCheck}
                    />

                    <StatCard
                        title="Pot. Matches"
                        value="186"
                        trend="+18.4%"
                        description="this month"
                        icon={Brain}
                        iconBg="bg-purple-50"
                        iconColor="text-purple-600"
                    />

                    <StatCard
                        title="Interviewed"
                        value="743"
                        trend="+6.7%"
                        description="this month"
                        icon={MessageSquare}
                        iconBg="bg-orange-50"
                        iconColor="text-orange-500"
                    />

                </div>

                {/* MAIN GRID — stacks on mobile, side-by-side on xl */}
                <div className="mt-6 grid gap-5 xl:grid-cols-[1fr_340px]">

                    {/* TOP MATCHES */}
                    <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

                        <div className="flex items-center justify-between p-5 pb-4">

                            <div>
                                <h2 className="text-sm font-bold text-gray-900">
                                    Top Matches For You
                                </h2>

                                <p className="mt-0.5 text-[11px] text-gray-400">
                                    Kandidat terbaik berdasarkan lowongan aktif
                                </p>
                            </div>

                            <Link
                                href={route('candidates.index')}
                                className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-[#043927]"
                            >
                                View all
                                <ArrowUpRight size={13} />
                            </Link>

                        </div>

                        {/* 1 col → 2 col (md) → 3 col (lg) */}
                        <div className="grid gap-3 p-5 pt-0 sm:grid-cols-2 lg:grid-cols-3">
                            {candidates.map((candidate) => (
                                <CandidateCard
                                    key={candidate.name}
                                    {...candidate}
                                />
                            ))}
                        </div>

                    </section>

                    {/* RECENT ACTIVITY */}
                    <section className="rounded-2xl border border-gray-100 bg-white shadow-sm">

                        <div className="flex items-center justify-between p-5 pb-4">

                            <div>
                                <h2 className="text-sm font-bold text-gray-900">
                                    Recent Activity
                                </h2>

                                <p className="mt-0.5 text-[11px] text-gray-400">
                                    Aktivitas terbaru TalentLoop
                                </p>
                            </div>

                            <button className="text-[11px] font-semibold text-[#043927]">
                                See all
                            </button>

                        </div>

                        <div className="space-y-1 px-5 pb-5">
                            {activities.map((activity, index) => {
                                const Icon = activity.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-3 rounded-xl p-3 transition hover:bg-gray-50"
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E4F3EE] text-[#043927]">
                                            <Icon size={16} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs font-medium leading-snug text-gray-700">
                                                {activity.title}
                                            </p>

                                            <p className="mt-1 flex items-center gap-1 text-[10px] text-gray-400">
                                                <Clock3 size={10} />
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                    </section>

                </div>

                {/* QUICK ACTIONS */}
                <section className="mt-6">

                    <div className="mb-4">
                        <h2 className="text-sm font-bold text-gray-900">
                            Quick Actions
                        </h2>

                        <p className="mt-0.5 text-[11px] text-gray-400">
                            Akses fitur TalentLoop dengan cepat
                        </p>
                    </div>

                    {/* 2 col on mobile, 4 on md+ */}
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">

                        <QuickAction
                            icon={Upload}
                            title="Import CV"
                            description="Upload CV kandidat"
                            href={route('cv.import')}
                        />

                        <QuickAction
                            icon={Brain}
                            title="AI Matching"
                            description="Cari kandidat terbaik"
                            href={route('candidates.index', { tab: 'matching' })}
                        />

                        <QuickAction
                            icon={BriefcaseBusiness}
                            title="Create Vacancy"
                            description="Buat lowongan baru"
                            href={route('jobs.create')}
                        />

                        <QuickAction
                            icon={Search}
                            title="Find Talent"
                            description="Cari database talent"
                            href={route('candidates.index')}
                        />

                    </div>

                </section>

                {/* BOTTOM INFO */}
                <section className="mt-6">

                    {/* RECRUITMENT PROGRESS */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-bold text-gray-900">
                                    Recruitment Progress
                                </h2>

                                <p className="mt-0.5 text-[11px] text-gray-400">
                                    Frontend Developer
                                </p>
                            </div>

                            <span className="rounded-full bg-[#E4F3EE] px-2.5 py-1 text-[10px] font-semibold text-[#043927]">
                                Active
                            </span>
                        </div>

                        <div className="mt-6 space-y-4">
                            <Progress label="CV Screening" value="82%" />
                            <Progress label="AI Matching" value="64%" />
                            <Progress label="Interview" value="38%" />
                        </div>

                    </div>

                </section>

            </div>

        </AuthenticatedLayout>
    );
}


/* ─── QUICK ACTION ──────────────────────────────────────────── */

function QuickAction({ icon: Icon, title, description, href = '#' }) {
    return (
        <Link href={href} className="group rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#65D6B5]/50 hover:shadow-xl hover:shadow-[#16A085]/10">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#E4F3EE] to-white text-[#043927] shadow-sm transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#16A085] group-hover:to-[#043927] group-hover:text-white group-hover:shadow-[#16A085]/30">
                <Icon size={18} />
            </div>

            <h3 className="mt-3 text-xs font-bold text-gray-800">
                {title}
            </h3>

            <p className="mt-1 text-[10px] text-gray-400">
                {description}
            </p>

        </Link>
    );
}


/* ─── PROGRESS BAR ──────────────────────────────────────────── */

function Progress({ label, value }) {
    return (
        <div>
            <div className="mb-2 flex justify-between">
                <span className="text-[11px] font-medium text-gray-500">
                    {label}
                </span>

                <span className="text-[11px] font-bold text-[#043927]">
                    {value}
                </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                    className="h-full rounded-full bg-[#16A085]"
                    style={{ width: value }}
                />
            </div>
        </div>
    );
}
