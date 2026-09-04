import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, Upload, FileText, X, Plus, CheckCircle2 } from 'lucide-react';
import { useState, useRef } from 'react';

export default function Import() {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        name:             '',
        email:            '',
        phone:            '',
        role:             '',
        location:         '',
        experience_years: '',
        skills:           '',
        cv_file:          null,
        notes:            '',
    });

    const [dragOver, setDragOver] = useState(false);
    const fileRef = useRef(null);

    function handleFile(file) {
        if (file && ['application/pdf', 'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
            setData('cv_file', file);
        }
    }

    function handleDrop(e) {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
    }

    function submit(e) {
        e.preventDefault();
        post(route('cv.store'), {
            forceFormData: true,
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Import CV" />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* HEADER */}
                <div className="flex items-center gap-4">
                    <Link
                        href={route('candidates.index')}
                        className="flex h-9 w-9 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50"
                    >
                        <ArrowLeft size={17} />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Import CV</h1>
                        <p className="mt-0.5 text-sm text-gray-400">
                            Upload CV kandidat dan isi informasi dasarnya.
                        </p>
                    </div>
                </div>

                <form onSubmit={submit} className="mt-6 grid gap-5 lg:grid-cols-[1fr_360px]">

                    {/* LEFT — form fields */}
                    <div className="space-y-5">

                        <FormCard title="Informasi Kandidat">

                            <Field label="Nama Lengkap" error={errors.name} required>
                                <input type="text" value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    placeholder="cth. Ahmad Rizky"
                                    className={inp(errors.name)} />
                            </Field>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Email" error={errors.email} required>
                                    <input type="email" value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="email@example.com"
                                        className={inp(errors.email)} />
                                </Field>
                                <Field label="No. Telepon" error={errors.phone}>
                                    <input type="text" value={data.phone}
                                        onChange={e => setData('phone', e.target.value)}
                                        placeholder="08123456789"
                                        className={inp(errors.phone)} />
                                </Field>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Posisi / Role" error={errors.role} required>
                                    <input type="text" value={data.role}
                                        onChange={e => setData('role', e.target.value)}
                                        placeholder="cth. Frontend Developer"
                                        className={inp(errors.role)} />
                                </Field>
                                <Field label="Lokasi" error={errors.location}>
                                    <input type="text" value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        placeholder="cth. Surabaya, Indonesia"
                                        className={inp(errors.location)} />
                                </Field>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Field label="Pengalaman (Tahun)" error={errors.experience_years}>
                                    <input type="number" min="0" max="50"
                                        value={data.experience_years}
                                        onChange={e => setData('experience_years', e.target.value)}
                                        placeholder="cth. 3"
                                        className={inp(errors.experience_years)} />
                                </Field>
                                <Field label="Skills" error={errors.skills}>
                                    <input type="text" value={data.skills}
                                        onChange={e => setData('skills', e.target.value)}
                                        placeholder="React, Laravel, Figma (pisah koma)"
                                        className={inp(errors.skills)} />
                                </Field>
                            </div>

                            <Field label="Catatan" error={errors.notes}>
                                <textarea rows={3} value={data.notes}
                                    onChange={e => setData('notes', e.target.value)}
                                    placeholder="Catatan tambahan..."
                                    className={inp(errors.notes)} />
                            </Field>

                        </FormCard>

                        {/* actions */}
                        <div className="flex gap-3">
                            <Link href={route('candidates.index')}
                                className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                                Batal
                            </Link>
                            <button type="submit" disabled={processing}
                                className="flex items-center gap-2 rounded-xl bg-[#043927] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45] disabled:opacity-60">
                                <Upload size={15} />
                                {processing ? 'Menyimpan...' : 'Import Kandidat'}
                            </button>
                        </div>

                    </div>

                    {/* RIGHT — file upload */}
                    <div className="space-y-5">

                        <FormCard title="Upload File CV">

                            {/* drop zone */}
                            <div
                                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={handleDrop}
                                onClick={() => fileRef.current?.click()}
                                className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition ${
                                    dragOver
                                        ? 'border-[#043927] bg-[#E4F3EE]'
                                        : 'border-gray-200 hover:border-[#043927] hover:bg-gray-50'
                                }`}
                            >
                                <input
                                    ref={fileRef}
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    className="hidden"
                                    onChange={e => handleFile(e.target.files[0])}
                                />

                                {data.cv_file ? (
                                    <div className="flex flex-col items-center gap-2">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E4F3EE] text-[#043927]">
                                            <FileText size={22} />
                                        </div>
                                        <p className="text-sm font-semibold text-gray-800">{data.cv_file.name}</p>
                                        <p className="text-xs text-gray-400">
                                            {(data.cv_file.size / 1024).toFixed(0)} KB
                                        </p>
                                        <button
                                            type="button"
                                            onClick={e => { e.stopPropagation(); setData('cv_file', null); }}
                                            className="mt-1 flex items-center gap-1 text-xs text-red-400 hover:text-red-600"
                                        >
                                            <X size={12} /> Hapus
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                            <Upload size={22} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-gray-700">
                                                Drag & drop file CV di sini
                                            </p>
                                            <p className="mt-1 text-xs text-gray-400">
                                                atau klik untuk memilih file
                                            </p>
                                        </div>
                                        <p className="text-[10px] text-gray-400">
                                            PDF, DOC, DOCX — maks. 5 MB
                                        </p>
                                    </div>
                                )}
                            </div>

                            {errors.cv_file && (
                                <p className="text-xs text-red-500">{errors.cv_file}</p>
                            )}

                        </FormCard>

                        {/* tips */}
                        <div className="rounded-2xl border border-[#CDE8DF] bg-[#F0FAF6] p-5">
                            <p className="mb-3 text-xs font-bold text-[#043927]">Tips Import CV</p>
                            <ul className="space-y-2">
                                {[
                                    'Pastikan nama & email kandidat sudah benar',
                                    'Skills dipisah dengan koma, cth: React, Node.js',
                                    'File CV maksimal 5 MB (PDF/DOC/DOCX)',
                                    'Kandidat otomatis berstatus Available setelah import',
                                ].map((tip) => (
                                    <li key={tip} className="flex items-start gap-2 text-xs text-[#0B5D45]">
                                        <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#16A085]" />
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}

function inp(error) {
    return `w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
        error ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
              : 'border-gray-200 focus:border-[#043927] focus:ring-[#043927]'}`;
}

function FormCard({ title, children }) {
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
