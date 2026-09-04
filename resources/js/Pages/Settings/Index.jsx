import { useForm, Head, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { User, Lock, Bell, Palette, Save } from 'lucide-react';
import { useState } from 'react';

const tabs = [
    { id: 'profile',   label: 'Profile',       icon: User },
    { id: 'password',  label: 'Password',      icon: Lock },
    { id: 'notif',     label: 'Notifikasi',    icon: Bell },
    { id: 'appearance',label: 'Tampilan',      icon: Palette },
];

export default function Index() {
    const { auth } = usePage().props;
    const [activeTab, setActiveTab] = useState('profile');

    const profileForm = useForm({
        name:  auth?.user?.name  ?? '',
        email: auth?.user?.email ?? '',
    });

    const passwordForm = useForm({
        current_password:      '',
        password:              '',
        password_confirmation: '',
    });

    function saveProfile(e) {
        e.preventDefault();
        profileForm.patch(route('profile.update'));
    }

    function savePassword(e) {
        e.preventDefault();
        passwordForm.put(route('password.update'), {
            onSuccess: () => passwordForm.reset(),
        });
    }

    return (
        <AuthenticatedLayout>
            <Head title="Settings" />

            <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:pb-10 lg:px-8">

                {/* HEADER */}
                <div>
                    <p className="text-xs font-medium text-[#16A085]">Pengaturan Akun</p>
                    <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Settings</h1>
                    <p className="mt-1 text-sm text-gray-400">Kelola akun dan preferensi TalentLoop kamu.</p>
                </div>

                <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start">

                    {/* TAB SIDEBAR */}
                    <div className="shrink-0 lg:w-48">
                        <nav className="flex gap-1 overflow-x-auto lg:flex-col">
                            {tabs.map(({ id, label, icon: Icon }) => (
                                <button key={id} onClick={() => setActiveTab(id)}
                                    className={`flex items-center gap-2.5 rounded-xl px-4 py-2.5 text-sm font-medium whitespace-nowrap transition ${
                                        activeTab === id
                                            ? 'bg-[#043927] text-white shadow-sm'
                                            : 'text-gray-500 hover:bg-gray-100 hover:text-gray-800'
                                    }`}>
                                    <Icon size={16} />{label}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1 max-w-lg">

                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <form onSubmit={saveProfile}
                                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
                                <h2 className="text-sm font-bold text-gray-900">Informasi Profil</h2>

                                {/* avatar preview */}
                                <div className="flex items-center gap-4">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#DCEFE9] text-xl font-bold text-[#043927]">
                                        {auth?.user?.name?.charAt(0)?.toUpperCase() ?? 'N'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-gray-800">{auth?.user?.name}</p>
                                        <p className="text-xs text-gray-400">Recruiter</p>
                                    </div>
                                </div>

                                <Field label="Nama" error={profileForm.errors.name} required>
                                    <input type="text" value={profileForm.data.name}
                                        onChange={e => profileForm.setData('name', e.target.value)}
                                        className={inp(profileForm.errors.name)} />
                                </Field>

                                <Field label="Email" error={profileForm.errors.email} required>
                                    <input type="email" value={profileForm.data.email}
                                        onChange={e => profileForm.setData('email', e.target.value)}
                                        className={inp(profileForm.errors.email)} />
                                </Field>

                                <button type="submit" disabled={profileForm.processing}
                                    className="flex items-center gap-2 rounded-xl bg-[#043927] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45] disabled:opacity-60">
                                    <Save size={15} />
                                    {profileForm.processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                                </button>

                                {profileForm.recentlySuccessful && (
                                    <p className="text-xs text-emerald-600">✓ Profil berhasil diperbarui.</p>
                                )}
                            </form>
                        )}

                        {/* PASSWORD TAB */}
                        {activeTab === 'password' && (
                            <form onSubmit={savePassword}
                                className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-5">
                                <h2 className="text-sm font-bold text-gray-900">Ubah Password</h2>

                                <Field label="Password Saat Ini" error={passwordForm.errors.current_password} required>
                                    <input type="password" value={passwordForm.data.current_password}
                                        onChange={e => passwordForm.setData('current_password', e.target.value)}
                                        className={inp(passwordForm.errors.current_password)} />
                                </Field>

                                <Field label="Password Baru" error={passwordForm.errors.password} required>
                                    <input type="password" value={passwordForm.data.password}
                                        onChange={e => passwordForm.setData('password', e.target.value)}
                                        className={inp(passwordForm.errors.password)} />
                                </Field>

                                <Field label="Konfirmasi Password Baru" error={passwordForm.errors.password_confirmation} required>
                                    <input type="password" value={passwordForm.data.password_confirmation}
                                        onChange={e => passwordForm.setData('password_confirmation', e.target.value)}
                                        className={inp(passwordForm.errors.password_confirmation)} />
                                </Field>

                                <button type="submit" disabled={passwordForm.processing}
                                    className="flex items-center gap-2 rounded-xl bg-[#043927] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0B5D45] disabled:opacity-60">
                                    <Save size={15} />
                                    {passwordForm.processing ? 'Menyimpan...' : 'Ubah Password'}
                                </button>

                                {passwordForm.recentlySuccessful && (
                                    <p className="text-xs text-emerald-600">✓ Password berhasil diubah.</p>
                                )}
                            </form>
                        )}

                        {/* NOTIFICATION TAB */}
                        {activeTab === 'notif' && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
                                <h2 className="text-sm font-bold text-gray-900">Preferensi Notifikasi</h2>
                                {[
                                    { label: 'Email notifikasi kandidat baru',   key: 'new_candidate' },
                                    { label: 'Reminder jadwal interview',          key: 'interview_reminder' },
                                    { label: 'Update status outreach',            key: 'outreach_update' },
                                    { label: 'Laporan rekrutmen mingguan',        key: 'weekly_report' },
                                ].map(({ label, key }) => (
                                    <div key={key} className="flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3">
                                        <span className="text-sm text-gray-700">{label}</span>
                                        <label className="relative inline-flex cursor-pointer items-center">
                                            <input type="checkbox" defaultChecked className="peer sr-only" />
                                            <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#043927] peer-checked:after:translate-x-full" />
                                        </label>
                                    </div>
                                ))}
                                <p className="text-[10px] text-gray-400">* Preferensi notifikasi belum tersambung ke backend.</p>
                            </div>
                        )}

                        {/* APPEARANCE TAB */}
                        {activeTab === 'appearance' && (
                            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm space-y-4">
                                <h2 className="text-sm font-bold text-gray-900">Tampilan</h2>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { label: 'Light', active: true,  preview: 'bg-white border-2 border-[#043927]' },
                                        { label: 'Dark',  active: false, preview: 'bg-gray-900' },
                                    ].map(({ label, active, preview }) => (
                                        <button key={label}
                                            className={`rounded-2xl border p-4 text-left transition ${active ? 'border-[#043927]' : 'border-gray-200 hover:border-gray-300'}`}>
                                            <div className={`h-16 rounded-xl ${preview}`} />
                                            <p className={`mt-2 text-xs font-semibold ${active ? 'text-[#043927]' : 'text-gray-500'}`}>
                                                {label} {active && '✓'}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[10px] text-gray-400">* Dark mode belum tersedia.</p>
                            </div>
                        )}

                    </div>
                </div>

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
