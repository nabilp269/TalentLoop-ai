import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, CalendarCheck, Clock, CheckCircle2, XCircle, User } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const statusStyles = {
    Scheduled: { bg: 'bg-yellow-50 text-yellow-700', icon: Clock },
    Interview: { bg: 'bg-blue-50 text-blue-700', icon: User },
    Done: { bg: 'bg-emerald-50 text-emerald-700', icon: CheckCircle2 },
    Cancelled: { bg: 'bg-red-50 text-red-600', icon: XCircle },
};

export default function Index({ interviews = [], filters = {} }) {
    const [status, setStatus] = useState(filters.status ?? 'All');
    const visible = interviews.filter(i => status === 'All' || i.status === status);

    function startInterview(interview) {
        router.patch(route('interviews.update', interview.id), { status: 'Interview' }, {
            preserveScroll: true,
            onSuccess: () => router.visit(route('interviews.session', interview.id)),
        });
    }

    return <AuthenticatedLayout>
        <Head title="Interview Logs" />
        <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-xs font-medium text-[#16A085]">Interview Management</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Interview Logs</h1><p className="mt-1 text-sm text-gray-400">Pantau jadwal dan proses interview kandidat.</p></div>
                <Link href={route('interviews.create')} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#0B5D45]"><Plus size={14} /> Jadwalkan Interview</Link>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">{[{ label: 'Total', value: interviews.length }, { label: 'Scheduled', value: interviews.filter(i => i.status === 'Scheduled').length }, { label: 'In Progress', value: interviews.filter(i => i.status === 'Interview').length }].map(({ label, value }) => <div key={label} className="rounded-xl border border-gray-100 bg-white px-4 py-3 shadow-sm"><p className="text-[10px] font-medium text-gray-400">{label}</p><p className="mt-1 text-xl font-bold text-gray-900">{value}</p></div>)}</div>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-0.5">{['All', 'Scheduled', 'Interview', 'Done', 'Cancelled'].map(s => <button key={s} onClick={() => setStatus(s)} className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-semibold ${status === s ? 'bg-[#043927] text-white' : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'}`}>{s}</button>)}</div>
            <div className="mt-4 space-y-3">{visible.map(iv => {
                const style = statusStyles[iv.status] ?? statusStyles.Scheduled;
                const StatusIcon = style.icon;
                return <div key={iv.id} className="flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3EE] text-sm font-bold text-[#043927]">{iv.candidate.initials}</div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="text-sm font-bold text-gray-900">{iv.candidate.name}</h3><span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${style.bg}`}><span className="flex items-center gap-1"><StatusIcon size={10} />{iv.status}</span></span>{iv.decision && <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[10px] font-semibold text-gray-600">{decisionLabel(iv.decision)}</span>}</div><p className="mt-0.5 text-xs text-gray-400">{iv.candidate.role}</p><div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500"><span className="flex items-center gap-1"><CalendarCheck size={12} />{iv.scheduled_at}</span><span className="flex items-center gap-1"><User size={12} />{iv.job.title}</span><span className="rounded-full bg-gray-100 px-2 py-0.5">{iv.type}</span></div></div>{iv.status === 'Scheduled' && <button onClick={() => startInterview(iv)} className="shrink-0 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100">Mulai Interview</button>}{iv.status === 'Interview' && <Link href={route('interviews.session', iv.id)} className="shrink-0 rounded-xl bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-700 hover:bg-blue-100">Lanjutkan Interview</Link>}</div>;
            })}</div>
            {visible.length === 0 && <div className="mt-5 rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center"><CalendarCheck size={32} className="mx-auto text-gray-300" /><h3 className="mt-4 text-sm font-semibold text-gray-700">Belum ada jadwal interview</h3></div>}
        </div>
    </AuthenticatedLayout>;
}

function decisionLabel(decision) {
    return { Hired: 'Diterima', Rejected: 'Ditolak', Consideration: 'Dipertimbangkan' }[decision] ?? decision;
}
