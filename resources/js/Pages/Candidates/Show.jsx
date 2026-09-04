import { Head, Link, useForm, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {
    ArrowLeft,
    MapPin,
    Briefcase,
    Mail,
    Phone,
    Star,
    Send,
    CalendarCheck,
    FileText,
    Trash2,
    MessageSquare,
} from 'lucide-react';
import { useState } from 'react';

const statusStyles = {
    Available: 'bg-emerald-50 text-emerald-700',
    Interview:  'bg-yellow-50  text-yellow-700',
    Hired:      'bg-blue-50    text-blue-700',
    Rejected:   'bg-red-50     text-red-700',
};

export default function Show({ candidate }) {
    const [showOutreach, setShowOutreach] = useState(false);

    const outreachForm = useForm({
        candidate_id: candidate.id,
        channel:      'Email',
        message:      '',
    });

    function sendOutreach(e) {
        e.preventDefault();
        outreachForm.post(route('outreach.store'), {
            onSuccess: () => {
                setShowOutreach(false);
                outreachForm.reset('message');
            },
        });
    }

    function deleteCandidate() {
        if (confirm(`Hapus kandidat ${candidate.name}? Tindakan ini tidak dapat dibatalkan.`)) {
            router.delete(route('candidates.destroy', candidate.id));
        }
    }

    return (
        <AuthenticatedLayout>
            <Head title={candidate.name} />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* HEADER */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('candidates.index')}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                        <ArrowLeft size={17} />
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold text-gray-900">{candidate.name}</h1>
                        <p className="text-sm text-gray-400">{candidate.role}</p>
                    </div>
                    <button
                        onClick={deleteCandidate}
                        className="flex items-center gap-1.5 rounded-xl border border-red-100 bg-red-50 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-100"
                    >
                        <Trash2 size={14} />
                        Hapus
                    </button>
                </div>

                <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_320px]">

                    {/* LEFT */}
                    <div className="space-y-5">

                        {/* PROFILE CARD */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#E8F3EE] text-xl font-bold text-[#043927]">
                                    {candidate.initials}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">{candidate.name}</h2>
                                            <p className="text-sm text-gray-500">{candidate.role}</p>
                                        </div>
                                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[candidate.status]}`}>
                                            {candidate.status}
                                        </span>
                                    </div>

                                    <div className="mt-3 grid gap-2 sm:grid-cols-2">
                                        {candidate.email && (
                                            <InfoRow icon={Mail} label={candidate.email} />
                                        )}
                                        {candidate.phone && (
                                            <InfoRow icon={Phone} label={candidate.phone} />
                                        )}
                                        {candidate.location && (
                                            <InfoRow icon={MapPin} label={candidate.location} />
                                        )}
                                        {candidate.experience_years > 0 && (
                                            <InfoRow icon={Briefcase} label={`${candidate.experience_years} Tahun Pengalaman`} />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* match score */}
                            {candidate.score > 0 && (
                                <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F5F9F7] px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <Star size={16} className="fill-[#043927] text-[#043927]" />
                                        <span className="text-sm font-medium text-gray-600">AI Match Score</span>
                                    </div>
                                    <span className="text-lg font-bold text-[#043927]">{candidate.score}%</span>
                                </div>
                            )}

                            {/* skills */}
                            {candidate.skills?.length > 0 && (
                                <div className="mt-5">
                                    <p className="mb-2 text-xs font-semibold text-gray-500">Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {candidate.skills.map((s) => (
                                            <span key={s} className="rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* notes */}
                            {candidate.notes && (
                                <div className="mt-5">
                                    <p className="mb-1 text-xs font-semibold text-gray-500">Catatan</p>
                                    <p className="text-sm leading-relaxed text-gray-600">{candidate.notes}</p>
                                </div>
                            )}
                        </div>

                        {/* INTERVIEW HISTORY */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-bold text-gray-900">Interview Log</h3>
                                <Link
                                    href={route('interviews.create')}
                                    className="text-xs font-semibold text-[#043927] hover:underline"
                                >
                                    + Jadwalkan
                                </Link>
                            </div>

                            {candidate.interviews?.length > 0 ? (
                                <div className="mt-4 space-y-3">
                                    {candidate.interviews.map((iv) => (
                                        <div key={iv.id} className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E4F3EE] text-[#043927]">
                                                <CalendarCheck size={16} />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-xs font-semibold text-gray-800">
                                                    {iv.job?.title ?? 'Unknown Job'}
                                                </p>
                                                <p className="mt-0.5 text-[10px] text-gray-400">
                                                    {iv.scheduled_at} · {iv.type}
                                                </p>
                                            </div>
                                            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                iv.status === 'Done'      ? 'bg-emerald-50 text-emerald-700' :
                                                iv.status === 'Cancelled' ? 'bg-red-50 text-red-600'        :
                                                                            'bg-yellow-50 text-yellow-700'
                                            }`}>
                                                {iv.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-4 text-xs text-gray-400">Belum ada jadwal interview.</p>
                            )}
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="space-y-5">

                        {/* QUICK ACTIONS */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">Quick Actions</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => setShowOutreach(true)}
                                    className="flex w-full items-center gap-3 rounded-xl bg-[#043927] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0B5D45]"
                                >
                                    <Send size={16} />
                                    Kirim Outreach
                                </button>

                                <Link
                                    href={route('interviews.create')}
                                    className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                >
                                    <CalendarCheck size={16} />
                                    Jadwalkan Interview
                                </Link>

                                {candidate.cv_path && (
                                    <a
                                        href={`/storage/${candidate.cv_path}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex w-full items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                                    >
                                        <FileText size={16} />
                                        Lihat CV
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* OUTREACH HISTORY */}
                        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <h3 className="mb-4 text-sm font-bold text-gray-900">Outreach History</h3>
                            {candidate.outreach?.length > 0 ? (
                                <div className="space-y-3">
                                    {candidate.outreach.map((o) => (
                                        <div key={o.id} className="rounded-xl bg-gray-50 p-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MessageSquare size={13} className="text-[#043927]" />
                                                    <span className="text-xs font-semibold text-gray-700">{o.channel}</span>
                                                </div>
                                                <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                                                    o.status === 'Replied'    ? 'bg-emerald-50 text-emerald-700' :
                                                    o.status === 'No Response'? 'bg-red-50 text-red-600'        :
                                                                                'bg-blue-50 text-blue-700'
                                                }`}>
                                                    {o.status}
                                                </span>
                                            </div>
                                            {o.message && (
                                                <p className="mt-1.5 text-[11px] leading-relaxed text-gray-500 line-clamp-2">
                                                    {o.message}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-xs text-gray-400">Belum ada outreach yang dikirim.</p>
                            )}
                        </div>

                    </div>
                </div>
            </div>

            {/* OUTREACH MODAL */}
            {showOutreach && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <h3 className="text-base font-bold text-gray-900">Kirim Outreach</h3>
                        <p className="mt-0.5 text-xs text-gray-400">ke {candidate.name}</p>

                        <form onSubmit={sendOutreach} className="mt-4 space-y-4">
                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-gray-600">Channel</label>
                                <select
                                    value={outreachForm.data.channel}
                                    onChange={(e) => outreachForm.setData('channel', e.target.value)}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#043927] focus:outline-none focus:ring-1 focus:ring-[#043927]"
                                >
                                    <option>Email</option>
                                    <option>WhatsApp</option>
                                    <option>LinkedIn</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-gray-600">Pesan</label>
                                <textarea
                                    rows={4}
                                    value={outreachForm.data.message}
                                    onChange={(e) => outreachForm.setData('message', e.target.value)}
                                    placeholder="Tulis pesan outreach di sini..."
                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#043927] focus:outline-none focus:ring-1 focus:ring-[#043927]"
                                />
                                {outreachForm.errors.message && (
                                    <p className="mt-1 text-xs text-red-500">{outreachForm.errors.message}</p>
                                )}
                            </div>

                            <div className="flex gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={() => setShowOutreach(false)}
                                    className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={outreachForm.processing}
                                    className="flex-1 rounded-xl bg-[#043927] py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45] disabled:opacity-60"
                                >
                                    {outreachForm.processing ? 'Mengirim...' : 'Kirim'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}

function InfoRow({ icon: Icon, label }) {
    return (
        <div className="flex items-center gap-2 text-sm text-gray-500">
            <Icon size={14} className="shrink-0 text-gray-400" />
            <span className="truncate">{label}</span>
        </div>
    );
}
