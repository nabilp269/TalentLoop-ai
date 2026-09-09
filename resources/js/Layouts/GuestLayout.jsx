import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#F5F7F6]">

            <div className="flex min-h-screen">

                {/* =========================================
                    LEFT SIDE - BRAND
                ========================================== */}
                <div className="relative hidden w-1/2 overflow-hidden bg-[#043927] lg:flex">

                    {/* Decorative Glowing Orbs */}
                    <div className="absolute -right-32 -top-32 h-[550px] w-[550px] rounded-full bg-gradient-to-bl from-[#65D6B5] to-[#16A085] opacity-40 blur-[100px] animate-pulse mix-blend-screen" />
                    <div className="absolute -bottom-32 -left-32 h-[650px] w-[650px] rounded-full bg-gradient-to-tr from-[#16A085] to-[#043927] opacity-60 blur-[120px] mix-blend-screen" />
                    <div className="absolute bottom-20 right-20 h-[300px] w-[300px] rounded-full bg-[#65D6B5] opacity-10 blur-[80px]" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#16A085]">
                                <span className="text-2xl font-black text-white">
                                    ∞
                                </span>
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-white">
                                    Talent<span className="text-[#65D6B5]">Loop</span>
                                </h1>

                                <p className="text-[10px] text-white/40">
                                    Talent Intelligence Platform
                                </p>
                            </div>
                        </Link>


                        {/* Main text */}
                        <div className="max-w-xl">

                            <div className="mb-5 inline-flex items-center rounded-full border border-[#16A085]/30 bg-[#16A085]/10 px-3 py-1.5">
                                <span className="mr-2 h-2 w-2 rounded-full bg-[#65D6B5]" />

                                <span className="text-[10px] font-semibold text-[#65D6B5]">
                                    AI-POWERED RECRUITMENT
                                </span>
                            </div>

                            <h2 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                                Turn Dead CVs Into
                                <br />

                                <span className="text-[#65D6B5]">
                                    Ready-to-Hire Assets.
                                </span>
                            </h2>

                            <p className="mt-6 max-w-lg text-sm leading-7 text-white/50">
                                Temukan kembali kandidat terbaik dari database
                                lama perusahaan menggunakan AI Matching,
                                Historical Interview Logs, dan Automated
                                Engagement.
                            </p>


                            {/* Feature */}
                            <div className="mt-8 grid grid-cols-3 gap-3">

                                <Feature
                                    number="01"
                                    title="AI Matching"
                                    text="Analisis & cocokkan kandidat"
                                />

                                <Feature
                                    number="02"
                                    title="Smart Import"
                                    text="Import & kelola CV cepat"
                                />

                                <Feature
                                    number="03"
                                    title="Re-engage"
                                    text="Hubungi kandidat lama"
                                />

                            </div>

                        </div>


                        {/* Footer */}
                        <p className="text-[10px] text-white/30">
                            © 2026 TalentLoop. Talent Intelligence Platform.
                        </p>

                    </div>
                </div>


                {/* =========================================
                    RIGHT SIDE - FORM
                ========================================== */}
                <div className="flex w-full items-center justify-center bg-white px-5 py-10 lg:w-1/2">

                    <div className="w-full max-w-md">

                        {/* Mobile Logo */}
                        <div className="mb-10 flex justify-center lg:hidden">

                            <Link
                                href="/"
                                className="flex items-center gap-3"
                            >

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#043927]">
                                    <span className="text-2xl font-black text-white">
                                        ∞
                                    </span>
                                </div>

                                <div>
                                    <h1 className="text-xl font-bold text-[#043927]">
                                        Talent<span className="text-[#16A085]">
                                            Loop
                                        </span>
                                    </h1>

                                    <p className="text-[10px] text-gray-400">
                                        Talent Intelligence
                                    </p>
                                </div>

                            </Link>

                        </div>


                        {/* Form */}
                        {children}

                    </div>

                </div>

            </div>

        </div>
    );
}


/* =========================================
   FEATURE COMPONENT
========================================= */

function Feature({
    number,
    title,
    text,
}) {
    return (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-2xl">

            <p className="text-[9px] font-bold text-[#65D6B5]">
                {number}
            </p>

            <p className="mt-2 text-xs font-bold text-white">
                {title}
            </p>

            <p className="mt-1 text-[9px] leading-4 text-white/30">
                {text}
            </p>

        </div>
    );
}