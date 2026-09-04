import { useForm, Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useState } from 'react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name:             '',
        email:            '',
        phone:            '',
        role:             '',
        location:         '',
        experience_years: '',
        skills:           [],
        status:           'Available',
        notes:            '',
    });

    const [skillInput, setSkillInput] = useState('');

    function addSkill() {
        const s = skillInput.trim();
        if (s && !data.skills.includes(s)) {
            setData('skills', [...data.skills, s]);
        }
        setSkillInput('');
    }

    function removeSkill(skill) {
        setData('skills', data.skills.filter((s) => s !== skill));
    }

    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            addSkill();
        }
    }

    function submit(e) {
        e.preventDefault();
        post(route('candidates.store'));
    }

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Kandidat" />

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
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                            Tambah Kandidat
                        </h1>
                        <p className="mt-0.5 text-sm text-gray-400">
                            Isi informasi kandidat baru di bawah ini.
                        </p>
                    </div>
                </div>

                {/* FORM */}
                <form onSubmit={submit} className="mt-6 max-w-2xl space-y-5">

                    <FormCard title="Informasi Dasar">

                        <Field label="Nama Lengkap" error={errors.name} required>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="cth. Ahmad Rizky"
                                className={input(errors.name)}
                            />
                        </Field>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Email" error={errors.email} required>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className={input(errors.email)}
                                />
                            </Field>

                            <Field label="No. Telepon" error={errors.phone}>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    placeholder="cth. 08123456789"
                                    className={input(errors.phone)}
                                />
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Posisi / Role" error={errors.role} required>
                                <input
                                    type="text"
                                    value={data.role}
                                    onChange={(e) => setData('role', e.target.value)}
                                    placeholder="cth. Frontend Developer"
                                    className={input(errors.role)}
                                />
                            </Field>

                            <Field label="Lokasi" error={errors.location}>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={(e) => setData('location', e.target.value)}
                                    placeholder="cth. Surabaya, Indonesia"
                                    className={input(errors.location)}
                                />
                            </Field>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Field label="Pengalaman (Tahun)" error={errors.experience_years}>
                                <input
                                    type="number"
                                    min="0"
                                    max="50"
                                    value={data.experience_years}
                                    onChange={(e) => setData('experience_years', e.target.value)}
                                    placeholder="cth. 3"
                                    className={input(errors.experience_years)}
                                />
                            </Field>

                            <Field label="Status" error={errors.status}>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    className={input(errors.status)}
                                >
                                    <option value="Available">Available</option>
                                    <option value="Interview">Interview</option>
                                    <option value="Hired">Hired</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                            </Field>
                        </div>

                    </FormCard>

                    <FormCard title="Skills">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={skillInput}
                                onChange={(e) => setSkillInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ketik skill lalu Enter atau klik Tambah"
                                className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-[#043927] focus:outline-none focus:ring-1 focus:ring-[#043927]"
                            />
                            <button
                                type="button"
                                onClick={addSkill}
                                className="flex items-center gap-1.5 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#0B5D45]"
                            >
                                <Plus size={14} />
                                Tambah
                            </button>
                        </div>

                        {data.skills.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                                {data.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="flex items-center gap-1.5 rounded-lg bg-[#E4F3EE] px-3 py-1.5 text-xs font-medium text-[#043927]"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="text-[#043927]/60 hover:text-[#043927]"
                                        >
                                            <X size={11} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </FormCard>

                    <FormCard title="Catatan">
                        <Field label="Notes (opsional)" error={errors.notes}>
                            <textarea
                                value={data.notes}
                                onChange={(e) => setData('notes', e.target.value)}
                                rows={3}
                                placeholder="Catatan tambahan tentang kandidat ini..."
                                className={input(errors.notes)}
                            />
                        </Field>
                    </FormCard>

                    {/* ACTIONS */}
                    <div className="flex gap-3 pt-2">
                        <Link
                            href={route('candidates.index')}
                            className="rounded-xl border border-gray-200 bg-white px-6 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-xl bg-[#043927] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45] disabled:opacity-60"
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Kandidat'}
                        </button>
                    </div>

                </form>
            </div>
        </AuthenticatedLayout>
    );
}

/* ── helpers ── */
function input(error) {
    return `w-full rounded-xl border px-4 py-2.5 text-sm focus:outline-none focus:ring-1 ${
        error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400'
            : 'border-gray-200 focus:border-[#043927] focus:ring-[#043927]'
    }`;
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
                {label}
                {required && <span className="ml-0.5 text-red-500">*</span>}
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
