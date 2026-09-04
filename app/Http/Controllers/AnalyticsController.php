<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Interview;
use App\Models\Job;
use App\Models\Outreach;
use Inertia\Inertia;

class AnalyticsController extends Controller
{
    public function index()
    {
        $totalCandidates  = Candidate::count();
        $available        = Candidate::where('status', 'Available')->count();
        $interview        = Candidate::where('status', 'Interview')->count();
        $hired            = Candidate::where('status', 'Hired')->count();
        $rejected         = Candidate::where('status', 'Rejected')->count();

        $totalJobs  = Job::count();
        $openJobs   = Job::where('status', 'Open')->count();
        $closedJobs = Job::where('status', 'Closed')->count();

        $totalInterviews     = Interview::count();
        $scheduledInterviews = Interview::where('status', 'Scheduled')->count();
        $doneInterviews      = Interview::where('status', 'Done')->count();

        $totalOutreach   = Outreach::count();
        $repliedOutreach = Outreach::where('status', 'Replied')->count();

        $hiringRate   = $totalCandidates > 0
            ? round(($hired / $totalCandidates) * 100, 1)
            : 0;
        $replyRate    = $totalOutreach > 0
            ? round(($repliedOutreach / $totalOutreach) * 100, 1)
            : 0;

        // candidates by status for funnel
        $funnel = [
            ['label' => 'Total Candidates', 'value' => $totalCandidates],
            ['label' => 'Available',         'value' => $available],
            ['label' => 'Interview',          'value' => $interview],
            ['label' => 'Hired',              'value' => $hired],
        ];

        return Inertia::render('Analytics/Index', [
            'stats' => [
                'totalCandidates'     => $totalCandidates,
                'available'           => $available,
                'interview'           => $interview,
                'hired'               => $hired,
                'rejected'            => $rejected,
                'totalJobs'           => $totalJobs,
                'openJobs'            => $openJobs,
                'closedJobs'          => $closedJobs,
                'totalInterviews'     => $totalInterviews,
                'scheduledInterviews' => $scheduledInterviews,
                'doneInterviews'      => $doneInterviews,
                'totalOutreach'       => $totalOutreach,
                'repliedOutreach'     => $repliedOutreach,
                'hiringRate'          => $hiringRate,
                'replyRate'           => $replyRate,
            ],
            'funnel' => $funnel,
        ]);
    }
}
