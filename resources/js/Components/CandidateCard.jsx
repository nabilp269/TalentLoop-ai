import {
    ArrowUpRight,
    MapPin,
} from 'lucide-react';

export default function CandidateCard({
    name,
    role,
    skills = [],
    score,
    location = 'Surabaya, Indonesia',
    initials = 'AR',
}) {
    return (
        <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">

            {/* TOP ROW — avatar + name + score */}
            <div className="flex items-start gap-3">

                {/* AVATAR */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#DCEFE9] text-xs font-bold text-[#043927]">
                    {initials}
                </div>

                {/* NAME / ROLE / SCORE */}
                <div className="min-w-0 flex-1">

                    <div className="flex items-start justify-between gap-2">

                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-bold text-gray-900">
                                {name}
                            </h3>

                            <p className="mt-0.5 truncate text-[11px] text-gray-400">
                                {role}
                            </p>
                        </div>

                        {/* score badge — shrink-0 so it never gets squeezed */}
                        <span className="shrink-0 rounded-lg bg-[#E4F3EE] px-2 py-1 text-xs font-bold text-[#043927]">
                            {score}%
                        </span>

                    </div>

                    {/* LOCATION */}
                    <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-400">
                        <MapPin size={10} className="shrink-0" />
                        <span className="truncate">{location}</span>
                    </div>

                </div>

            </div>

            {/* SKILLS */}
            <div className="mt-3 flex flex-wrap gap-1.5">
                {skills.slice(0, 3).map((skill) => (
                    <span
                        key={skill}
                        className="rounded-md bg-gray-50 px-2 py-1 text-[10px] font-medium text-gray-500"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* FOOTER */}
            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-3 mt-4">

                <span className="text-[10px] text-gray-400">
                    AI Match
                </span>

                <button className="flex items-center gap-1 text-[10px] font-semibold text-[#043927] opacity-70 transition group-hover:opacity-100">
                    View Profile
                    <ArrowUpRight size={12} />
                </button>

            </div>

        </div>
    );
}
