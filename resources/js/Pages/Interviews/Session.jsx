import { useEffect, useRef, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, CalendarCheck, CheckCircle2, CircleStop, Mic, MonitorUp, Play, Save, Video } from 'lucide-react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Session({ interview }) {
    const [notes, setNotes] = useState(interview.notes ?? '');
    const [decisionOpen, setDecisionOpen] = useState(false);
    const [decision, setDecision] = useState('Consideration');
    const [saving, setSaving] = useState(false);
    const [recordingState, setRecordingState] = useState('idle');
    const [recordingError, setRecordingError] = useState('');
    const recorderRef = useRef(null), streamRef = useRef(null), chunksRef = useRef([]);
    const isOnline = interview.type === 'Online';

    useEffect(() => () => streamRef.current?.getTracks().forEach(track => track.stop()), []);
    const saveNotes = () => { setSaving(true); router.patch(route('interviews.update', interview.id), { notes }, { preserveScroll: true, onFinish: () => setSaving(false) }); };

    async function startRecording() {
        if (!window.MediaRecorder || (isOnline && !navigator.mediaDevices?.getDisplayMedia) || (!isOnline && !navigator.mediaDevices?.getUserMedia)) return setRecordingError(`Browser ini belum mendukung rekam ${isOnline ? 'layar' : 'suara'}. Gunakan Chrome atau Edge terbaru.`);
        try {
            setRecordingError('');
            const stream = isOnline
                ? await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                : await navigator.mediaDevices.getUserMedia({ audio: true });
            const mimeType = isOnline && MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus') ? 'video/webm;codecs=vp9,opus' : isOnline ? 'video/webm' : 'audio/webm';
            const recorder = new MediaRecorder(stream, { mimeType });
            streamRef.current = stream; chunksRef.current = [];
            recorder.ondataavailable = e => e.data.size && chunksRef.current.push(e.data);
            recorder.onstop = () => {
                stream.getTracks().forEach(track => track.stop()); streamRef.current = null;
                const file = new File([new Blob(chunksRef.current, { type: mimeType })], `interview-${interview.id}-${Date.now()}.webm`, { type: mimeType });
                if (!file.size) return setRecordingState('idle');
                setRecordingState('uploading');
                router.post(route('interviews.recording.store', interview.id), { recording: file }, { preserveScroll: true, onSuccess: () => setRecordingState('saved'), onError: () => { setRecordingState('idle'); setRecordingError('Rekaman gagal disimpan. Coba lagi.'); } });
            };
            const videoTrack = stream.getVideoTracks()[0];
            if (videoTrack) videoTrack.onended = () => recorder.state !== 'inactive' && recorder.stop();
            recorder.start(1000); recorderRef.current = recorder; setRecordingState('recording');
        } catch (error) { if (error.name !== 'NotAllowedError') setRecordingError(`${isOnline ? 'Layar/perangkat' : 'Mikrofon'} tidak dapat direkam. Pastikan izin diberikan.`); }
    }
    const stopRecording = () => recorderRef.current?.state !== 'inactive' && recorderRef.current.stop();
    const finishInterview = () => {
        if (recordingState === 'recording' || recordingState === 'uploading') {
            if (recordingState === 'recording') stopRecording();
            setDecisionOpen(false);
            setRecordingError('Tunggu rekaman selesai disimpan sebelum mengakhiri interview.');
            return;
        }
        router.patch(route('interviews.update', interview.id), { status: 'Done', notes, decision }, { onSuccess: () => router.visit(route('interviews.index')) });
    };

    return <AuthenticatedLayout><Head title={`Interview: ${interview.candidate.name}`} />
        <div className="min-h-screen px-4 pb-24 pt-6 sm:px-6 lg:px-8"><Link href={route('interviews.index')} className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#043927]"><ArrowLeft size={17} /> Kembali ke Interview Logs</Link>
            <div className="mt-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-7"><div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"><div><p className="text-xs font-semibold text-[#16A085]">Sesi interview berlangsung</p><h1 className="mt-1 text-2xl font-bold text-gray-900">{interview.candidate.name}</h1><p className="mt-1 text-sm text-gray-500">{interview.candidate.role} · {interview.job.title}</p></div><span className="inline-flex w-fit items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"><CalendarCheck size={13} /> {interview.scheduled_at}</span></div>
                <section className="mt-6 rounded-2xl border border-[#D7ECE4] bg-[#F5F9F7] p-4"><div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div className="flex gap-3"><div className={`flex h-10 w-10 items-center justify-center rounded-xl ${recordingState === 'recording' ? 'bg-red-100 text-red-600' : 'bg-[#DCEFE9] text-[#043927]'}`}>{recordingState === 'recording' ? <Video size={18} className="animate-pulse" /> : isOnline ? <MonitorUp size={18} /> : <Mic size={18} />}</div><div><h2 className="text-sm font-bold text-gray-900">{isOnline ? 'Rekaman layar interview' : 'Rekaman suara interview'}</h2><p className="mt-0.5 text-xs text-gray-500">{isOnline ? 'Tampilan/perangkat HR dan audio dapat diputar ulang untuk pencatatan.' : 'Audio dari mikrofon HR direkam untuk diputar ulang saat membuat catatan.'}</p></div></div>{recordingState === 'recording' ? <button onClick={stopRecording} className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white"><CircleStop size={15} /> Hentikan & simpan</button> : <button onClick={startRecording} disabled={recordingState === 'uploading'} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-xs font-bold text-white disabled:opacity-60">{isOnline ? <Video size={15} /> : <Mic size={15} />} {recordingState === 'uploading' ? 'Menyimpan...' : isOnline ? 'Mulai rekam layar' : 'Mulai rekam suara'}</button>}</div><p className="mt-3 text-[11px] leading-relaxed text-gray-500">{isOnline ? 'Browser akan meminta izin dan pilihan layar sebelum rekaman dimulai.' : 'Browser akan meminta izin mikrofon sebelum rekaman dimulai.'} Pastikan kandidat mengetahui dan menyetujui perekaman.</p>{recordingError && <p className="mt-2 text-xs font-medium text-red-600">{recordingError}</p>}{interview.recording_url && <div className="mt-4 border-t border-[#D7ECE4] pt-4"><div className="mb-2 flex items-center gap-2 text-xs font-bold text-[#043927]"><Play size={14} /> Rekaman tersimpan {interview.recorded_at ? `· ${interview.recorded_at}` : ''}</div>{isOnline ? <video controls preload="metadata" className="w-full rounded-xl bg-black" src={interview.recording_url}>Browser tidak mendukung pemutar video.</video> : <audio controls preload="metadata" className="w-full" src={interview.recording_url}>Browser tidak mendukung pemutar audio.</audio>}</div>}</section>
                <div className="mt-7"><label className="text-base font-bold text-gray-900">Catatan interview</label><p className="mt-1 text-sm text-gray-500">Catat jawaban kandidat, kekuatan, area yang perlu digali, dan tindak lanjut.</p><textarea value={notes} onChange={e => setNotes(e.target.value)} rows={18} placeholder="Mulai tuliskan hasil interview di sini..." className="mt-4 min-h-96 w-full rounded-2xl border border-gray-200 p-4 text-sm leading-6 text-gray-700 outline-none focus:border-[#043927] focus:ring-1 focus:ring-[#043927]" /></div><div className="mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><button onClick={saveNotes} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 disabled:opacity-60"><Save size={16} /> {saving ? 'Menyimpan...' : 'Simpan Catatan'}</button><button onClick={() => setDecisionOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#043927] px-4 py-2.5 text-sm font-semibold text-white"><CheckCircle2 size={16} /> Interview Selesai</button></div></div></div>
        {decisionOpen && <DecisionModal candidateName={interview.candidate.name} decision={decision} setDecision={setDecision} onClose={() => setDecisionOpen(false)} onConfirm={finishInterview} />}</AuthenticatedLayout>;
}
function DecisionModal({ candidateName, decision, setDecision, onClose, onConfirm }) { const options = [{ value: 'Hired', label: 'Diterima', description: 'Kandidat akan berstatus Hired.' }, { value: 'Consideration', label: 'Masih dipertimbangkan', description: 'Kandidat tetap berstatus Interview.' }, { value: 'Rejected', label: 'Ditolak', description: 'Kandidat akan berstatus Rejected.' }]; return <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/50 p-4"><div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-lg font-bold text-gray-900">Hasil interview</h2><p className="mt-1 text-sm text-gray-500">Tentukan keputusan untuk {candidateName}.</p><div className="mt-5 space-y-3">{options.map(o => <button key={o.value} onClick={() => setDecision(o.value)} className={`w-full rounded-xl border p-4 text-left ${decision === o.value ? 'border-[#043927] bg-[#E8F3EE]' : 'border-gray-200'}`}><p className="text-sm font-bold text-gray-800">{o.label}</p><p className="mt-1 text-xs text-gray-500">{o.description}</p></button>)}</div><div className="mt-6 flex gap-3"><button onClick={onClose} className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600">Kembali</button><button onClick={onConfirm} className="flex-1 rounded-xl bg-[#043927] px-4 py-2.5 text-sm font-semibold text-white">Simpan Hasil</button></div></div></div>; }
