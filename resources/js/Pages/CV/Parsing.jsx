import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import {
    Brain,
    FileText,
    CheckCircle2,
} from 'lucide-react';

export default function Parsing() {

    return (
        <AuthenticatedLayout>

            <Head title="AI Parsing" />

            <div className="min-h-screen px-4 pb-28 pt-6 sm:px-6 lg:px-8">

                <div className="mx-auto max-w-3xl">

                    <div className="text-center">

                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E4F3EE] text-[#043927]">
                            <Brain size={28} />
                        </div>

                        <p className="mt-5 text-xs font-semibold text-[#16A085]">
                            AI RESUME PARSING
                        </p>

                        <h1 className="mt-1 text-2xl font-bold">
                            Processing CV
                        </h1>

                        <p className="mt-2 text-xs text-gray-400">
                            TalentLoop sedang mengekstrak informasi kandidat.
                        </p>

                    </div>


                    <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

                        <div className="flex items-center gap-4">

                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-50">
                                <FileText size={19} />
                            </div>

                            <div className="flex-1">

                                <p className="text-xs font-bold">
                                    Ahmad_Rizky_CV.pdf
                                </p>

                                <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">

                                    <div className="h-full w-[78%] rounded-full bg-[#16A085]" />

                                </div>

                            </div>

                            <span className="text-xs font-bold text-[#043927]">
                                78%
                            </span>

                        </div>


                        <div className="mt-6 space-y-3">

                            <Process
                                text="Reading CV document"
                                done
                            />

                            <Process
                                text="Extracting personal information"
                                done
                            />

                            <Process
                                text="Detecting skills and experience"
                                done
                            />

                            <Process
                                text="Generating candidate profile"
                            />

                        </div>

                    </div>

                </div>

            </div>

        </AuthenticatedLayout>
    );
}


function Process({
    text,
    done,
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">

            <CheckCircle2
                size={16}
                className={
                    done
                        ? 'text-[#16A085]'
                        : 'text-gray-300'
                }
            />

            <span className="text-xs text-gray-600">
                {text}
            </span>

        </div>
    );
}