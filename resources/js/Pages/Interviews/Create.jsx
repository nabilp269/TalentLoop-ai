import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft } from 'lucide-react';

export default function Create({ candidates = [], jobs = [], defaultCandidateId = '' }) {
    const { data, setData, post, processing, errors } = useForm({
        candidate_id: defaultCandidateId || '',
        job_id:       '',
        scheduled_at: '',
        type:         'Online',
        notes:        '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('interviews.store'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Jadwalkan Interview" />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                <div className="flex items-center gap-4">
                    <Link href={route('interviews.index')}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50">
                        <ArrowLeft size={17} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Jadwalkan Interview</h1>
                        <p className="mt-0.5 text-sm text-gray-400">Atur jadwal interview untuk kandidat.</p>
                    </div>
                </div>

                <form onSubmit={submit} className="mt-6 max-w-lg space-y-5">

                    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm space-y-4">

                        <Field label="Kandidat" error={errors.candidate_id} required>
                            <select value={data.candidate_id} onChange={e => setData('candidate_id', e.target.value)}
                                className={inp(errors.candidate_id)}>
                                <option value="">-- Pilih Kandidat --</option>
                                {candidates.map(c => (
                                    <option key={c.id} value={c.id}>{c.name} — {c.role}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Posisi / Lowongan" error={errors.job_id} required>
                            <select value={data.job_id} onChange={e => setData('job_id', e.target.value)}
                                className={inp(errors.job_id)}>
                                <option value="">-- Pilih Lowongan --</option>
                                {jobs.map(j => (
                                    <option key={j.id} value={j.id}>{j.title}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Tanggal & Waktu" error={errors.scheduled_at} required>
                            <input type="datetime-local" value={data.scheduled_at}
                                onChange={e => setData('scheduled_at', e.target.value)}
                                className={inp(errors.scheduled_at)} />
                        </Field>

                        <Field label="Tipe Interview" error={errors.type}>
                            <select value={data.type} onChange={e => setData('type', e.target.value)}
                                className={inp(errors.type)}>
                                <option>Online</option>
                                <option>Offline</option>
                                <option>Phone</option>
                            </select>
                        </Field>

                        <Field label="Catatan (opsional)" error={errors.notes}>
                            <textarea rows={3} value={data.notes} onChange={e => setData('notes', e.target.value)}
                                placeholder="Link Zoom, alamat, dll..."
                                className={inp(errors.notes)} />
                        </Field>

                    </div>

                    <div className="flex gap-3 pt-2">
                        <Link href={route('interviews.index')}
                            className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                            Batal
                        </Link>
                        <button type="submit" disabled={processing}
                            className="rounded-xl bg-[#043927] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45] disabled:opacity-60">
                            {processing ? 'Menyimpan...' : 'Jadwalkan'}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}

const inp = (e) => `w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${e ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#043927] focus:ring-[#043927]'}`;

function Field({ label, error, required, children }) {
    return (
        <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-600">
                {label}{required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
