import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title:        '',
        department:   '',
        location:     '',
        type:         'Full-time',
        status:       'Open',
        description:  '',
        requirements: [],
        salary_range: '',
        deadline:     '',
    });

    const [reqInput, setReqInput] = useState('');

    function addReq() {
        const r = reqInput.trim();
        if (r && !data.requirements.includes(r)) {
            setData('requirements', [...data.requirements, r]);
        }
        setReqInput('');
    }

    function submit(e) {
        e.preventDefault();
        post(route('jobs.store'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Buat Lowongan" />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                <div className="flex items-center gap-4">
                    <Link href={route('jobs.index')}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50">
                        <ArrowLeft size={17} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Buat Lowongan</h1>
                        <p className="mt-0.5 text-sm text-gray-400">Isi detail lowongan pekerjaan baru.</p>
                    </div>
                </div>

                <form onSubmit={submit} className="mt-6 max-w-2xl space-y-5">

                    <Card title="Informasi Lowongan">
                        <Field label="Judul Posisi" error={errors.title} required>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)}
                                placeholder="cth. Senior Frontend Developer"
                                className={inp(errors.title)} />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Departemen" error={errors.department}>
                                <input type="text" value={data.department} onChange={e => setData('department', e.target.value)}
                                    placeholder="cth. Engineering"
                                    className={inp(errors.department)} />
                            </Field>
                            <Field label="Lokasi" error={errors.location}>
                                <input type="text" value={data.location} onChange={e => setData('location', e.target.value)}
                                    placeholder="cth. Surabaya / Remote"
                                    className={inp(errors.location)} />
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Tipe" error={errors.type}>
                                <select value={data.type} onChange={e => setData('type', e.target.value)} className={inp(errors.type)}>
                                    {['Full-time','Part-time','Contract','Internship'].map(t => (
                                        <option key={t}>{t}</option>
                                    ))}
                                </select>
                            </Field>
                            <Field label="Status" error={errors.status}>
                                <select value={data.status} onChange={e => setData('status', e.target.value)} className={inp(errors.status)}>
                                    {['Open','Closed','Draft'].map(s => (
                                        <option key={s}>{s}</option>
                                    ))}
                                </select>
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Rentang Gaji" error={errors.salary_range}>
                                <input type="text" value={data.salary_range} onChange={e => setData('salary_range', e.target.value)}
                                    placeholder="cth. 8–12 juta / bulan"
                                    className={inp(errors.salary_range)} />
                            </Field>
                            <Field label="Deadline" error={errors.deadline}>
                                <input type="date" value={data.deadline} onChange={e => setData('deadline', e.target.value)}
                                    className={inp(errors.deadline)} />
                            </Field>
                        </div>

                        <Field label="Deskripsi" error={errors.description}>
                            <textarea rows={4} value={data.description} onChange={e => setData('description', e.target.value)}
                                placeholder="Deskripsi lengkap posisi ini..."
                                className={inp(errors.description)} />
                        </Field>
                    </Card>

                    <Card title="Persyaratan">
                        <div className="flex gap-2">
                            <input type="text" value={reqInput}
                                onChange={e => setReqInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addReq())}
                                placeholder="Tambah persyaratan, lalu Enter"
                                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#043927] focus:outline-none focus:ring-1 focus:ring-[#043927]" />
                            <button type="button" onClick={addReq}
                                className="flex items-center gap-1.5 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0B5D45]">
                                <Plus size={14} /> Tambah
                            </button>
                        </div>
                        {data.requirements.length > 0 && (
                            <ul className="mt-3 space-y-2">
                                {data.requirements.map((r, i) => (
                                    <li key={i} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-2.5 text-sm text-gray-700">
                                        <span>{r}</span>
                                        <button type="button" onClick={() => setData('requirements', data.requirements.filter((_, j) => j !== i))}
                                            className="text-gray-300 hover:text-red-400">
                                            <X size={15} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </Card>

                    <div className="flex gap-3 pt-2">
                        <Link href={route('jobs.index')}
                            className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                            Batal
                        </Link>
                        <button type="submit" disabled={processing}
                            className="rounded-xl bg-[#043927] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45] disabled:opacity-60">
                            {processing ? 'Menyimpan...' : 'Simpan Lowongan'}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}

const inp = (e) => `w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${e ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : 'border-gray-200 focus:border-[#043927] focus:ring-[#043927]'}`;

function Card({ title, children }) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-sm font-bold text-gray-800">{title}</h2>
            <div className="space-y-4">{children}</div>
        </div>
    );
}

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
