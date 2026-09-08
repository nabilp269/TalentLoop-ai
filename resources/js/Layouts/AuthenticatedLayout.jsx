import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    LayoutDashboard,
    Users,
    BriefcaseBusiness,
    ClipboardCheck,
    BarChart3,
    Settings,
    Menu,
    X,
    Bell,
    Search,
    ChevronDown,
    LogOut,
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navigation = [
        { name: 'Dashboard', href: route('dashboard'), icon: LayoutDashboard, routeName: 'dashboard' },
        { name: 'Candidates', href: route('candidates.index'), icon: Users, routeName: 'candidates.*' },
        { name: 'Jobs / Vacancies', href: route('jobs.index'), icon: BriefcaseBusiness, routeName: 'jobs.*' },
        { name: 'Interview Logs', href: route('interviews.index'), icon: ClipboardCheck, routeName: 'interviews.*' },
        { name: 'Analytics', href: route('analytics.index'), icon: BarChart3, routeName: 'analytics.*' },
        { name: 'Settings', href: route('settings.index'), icon: Settings, routeName: 'settings.*' },
    ];

    return (
        <div className="min-h-screen bg-[#F5F7F6]">

            {/* ── MOBILE OVERLAY ─────────────────────────────────── */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* ── SIDEBAR ────────────────────────────────────────── */}
            <aside
                className={`
                    fixed left-0 top-0 z-50 flex h-screen w-[260px] flex-col
                    bg-gradient-to-b from-[#043927] to-[#01140E] text-white border-r border-[#65D6B5]/10 shadow-2xl shadow-black/40
                    transition-transform duration-300
                    lg:translate-x-0
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* LOGO */}
                <div className="flex h-[76px] shrink-0 items-center justify-between px-6">
                    <Link
                        href={route('dashboard')}
                        className="flex items-center gap-3 transition-transform hover:scale-[1.02]"
                    >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#65D6B5] to-[#16A085] shadow-lg shadow-[#16A085]/30">
                            <span className="text-xl font-black text-[#043927]">∞</span>
                        </div>

                        <div>
                            <h1 className="text-lg font-bold tracking-tight">
                                Talent<span className="text-[#65D6B5]">Loop</span>
                            </h1>

                            <p className="text-[10px] text-white/50">
                                Talent Intelligence
                            </p>
                        </div>
                    </Link>

                    {/* close button — mobile only */}
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* NAVIGATION — scrollable so it never overflows into the bottom card */}
                <nav className="flex-1 overflow-y-auto px-3 py-2">
                    <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/40">
                        Main Menu
                    </p>

                    <div className="space-y-0.5">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            const active = route().current(item.routeName);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`
                                        group flex items-center gap-3 rounded-xl
                                        px-3 py-2.5 text-sm font-medium transition-all
                                        ${active
                                            ? 'bg-[#0B5D45] text-white shadow-lg shadow-black/10'
                                            : 'text-white/65 hover:bg-white/10 hover:text-white'
                                        }
                                    `}
                                >
                                    <Icon
                                        size={18}
                                        strokeWidth={1.8}
                                        className={
                                            active
                                                ? 'text-[#65D6B5]'
                                                : 'text-white/50 group-hover:text-white'
                                        }
                                    />

                                    <span>{item.name}</span>

                                    {item.name === 'AI Matching' && (
                                        <span className="ml-auto rounded-full bg-[#16A085]/20 px-2 py-0.5 text-[9px] font-bold text-[#65D6B5]">
                                            AI
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </nav>

                {/* BOTTOM — shrink-0 keeps it pinned; never overlaps nav */}
                <div className="shrink-0 p-4">
                    <div className="relative overflow-hidden rounded-2xl border border-[#65D6B5]/20 bg-gradient-to-br from-[#16A085]/10 to-transparent p-4 backdrop-blur-md shadow-lg shadow-[#000000]/10">
                        <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-[#65D6B5] opacity-20 blur-xl" />

                        <div className="relative z-10">
                            <p className="text-xs font-bold text-white">
                                TalentLoop Pro
                            </p>

                            <p className="mt-1 text-[10px] leading-relaxed text-white/50">
                                Unlock advanced talent matching and analytics.
                            </p>

                            <button className="mt-3 w-full rounded-xl bg-gradient-to-r from-[#65D6B5] to-[#16A085] py-2 text-xs font-bold text-[#043927] shadow-lg transition-transform hover:scale-[1.03]">
                                Upgrade Plan
                            </button>
                        </div>
                    </div>

                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/50 hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut size={18} />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* ── MAIN AREA ──────────────────────────────────────── */}
            {/* lg:pl-[260px] offsets the fixed sidebar on desktop */}
            <div className="flex min-h-screen flex-col lg:pl-[260px]">

                {/* TOPBAR */}
                <header className="sticky top-0 z-30 h-[76px] shrink-0 border-b border-gray-100 bg-white/70 backdrop-blur-xl shadow-sm transition-all duration-300">
                    <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">

                        {/* LEFT */}
                        <div className="flex items-center gap-3">

                            {/* hamburger — mobile only */}
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="rounded-xl p-2.5 text-gray-600 hover:bg-gray-100 lg:hidden"
                            >
                                <Menu size={21} />
                            </button>

                            {/* search — hidden on xs */}
                            <div className="hidden items-center gap-3 rounded-xl bg-[#F5F7F6] px-4 py-2.5 sm:flex sm:w-[260px] lg:w-[300px]">
                                <Search size={17} className="shrink-0 text-gray-400" />

                                <input
                                    type="text"
                                    placeholder="Search anything..."
                                    className="w-full border-0 bg-transparent p-0 text-sm outline-none placeholder:text-gray-400 focus:ring-0"
                                />

                                <span className="hidden rounded-md border border-gray-200 bg-white px-1.5 py-0.5 text-[9px] text-gray-400 md:block">
                                    ⌘ K
                                </span>
                            </div>

                            {/* logo text — xs only (replaces search) */}
                            <p className="text-sm font-bold text-[#043927] sm:hidden">
                                Talent<span className="text-[#16A085]">Loop</span>
                            </p>

                        </div>

                        {/* RIGHT */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* notification bell */}
                            <button className="relative rounded-xl p-2.5 text-gray-500 hover:bg-gray-100">
                                <Bell size={19} />
                                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#16A085]" />
                            </button>

                            <div className="hidden h-7 w-px bg-gray-200 sm:block" />

                            {/* profile */}
                            <button className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-gray-50">
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#DCEFE9] text-xs font-bold text-[#043927]">
                                    {auth?.user?.name?.charAt(0)?.toUpperCase() ?? 'N'}
                                </div>

                                <div className="hidden text-left sm:block">
                                    <p className="text-xs font-semibold text-gray-800">
                                        {auth?.user?.name ?? 'Nabil Putra'}
                                    </p>

                                    <p className="text-[10px] text-gray-400">
                                        Recruiter
                                    </p>
                                </div>

                                <ChevronDown size={15} className="hidden text-gray-400 sm:block" />
                            </button>

                        </div>
                    </div>
                </header>

                {/* PAGE CONTENT */}
                <main className="flex-1">
                    {header && (
                        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    )}

                    {children}
                </main>

            </div>

            {/* ── MOBILE BOTTOM NAV ──────────────────────────────── */}
            <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white lg:hidden">
                <div className="grid grid-cols-5">

                    {[
                        { href: route('dashboard'), icon: LayoutDashboard, label: 'Home', routeName: 'dashboard' },
                        { href: route('candidates.index'), icon: Users, label: 'Candidates', routeName: 'candidates.*' },
                        { href: route('jobs.index'), icon: BriefcaseBusiness, label: 'Jobs', routeName: 'jobs.*' },
                        { href: route('analytics.index'), icon: BarChart3, label: 'Analytics', routeName: 'analytics.*' },
                        { href: route('settings.index'), icon: Settings, label: 'Settings', routeName: 'settings.*' },
                    ].map(({ href, icon: Icon, label, routeName }) => {
                        const active = route().current(routeName);
                        return (
                            <Link
                                key={label}
                                href={href}
                                className={`flex flex-col items-center gap-1 py-3 transition-colors ${active ? 'text-[#043927]' : 'text-gray-400'
                                    }`}
                            >
                                <Icon size={19} />
                                <span className={`text-[9px] ${active ? 'font-semibold' : ''}`}>
                                    {label}
                                </span>
                            </Link>
                        );
                    })}

                </div>
            </nav>

        </div>
    );
}
