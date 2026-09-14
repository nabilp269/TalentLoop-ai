import { Head, Link, usePage } from '@inertiajs/react';
import {
    Brain,
    Sparkles,
    Users,
    Briefcase,
    CalendarCheck,
    BarChart3,
    ArrowRight,
    CheckCircle2,
    Zap,
    FileText,
    Send,
    ChevronRight,
    Star,
    ShieldCheck,
    Clock,
} from 'lucide-react';
import { useState } from 'react';

export default function Welcome() {
    const { auth } = usePage().props;
    const [faqOpen, setFaqOpen] = useState(null);

    const toggleFaq = (index) => {
        setFaqOpen(faqOpen === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#F5F7F6] text-gray-900 selection:bg-[#65D6B5] selection:text-[#043927]">
            <Head title="TalentLoop — AI-Powered Talent Intelligence Platform" />

            {/* ── NAVBAR ─────────────────────────────────────────── */}
            <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#65D6B5] to-[#16A085] shadow-md shadow-[#16A085]/20">
                            <span className="text-2xl font-black text-[#043927]">∞</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-[#043927]">
                                Talent<span className="text-[#16A085]">Loop</span>
                            </h1>
                            <p className="text-[10px] font-medium text-gray-400">
                                Talent Intelligence
                            </p>
                        </div>
                    </Link>

                    {/* Nav Links - Desktop */}
                    <nav className="hidden items-center gap-8 md:flex">
                        <a href="#fitur" className="text-sm font-medium text-gray-600 transition hover:text-[#043927]">
                            Fitur Utama
                        </a>
                        <a href="#keunggulan" className="text-sm font-medium text-gray-600 transition hover:text-[#043927]">
                            AI Matching
                        </a>
                        <a href="#cara-kerja" className="text-sm font-medium text-gray-600 transition hover:text-[#043927]">
                            Cara Kerja
                        </a>
                        <a href="#faq" className="text-sm font-medium text-gray-600 transition hover:text-[#043927]">
                            FAQ
                        </a>
                    </nav>

                    {/* Auth CTA */}
                    <div className="flex items-center gap-3">
                        {auth?.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-flex items-center gap-2 rounded-xl bg-[#043927] px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0B5D45] hover:scale-105"
                            >
                                Buka Dashboard
                                <ArrowRight size={14} />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-xl px-4 py-2 text-xs font-semibold text-gray-700 hover:text-[#043927]"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="inline-flex items-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-[#0B5D45] hover:scale-105"
                                >
                                    Mulai Rekrut
                                    <ArrowRight size={14} />
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            {/* ── HERO SECTION ───────────────────────────────────── */}
            <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F5F9F7] to-[#F5F7F6] pb-20 pt-16 lg:pb-32 lg:pt-24">
                {/* Decorative background glows */}
                <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#65D6B5]/20 blur-3xl" />
                <div className="pointer-events-none absolute right-0 top-32 h-[500px] w-[500px] rounded-full bg-[#16A085]/15 blur-3xl" />

                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">

                        {/* Left Column: Copywriting */}
                        <div className="text-center lg:col-span-7 lg:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-[#16A085]/30 bg-[#16A085]/10 px-3.5 py-1.5 shadow-xs">
                                <Sparkles size={14} className="text-[#16A085]" />
                                <span className="text-xs font-bold text-[#043927]">
                                    AI-Powered Talent Intelligence Platform
                                </span>
                            </div>

                            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                                Turn Dead CVs Into{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#16A085] to-[#043927]">
                                    Ready-to-Hire
                                </span>{' '}
                                Assets.
                            </h1>

                            <p className="mt-5 text-base leading-relaxed text-gray-600 sm:text-lg">
                                Temukan kembali kandidat terbaik dari ribuan database pelamar lama Anda secara otomatis.
                                Dilengkapi algoritma <strong>AI Matching</strong> pintar, CV parser instan, dan alur interview terintegrasi dalam satu platform modern.
                            </p>

                            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                                <Link
                                    href={auth?.user ? route('dashboard') : route('login')}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-[#043927]/20 transition hover:bg-[#0B5D45] hover:scale-105"
                                >
                                    <Zap size={16} className="text-[#65D6B5]" />
                                    {auth?.user ? 'Menuju Dashboard' : 'Mulai Rekrut Sekarang'}
                                    <ArrowRight size={16} />
                                </Link>

                                <a
                                    href="#fitur"
                                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:bg-gray-50"
                                >
                                    Jelajahi Fitur
                                </a>
                            </div>

                            {/* Trust badges */}
                            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-t border-gray-200/60 pt-6 text-xs text-gray-500 lg:justify-start">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-[#16A085]" />
                                    <span>AI Matching Cepat & Akurat</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-[#16A085]" />
                                    <span>Skrining CV Otomatis</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} className="text-[#16A085]" />
                                    <span>Multi-Channel Outreach</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Interactive Mockup Card */}
                        <div className="relative lg:col-span-5">
                            <div className="relative mx-auto max-w-md rounded-3xl border border-white/60 bg-white p-6 shadow-2xl shadow-[#043927]/15 backdrop-blur-sm">
                                {/* Card Header */}
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E4F3EE] text-[#043927]">
                                            <Brain size={18} />
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-gray-900">AI Compatibility Result</p>
                                            <p className="text-[10px] text-gray-400">Lowongan: Senior Frontend Developer</p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                                        96% MATCH
                                    </span>
                                </div>

                                {/* Candidate Highlight */}
                                <div className="mt-5 flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#043927] to-[#0B5D45] text-sm font-bold text-white shadow-sm">
                                        AR
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-sm font-bold text-gray-900">Ahmad Rizky</h3>
                                        <p className="text-xs text-gray-500">Frontend Developer • Surabaya (3 Th Exp)</p>
                                        
                                        {/* Score bar */}
                                        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                            <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-[#16A085] to-[#043927]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Skills */}
                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {['React', 'TypeScript', 'Tailwind CSS', 'REST API'].map((skill) => (
                                        <span key={skill} className="rounded-md bg-[#F5F7F6] px-2 py-1 text-[10px] font-medium text-gray-600">
                                            {skill}
                                        </span>
                                    ))}
                                </div>

                                {/* AI Recommendation Rationale */}
                                <div className="mt-4 rounded-xl border border-[#E4F3EE] bg-[#F5F9F7] p-3.5">
                                    <div className="flex items-start gap-2">
                                        <Sparkles size={14} className="mt-0.5 shrink-0 text-[#16A085]" />
                                        <p className="text-[11px] leading-relaxed text-gray-600">
                                            Kandidat memiliki penguasaan ekosistem React yang solid dan relevansi pengalaman 96% terhadap kriteria vacancy yang dibuka.
                                        </p>
                                    </div>
                                </div>

                                {/* Action button mockup */}
                                <div className="mt-4 flex gap-2">
                                    <button className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#043927] py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0B5D45]">
                                        <Send size={13} />
                                        Kirim Outreach
                                    </button>
                                    <button className="flex items-center justify-center rounded-xl border border-gray-200 px-3 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
                                        Lihat CV
                                    </button>
                                </div>

                                {/* Floating Stat Bubble 1 */}
                                <div className="absolute -left-6 -top-5 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#65D6B5]/20 text-[#043927]">
                                            <Zap size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Match Speed</p>
                                            <p className="text-xs font-bold text-gray-900">0.4 Detik</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Floating Stat Bubble 2 */}
                                <div className="absolute -bottom-5 -right-6 rounded-2xl border border-gray-100 bg-white p-3 shadow-xl">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#16A085]/20 text-[#16A085]">
                                            <Users size={16} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-gray-400">Talent Pool</p>
                                            <p className="text-xs font-bold text-gray-900">1,250+ Candidates</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* ── METRICS STRIP ──────────────────────────────────── */}
            <section className="border-y border-gray-200/80 bg-white py-10">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                        {[
                            { value: '85%', label: 'Hemat Waktu Skrining CV' },
                            { value: '10x', label: 'Lebih Cepat Temukan Talenta' },
                            { value: '94%', label: 'Akurasi Rekomendasi AI' },
                            { value: '100%', label: 'Terintegrasi dalam 1 Alur' },
                        ].map((m) => (
                            <div key={m.label} className="text-center">
                                <p className="text-3xl font-black tracking-tight text-[#043927] sm:text-4xl">
                                    {m.value}
                                </p>
                                <p className="mt-1 text-xs font-medium text-gray-500">
                                    {m.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CORE FEATURES ──────────────────────────────────── */}
            <section id="fitur" className="py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#16A085]">
                            FITUR UNGGULAN
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Semua Kebutuhan Rekrutmen dalam Satu Platform
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">
                            Hilangkan pekerjaan manual berulang. Biarkan AI menganalisis, memfilter, dan menyajikan kandidat yang paling relevan untuk tim Anda.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Brain,
                                title: 'Smart AI Matching',
                                desc: 'Pencocokan kandidat otomatis terhadap lowongan kerja berdasarkan analisis kecocokan skill, pengalaman kerja, dan deskripsi vacancy.',
                                badge: 'Core AI',
                            },
                            {
                                icon: FileText,
                                title: 'Automated CV Parser',
                                desc: 'Unggah resume file PDF atau Word, data profil kontak, pendidikan, dan keahlian kandidat langsung terekstraksi rapi ke sistem.',
                                badge: 'Parser',
                            },
                            {
                                icon: CalendarCheck,
                                title: 'Interview Log & Scheduler',
                                desc: 'Atur jadwal wawancara online/offline dengan date-time picker terintegrasi. Status kandidat otomatis terbarui saat dijadwalkan.',
                                badge: 'Workflow',
                            },
                            {
                                icon: Send,
                                title: 'Multi-Channel Outreach',
                                desc: 'Kirim pesan pendekatan personal ke kandidat via Email, WhatsApp, atau LinkedIn langsung dari halaman profil tanpa pindah tab.',
                                badge: 'Engagement',
                            },
                            {
                                icon: BarChart3,
                                title: 'Recruitment Analytics',
                                desc: 'Pantau metrik conversion funnel mulai dari kandidat masuk, skrining AI, interview log, hingga kandidat berhasil di-hire.',
                                badge: 'Insights',
                            },
                            {
                                icon: Briefcase,
                                title: 'Vacancy & Job Pipeline',
                                desc: 'Manajemen lowongan kerja komprehensif mulai dari status Open, Draft, hingga Closed dengan pelacakan kandidat yang mendaftar.',
                                badge: 'Management',
                            },
                        ].map((f) => {
                            const Icon = f.icon;
                            return (
                                <div
                                    key={f.title}
                                    className="group rounded-3xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#65D6B5]/50 hover:shadow-xl hover:shadow-[#16A085]/10"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F3EE] text-[#043927] transition group-hover:bg-[#043927] group-hover:text-white">
                                            <Icon size={22} />
                                        </div>
                                        <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-bold text-gray-600">
                                            {f.badge}
                                        </span>
                                    </div>

                                    <h3 className="mt-5 text-base font-bold text-gray-900">
                                        {f.title}
                                    </h3>
                                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                                        {f.desc}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ───────────────────────────────────── */}
            <section id="cara-kerja" className="border-t border-gray-200/80 bg-white py-20 lg:py-28">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#16A085]">
                            CARA KERJA
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            4 Langkah Mudah Merekrut dengan TalentLoop
                        </h2>
                        <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
                            Proses rekrutmen yang terstruktur dari awal hingga kandidat resmi bergabung.
                        </p>
                    </div>

                    <div className="mt-14 grid gap-8 md:grid-cols-4">
                        {[
                            {
                                step: '01',
                                title: 'Buat Lowongan',
                                desc: 'Tentukan posisi pekerjaan, departemen, dan kriteria keahlian yang dibutuhkan.',
                            },
                            {
                                step: '02',
                                title: 'AI Match Scan',
                                desc: 'Pilih lowongan dan biarkan AI memindai ribuan profil kandidat dalam hitungan detik.',
                            },
                            {
                                step: '03',
                                title: 'Outreach & Interview',
                                desc: 'Hubungi kandidat terbaik via email/chat dan jadwalkan sesi wawancara langsung.',
                            },
                            {
                                step: '04',
                                title: 'Hired & Review',
                                desc: 'Catat hasil evaluasi dan terima kandidat terbaik dengan status Hired di sistem.',
                            },
                        ].map((s) => (
                            <div key={s.step} className="relative rounded-2xl border border-gray-100 bg-[#F5F7F6] p-6">
                                <span className="text-3xl font-black text-[#16A085]/30">
                                    {s.step}
                                </span>
                                <h3 className="mt-3 text-base font-bold text-gray-900">
                                    {s.title}
                                </h3>
                                <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                                    {s.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── FAQ SECTION ────────────────────────────────────── */}
            <section id="faq" className="py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#16A085]">
                            PERTANYAAN UMUM
                        </p>
                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                            Frequently Asked Questions
                        </h2>
                    </div>

                    <div className="mt-10 space-y-4">
                        {[
                            {
                                q: 'Bagaimana cara kerja AI Matching di TalentLoop?',
                                a: 'AI TalentLoop menganalisis kecocokan antara deskripsi lowongan (requirements, skill, pengalaman) dengan profil kandidat di database, lalu menghasilkan Compatibility Score (%) dan alasan rekomendasi tertulis.',
                            },
                            {
                                q: 'Apakah saya bisa mengunggah file CV dalam format PDF?',
                                a: 'Ya! Fitur Import CV mendukung format PDF dan DOCX. Sistem secara otomatis mengekstrak kontak dan keahlian kandidat ke dalam database.',
                            },
                            {
                                q: 'Bagaimana status kandidat diperbarui saat dijadwalkan interview?',
                                a: 'Saat Anda menjadwalkan interview di form penjadwalan, status kandidat otomatis berubah dari Available menjadi Interview.',
                            },
                            {
                                q: 'Apakah menu AI Matching terpisah dari menu Candidates?',
                                a: 'Tidak. Fitur AI Matching kini telah menyatu langsung di dalam halaman menu Candidates melalui tab navigasi terpadu agar mempermudah alur kerja Anda.',
                            },
                        ].map((item, idx) => (
                            <div
                                key={item.q}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition"
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="flex w-full items-center justify-between p-5 text-left text-sm font-bold text-gray-900 hover:bg-gray-50"
                                >
                                    <span>{item.q}</span>
                                    <ChevronRight
                                        size={18}
                                        className={`text-gray-400 transition-transform ${
                                            faqOpen === idx ? 'rotate-90 text-[#16A085]' : ''
                                        }`}
                                    />
                                </button>
                                {faqOpen === idx && (
                                    <div className="border-t border-gray-100 bg-[#F5F9F7]/50 p-5 text-xs leading-relaxed text-gray-600">
                                        {item.a}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CALL TO ACTION BOTTOM BANNER ───────────────────── */}
            <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#043927] via-[#0B5D45] to-[#01140E] p-10 text-white shadow-2xl lg:p-16">
                    <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-[#65D6B5]/20 blur-3xl" />
                    
                    <div className="relative z-10 max-w-2xl">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-[#65D6B5] backdrop-blur">
                            <Sparkles size={13} />
                            Mulai Sekarang
                        </div>

                        <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Siap Mengubah Cara Perusahaan Anda Merekrut Talenta?
                        </h2>

                        <p className="mt-3 text-sm leading-relaxed text-white/70 sm:text-base">
                            Bergabunglah dengan platform rekrutmen cerdas TalentLoop. Temukan kandidat impian lebih cepat, lebih pintar, dan bebas ribet.
                        </p>

                        <div className="mt-8 flex flex-wrap gap-4">
                            <Link
                                href={auth?.user ? route('dashboard') : route('login')}
                                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#65D6B5] to-[#16A085] px-6 py-3.5 text-xs font-bold text-[#043927] shadow-lg transition hover:scale-105"
                            >
                                {auth?.user ? 'Buka Dashboard' : 'Masuk ke TalentLoop'}
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ─────────────────────────────────────────── */}
            <footer className="border-t border-gray-200 bg-[#043927] text-white">
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Kolom 1 — Identitas Brand */}
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#16A085] text-white">
                                    <span className="text-xl font-black">∞</span>
                                </div>
                                <span className="text-lg font-bold">
                                    Talent<span className="text-[#65D6B5]">Loop</span>
                                </span>
                            </div>
                            <p className="text-sm text-gray-300 leading-relaxed mb-5">
                                Ubah Dead CV Jadi Ready-to-Hire Assets
                            </p>
                            <div className="flex gap-3">
                                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-[#16A085] hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-[#16A085] hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-[#16A085] hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                                </a>
                                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-gray-300 transition hover:bg-[#16A085] hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                </a>
                            </div>
                        </div>

                        {/* Kolom 2 — Produk & Solusi */}
                        <div>
                            <h4 className="text-sm font-bold text-[#65D6B5] uppercase tracking-wider mb-4">Produk & Solusi</h4>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Harga (Pricing)</a></li>
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Integrasi API HRIS</a></li>
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Bulk Data Extraction</a></li>
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Holistic Re-matching</a></li>
                            </ul>
                        </div>

                        {/* Kolom 3 — Sumber Daya */}
                        <div>
                            <h4 className="text-sm font-bold text-[#65D6B5] uppercase tracking-wider mb-4">Sumber Daya</h4>
                            <ul className="space-y-2.5">
                                <li><a href="#faq" className="text-sm text-gray-300 hover:text-white transition">Pusat Bantuan (FAQ)</a></li>
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Studi Kasus Efisiensi HR</a></li>
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Blog/Artikel Rekrutmen</a></li>
                            </ul>
                        </div>

                        {/* Kolom 4 — Perusahaan */}
                        <div>
                            <h4 className="text-sm font-bold text-[#65D6B5] uppercase tracking-wider mb-4">Perusahaan</h4>
                            <ul className="space-y-2.5">
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Tentang Kami</a></li>
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Hubungi Tim Sales</a></li>
                                <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Karir</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Copyright Bar */}
                    <div className="mt-10 border-t border-white/10 pt-6 text-center">
                        <p className="text-xs text-gray-400">
                            © 2026 TalentLoop AI. All rights reserved. Platform Intelijen Talenta & Rekrutmen Modern.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
