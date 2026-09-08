import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

import GuestLayout from '@/Layouts/GuestLayout';

import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {

    const {
        data,
        setData,
        post,
        processing,
        errors,
        reset,
    } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>

            <Head title="Login" />

            <div>

                {/* Heading */}
                <div className="mb-8">

                    <p className="text-xs font-semibold uppercase tracking-wider text-[#16A085]">
                        Welcome Back
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
                        Sign in to TalentLoop
                    </h2>

                    <p className="mt-2 text-sm text-gray-400">
                        Kelola talent dan temukan kandidat terbaik.
                    </p>

                </div>


                {/* Status */}
                {status && (
                    <div className="mb-5 rounded-xl bg-green-50 p-3 text-sm text-green-700">
                        {status}
                    </div>
                )}


                {/* FORM */}
                <form onSubmit={submit} className="space-y-5">

                    {/* Email */}
                    <div>

                        <InputLabel
                            htmlFor="email"
                            value="Email"
                            className="mb-2 text-xs font-semibold text-gray-700"
                        />

                        <TextInput
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="mt-2 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) =>
                                setData('email', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.email}
                            className="mt-2"
                        />

                    </div>


                    {/* Password */}
                    <div>

                        <div className="flex items-center justify-between">

                            <InputLabel
                                htmlFor="password"
                                value="Password"
                                className="text-xs font-semibold text-gray-700"
                            />

                            {canResetPassword && (
                                <Link
                                    href={route('password.request')}
                                    className="text-[10px] font-semibold text-[#16A085] hover:text-[#043927]"
                                >
                                    Forgot password?
                                </Link>
                            )}

                        </div>

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="mt-2 block w-full"
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />

                    </div>


                    {/* Remember */}
                    <div className="flex items-center">

                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData(
                                    'remember',
                                    e.target.checked
                                )
                            }
                        />

                        <span className="ml-2 text-xs text-gray-500">
                            Remember me
                        </span>

                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#16A085] to-[#043927] px-4 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#16A085]/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {processing
                            ? 'Signing in...'
                            : 'Sign In'
                        }
                    </button>

                </form>


                {/* Register */}
                <div className="mt-7 text-center">

                    <p className="text-xs text-gray-400">

                        Don't have an account?

                        <Link
                            href={route('register')}
                            className="ml-1 font-semibold text-[#043927] hover:text-[#16A085]"
                        >
                            Create account
                        </Link>

                    </p>

                </div>

            </div>

        </GuestLayout>
    );
}