import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <div>
                {/* Heading */}
                <div className="mb-8">
                    <p className="text-xs font-semibold uppercase tracking-wider text-[#16A085]">
                        Get Started
                    </p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Create an Account
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Bergabung dengan TalentLoop dan temukan kandidat terbaik.
                    </p>
                </div>

                {/* FORM */}
                <form onSubmit={submit} className="space-y-5">
                    {/* Name */}
                    <div>
                        <InputLabel htmlFor="name" value="Full Name" className="mb-2 text-xs font-semibold text-gray-700" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-2 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Email */}
                    <div>
                        <InputLabel htmlFor="email" value="Email Address" className="mb-2 text-xs font-semibold text-gray-700" />
                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <InputLabel htmlFor="password" value="Password" className="mb-2 text-xs font-semibold text-gray-700" />
                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" className="mb-2 text-xs font-semibold text-gray-700" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-2 block w-full"
                            autoComplete="new-password"
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                        <InputError message={errors.password_confirmation} className="mt-2" />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#16A085] to-[#043927] px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#16A085]/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                {/* Login Link */}
                <div className="mt-7 text-center">
                    <p className="text-xs text-gray-400">
                        Already registered?
                        <Link
                            href={route('login')}
                            className="ml-1 font-semibold text-[#043927] hover:text-[#16A085]"
                        >
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </GuestLayout>
    );
}
