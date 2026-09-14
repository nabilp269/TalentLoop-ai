import { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, BriefcaseBusiness, CalendarCheck, CheckCircle2, Mail, MessageCircle, Save } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Session({ interview }) {
    const [notes, setNotes] = useState(interview.notes ?? '');
    const [decisionOpen, setDecisionOpen] = useState(false);
    const [decision, setDecision] = useState('Consideration');
    const [saving, setSaving] = useState(false);
    const phone = interview.candidate.phone?.replace(/\D/g, '');

    function saveNotes() {
        setSaving(true);
        router.patch(route('interviews.update', interview.id), { notes }, {
            preserveScroll: true,
            onFinish: () => setSaving(false),
        });
    }

    function finishInterview() {
        router.patch(route('interviews.update', interview.id), { status: 'Done', notes, decision }, {
            onSuccess: () => router.visit(route('interviews.index')),
        });
    }

    return <AuthenticatedLayout>
        <Head title={`Interview: ${interview.candidate.name}`} />
        <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:px-8">
            <Link href={route('interviews.index')} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#043927]"><ArrowLeft size={17} /> Kembali ke Interview Logs</Link>
            <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold text-[#16A085]">Sesi interview berlangsung</p><h1 className="mt-1 text-2xl font-bold text-gray-900">{interview.candidate.name}</h1><p className="mt-1 text-sm text-gray-500">{interview.candidate.role} · {interview.job.title}</p></div><span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"><CalendarCheck size={13} /> {interview.scheduled_at}</span></div>
                <div className="mt-5 flex flex-wrap gap-2"><a href={phone ? `https://wa.me/${phone}` : undefined} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${phone ? 'border-gray-200 text-gray-700 hover:bg-gray-50' : 'pointer-events-none border-gray-100 text-gray-300'}`}><MessageCircle size={15} /> WhatsApp</a><a href={`mailto:${interview.candidate.email}?subject=${encodeURIComponent(`Interview ${interview.job.title}`)}`} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"><Mail size={15} /> Email</a><a href={`https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(interview.candidate.name)}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50"><BriefcaseBusiness size={15} /> LinkedIn</a></div>
                <div className="mt-7"><label className="text-base font-bold text-gray-900">Catatan interview</label><p className="mt-1 text-sm text-gray-500">Catat jawaban kandidat, kekuatan, area yang perlu digali, dan tindak lanjut.</p><textarea value={notes} onChange={e => setNotes(e.target.value)} rows={18} placeholder="Mulai tuliskan hasil interview di sini..." className="mt-4 min-h-96 w-full rounded-2xl border border-gray-200 p-4 text-sm leading-6 text-gray-700 outline-none focus:border-[#043927] focus:ring-1 focus:ring-[#043927]" /></div>
                <div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><button onClick={saveNotes} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60"><Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan Catatan'}</button><button onClick={() => setDecisionOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45]"><CheckCircle2 size={16} /> Interview Selesai</button></div>
            </div>
        </div>
        {decisionOpen && <DecisionModal candidateName={interview.candidate.name} decision={decision} setDecision={setDecision} onClose={() => setDecisionOpen(false)} onConfirm={finishInterview} />}
    </AuthenticatedLayout>;
}

function DecisionModal({ candidateName, decision, setDecision, onClose, onConfirm }) {
    const options = [{ value: 'Hired', label: 'Diterima', description: 'Kandidat akan berstatus Hired.' }, { value: 'Consideration', label: 'Masih dipertimbangkan', description: 'Kandidat tetap berstatus Interview.' }, { value: 'Rejected', label: 'Ditolak', description: 'Kandidat akan berstatus Rejected.' }];
    return <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-lg font-bold text-gray-900">Hasil interview</h2><p className="mt-1 text-sm text-gray-500">Tentukan keputusan untuk {candidateName}.</p><div className="mt-5 space-y-3">{options.map(option => <button key={option.value} onClick={() => setDecision(option.value)} className={`w-full rounded-xl border p-4 text-left ${decision === option.value ? 'border-[#043927] bg-[#E8F3EE]' : 'border-gray-200 hover:bg-gray-50'}`}><p className="text-sm font-bold text-gray-800">{option.label}</p><p className="mt-1 text-xs text-gray-500">{option.description}</p></button>)}</div><div className="mt-6 flex gap-3"><button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">Kembali</button><button onClick={onConfirm} className="flex-1 rounded-xl bg-[#043927] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45]">Simpan Hasil</button></div></div></div>;
}
