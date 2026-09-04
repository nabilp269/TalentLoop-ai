import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import { Head, Link } from '@inertiajs/react';

import {
    Brain,
    Search,
    SlidersHorizontal,
    ArrowUpRight,
    Sparkles,
} from 'lucide-react';

export default function Index() {

    const matches = [
        {
            name: 'Ahmad Rizky',
            role: 'Frontend Developer',
            score: 92,
            skills: ['React', 'Laravel', 'JavaScript'],
            reason: 'Strong React experience and relevant education.',
            initials: 'AR',
        },
        {
            name: 'Fajar Ramadhan',
            role: 'Frontend Developer',
            score: 88,
            skills: ['React', 'Node.js', 'TypeScript'],
            reason: 'Excellent JavaScript ecosystem experience.',
            initials: 'FR',
        },
        {
            name: 'Dimas Pratama',
            role: 'Backend Developer',
            score: 84,
            skills: ['Laravel', 'PHP', 'PostgreSQL'],
            reason: 'Strong Laravel and database background.',
            initials: 'DP',
        },
        {
            name: 'Raka Wijaya',
            role: 'AI Engineer',
            score: 81,
            skills: ['Python', 'AI', 'TensorFlow'],
            reason: 'Relevant AI and machine learning experience.',
            initials: 'RW',
        },
    ];

    return (
        <AuthenticatedLayout>

            <Head title="AI Matching" />

            <div className="min-h-screen px-4 pb-28 pt-6 sm:px-6 lg:px-8 lg:pb-10">

                {/* HEADER */}
                <div>

                    <div className="flex items-center gap-2">

                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E4F3EE] text-[#043927]">
                            <Brain size={18} />
                        </div>

                        <div>

                            <p className="text-[9px] font-bold uppercase tracking-wider text-[#16A085]">
                                AI TALENT INTELLIGENCE
                            </p>

                            <h1 className="text-2xl font-bold text-gray-900">
                                AI Matching
                            </h1>

                        </div>

                    </div>

                    <p className="mt-2 text-sm text-gray-400">
                        Temukan kandidat paling relevan berdasarkan skill,
                        pendidikan, pengalaman, dan historical evaluation.
                    </p>

                </div>


                {/* JOB SELECT */}
                <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <div className="flex flex-col gap-4 md:flex-row md:items-end">

                        <div className="flex-1">

                            <label className="text-[10px] font-semibold text-gray-500">
                                Select Vacancy
                            </label>

                            <select className="mt-2 w-full rounded-xl border-gray-200 text-xs focus:border-[#16A085] focus:ring-[#16A085]">
                                <option>
                                    Frontend Developer
                                </option>

                                <option>
                                    Backend Developer
                                </option>

                                <option>
                                    UI/UX Designer
                                </option>
                            </select>

                        </div>

                        <button className="flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-5 py-3 text-xs font-semibold text-white hover:bg-[#0B5D45]">
                            <Sparkles size={15} />
                            Run AI Matching
                        </button>

                    </div>

                </div>


                {/* RESULT HEADER */}
                <div className="mt-7 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">

                    <div>

                        <h2 className="text-sm font-bold text-gray-900">
                            186 Potential Matches
                        </h2>

                        <p className="mt-1 text-[10px] text-gray-400">
                            Sorted by highest AI compatibility score.
                        </p>

                    </div>

                    <div className="flex gap-2">

                        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2">

                            <Search
                                size={14}
                                className="text-gray-400"
                            />

                            <input
                                placeholder="Search..."
                                className="w-24 border-0 p-0 text-[10px] outline-none focus:ring-0"
                            />

                        </div>

                        <button className="rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500">
                            <SlidersHorizontal size={15} />
                        </button>

                    </div>

                </div>


                {/* MATCH CARDS */}
                <div className="mt-4 grid gap-4 md:grid-cols-2">

                    {matches.map((candidate) => (

                        <div
                            key={candidate.name}
                            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
                        >

                            <div className="flex items-start gap-3">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCEFE9] text-xs font-bold text-[#043927]">
                                    {candidate.initials}
                                </div>

                                <div className="min-w-0 flex-1">

                                    <div className="flex items-start justify-between">

                                        <div>

                                            <h3 className="text-sm font-bold text-gray-800">
                                                {candidate.name}
                                            </h3>

                                            <p className="mt-1 text-[10px] text-gray-400">
                                                {candidate.role}
                                            </p>

                                        </div>

                                        <div className="text-right">

                                            <p className="text-xl font-black text-[#043927]">
                                                {candidate.score}%
                                            </p>

                                            <p className="text-[8px] text-gray-400">
                                                AI MATCH
                                            </p>

                                        </div>

                                    </div>


                                    {/* PROGRESS */}
                                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-100">

                                        <div
                                            className="h-full rounded-full bg-[#16A085]"
                                            style={{
                                                width: `${candidate.score}%`,
                                            }}
                                        />

                                    </div>


                                    {/* SKILLS */}
                                    <div className="mt-4 flex flex-wrap gap-1.5">

                                        {candidate.skills.map((skill) => (

                                            <span
                                                key={skill}
                                                className="rounded-md bg-[#F5F7F6] px-2 py-1 text-[9px] text-gray-500"
                                            >
                                                {skill}
                                            </span>

                                        ))}

                                    </div>


                                    {/* REASON */}
                                    <div className="mt-4 rounded-xl bg-[#F5F7F6] p-3">

                                        <div className="flex gap-2">

                                            <Sparkles
                                                size={13}
                                                className="mt-0.5 shrink-0 text-[#16A085]"
                                            />

                                            <p className="text-[10px] leading-relaxed text-gray-500">
                                                {candidate.reason}
                                            </p>

                                        </div>

                                    </div>


                                    <Link
                                        href={route(
                                            'candidates.show',
                                            candidate.initials === 'AR'
                                                ? 1
                                                : candidate.initials === 'FR'
                                                ? 2
                                                : candidate.initials === 'DP'
                                                ? 3
                                                : 4
                                        )}
                                        className="mt-4 flex items-center justify-end gap-1 text-[10px] font-semibold text-[#043927]"
                                    >
                                        View Candidate
                                        <ArrowUpRight size={12} />
                                    </Link>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </AuthenticatedLayout>
    );
}