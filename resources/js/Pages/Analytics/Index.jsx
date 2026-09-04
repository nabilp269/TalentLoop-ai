import { Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Users, Briefcase, CalendarCheck, Send, TrendingUp, UserCheck, UserX, Brain } from 'lucide-react';

export default function Index({ stats = {}, funnel = [] }) {
    const s = stats;

    const cards = [
        { label: 'Total Candidates',  value: s.totalCandidates ?? 0,  icon: Users,         color: 'bg-blue-50   text-blue-600' },
        { label: 'Available',          value: s.available ?? 0,        icon: UserCheck,     color: 'bg-emerald-50 text-emerald-600' },
        { label: 'In Interview',       value: s.interview ?? 0,        icon: Brain,         color: 'bg-yellow-50 text-yellow-600' },
        { label: 'Hired',              value: s.hired ?? 0,            icon: TrendingUp,    color: 'bg-[#E4F3EE] text-[#043927]' },
        { label: 'Rejected',           value: s.rejected ?? 0,         icon: UserX,         color: 'bg-red-50    text-red-500' },
        { label: 'Open Jobs',          value: s.openJobs ?? 0,         icon: Briefcase,     color: 'bg-purple-50 text-purple-600' },
        { label: 'Total Interviews',   value: s.totalInterviews ?? 0,  icon: CalendarCheck, color: 'bg-orange-50 text-orange-500' },
        { label: 'Total Outreach',     value: s.totalOutreach ?? 0,    icon: Send,          color: 'bg-pink-50   text-pink-500' },
    ];

    return (
        <AuthenticatedLayout>
            <Head title="Analytics" />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* HEADER */}
                <div>
                    <p className="text-xs font-medium text-[#16A085]">Insights & Reports</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
                    <p className="mt-1 text-sm text-gray-400">
                        Overview rekrutmen — kandidat mlebu piro, lolos piro, keterima piro.
                    </p>
                </div>

                {/* STATS GRID */}
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {cards.map(({ label, value, icon: Icon, color }) => (
                        <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
                                <Icon size={18} />
                            </div>
                            <p className="mt-3 text-2xl font-bold text-gray-900">{value}</p>
                            <p className="mt-1 text-[11px] font-medium text-gray-400">{label}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-2">

                    {/* RECRUITMENT FUNNEL */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <h2 className="mb-1 text-sm font-bold text-gray-900">Recruitment Funnel</h2>
                        <p className="mb-5 text-[11px] text-gray-400">Alur kandidat dari masuk hingga hired</p>

                        {funnel.length > 0 ? (
                            <div className="space-y-4">
                                {funnel.map(({ label, value }) => {
                                    const max = funnel[0]?.value || 1;
                                    const pct = Math.round((value / max) * 100);
                                    return (
                                        <div key={label}>
                                            <div className="mb-1.5 flex justify-between text-xs">
                                                <span className="font-medium text-gray-600">{label}</span>
                                                <span className="font-bold text-[#043927]">{value}</span>
                                            </div>
                                            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-[#043927] to-[#16A085] transition-all"
                                                    style={{ width: `${pct}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-10 text-center">
                                <p className="text-sm text-gray-400">Belum ada data kandidat.</p>
                            </div>
                        )}
                    </div>

                    {/* RATES */}
                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <h2 className="mb-1 text-sm font-bold text-gray-900">Key Metrics</h2>
                        <p className="mb-5 text-[11px] text-gray-400">Performa rekrutmen secara keseluruhan</p>

                        <div className="space-y-4">
                            <Metric label="Hiring Rate" value={`${s.hiringRate ?? 0}%`}
                                desc={`${s.hired ?? 0} dari ${s.totalCandidates ?? 0} kandidat`}
                                color="bg-emerald-500" pct={s.hiringRate ?? 0} />

                            <Metric label="Outreach Reply Rate" value={`${s.replyRate ?? 0}%`}
                                desc={`${s.repliedOutreach ?? 0} dari ${s.totalOutreach ?? 0} outreach`}
                                color="bg-blue-500" pct={s.replyRate ?? 0} />

                            <Metric label="Interview Completion"
                                value={s.totalInterviews > 0
                                    ? `${Math.round((s.doneInterviews / s.totalInterviews) * 100)}%`
                                    : '0%'}
                                desc={`${s.doneInterviews ?? 0} dari ${s.totalInterviews ?? 0} interview`}
                                color="bg-purple-500"
                                pct={s.totalInterviews > 0 ? Math.round((s.doneInterviews / s.totalInterviews) * 100) : 0} />
                        </div>
                    </div>

                </div>

                {/* JOB STATS */}
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                    {[
                        { label: 'Open Jobs',   value: s.openJobs ?? 0,   color: 'border-emerald-200 bg-emerald-50' },
                        { label: 'Closed Jobs', value: s.closedJobs ?? 0, color: 'border-gray-200    bg-gray-50' },
                        { label: 'Total Jobs',  value: s.totalJobs ?? 0,  color: 'border-blue-200   bg-blue-50' },
                    ].map(({ label, value, color }) => (
                        <div key={label} className={`rounded-2xl border p-5 ${color}`}>
                            <p className="text-[11px] font-medium text-gray-500">{label}</p>
                            <p className="mt-1 text-3xl font-bold text-gray-900">{value}</p>
                        </div>
                    ))}
                </div>

            </div>
        </AuthenticatedLayout>
    );
}

function Metric({ label, value, desc, color, pct }) {
    return (
        <div>
            <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-700">{label}</span>
                <span className="font-bold text-gray-900">{value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                <div className={`h-full rounded-full transition-all ${color}`} style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1 text-[10px] text-gray-400">{desc}</p>
        </div>
    );
}
