import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import {
    Send,
    Mail,
    MessageSquare,
    CheckCircle2,
} from 'lucide-react';

export default function Index() {

    return (
        <AuthenticatedLayout>

            <Head title="Outreach" />

            <div className="min-h-screen px-4 pb-28 pt-6 sm:px-6 lg:px-8">

                <p className="text-xs font-semibold text-[#16A085]">
                    AUTOMATED ENGAGEMENT
                </p>

                <h1 className="mt-1 text-2xl font-bold text-gray-900">
                    Outreach
                </h1>

                <p className="mt-1 text-sm text-gray-400">
                    Hubungi kandidat secara otomatis melalui email atau WhatsApp.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">

                    <Card
                        icon={Send}
                        title="Total Sent"
                        value="428"
                    />

                    <Card
                        icon={Mail}
                        title="Email"
                        value="286"
                    />

                    <Card
                        icon={MessageSquare}
                        title="Responses"
                        value="124"
                    />

                </div>

                <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

                    <h2 className="text-sm font-bold">
                        Recent Outreach
                    </h2>

                    <div className="mt-4 space-y-3">

                        <Activity
                            name="Ahmad Rizky"
                            channel="Email"
                            status="Responded"
                        />

                        <Activity
                            name="Fajar Ramadhan"
                            channel="WhatsApp"
                            status="Read"
                        />

                        <Activity
                            name="Dimas Pratama"
                            channel="Email"
                            status="Sent"
                        />

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}


function Card({
    icon: Icon,
    title,
    value,
}) {
    return (
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

            <Icon
                size={19}
                className="text-[#16A085]"
            />

            <p className="mt-4 text-[10px] text-gray-400">
                {title}
            </p>

            <p className="mt-1 text-2xl font-bold">
                {value}
            </p>

        </div>
    );
}


function Activity({
    name,
    channel,
    status,
}) {
    return (
        <div className="flex items-center justify-between rounded-xl bg-gray-50 p-4">

            <div>
                <p className="text-xs font-semibold">
                    {name}
                </p>

                <p className="mt-1 text-[9px] text-gray-400">
                    {channel}
                </p>
            </div>

            <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-[9px] font-semibold text-emerald-600">
                <CheckCircle2 size={10} />
                {status}
            </span>

        </div>
    );
}