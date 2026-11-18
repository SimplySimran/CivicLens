import {
  ArrowLeft,
  MapPin,
  Calendar,
  ClipboardList,
  CheckCircle2,
  Circle,
  Clock
} from 'lucide-react'

function ComplaintDetails({ complaint, onBack }) {

  const stages = [
    'Submitted',
    'Under Review',
    'Assigned to Authority',
    'In Progress',
    'Resolved'
  ]

  const statusOrder = {
    'Under Review': 1,
    'In Progress': 3,
    'Resolved': 4
  }

  const currentStage = statusOrder[complaint.status] ?? 0

  return (

    <div className="space-y-6">

      {/* BACK BUTTON */}

      <button
        onClick={onBack}
        className="flex items-center gap-2 text-teal-700 font-semibold"
      >
        <ArrowLeft size={18} />
        Back to My Complaints
      </button>


      {/* COMPLAINT HEADER */}

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">

        <div className="flex justify-between flex-wrap gap-4">

          <div>
            <p className="text-sm text-slate-500">
              Complaint ID: {complaint.id}
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-2">
              {complaint.issue}
            </h2>
          </div>

          <span className="h-fit px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
            {complaint.status}
          </span>

        </div>

        <div className="grid sm:grid-cols-2 gap-5 mt-7">

          <div className="flex items-center gap-3 text-slate-600">
            <MapPin className="text-teal-600" size={20} />
            <div>
              <p className="text-xs text-slate-400">Location</p>
              <p className="font-medium">{complaint.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-slate-600">
            <Calendar className="text-teal-600" size={20} />
            <div>
              <p className="text-xs text-slate-400">Reported On</p>
              <p className="font-medium">{complaint.date}</p>
            </div>
          </div>

        </div>

      </div>


      {/* DESCRIPTION */}

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">

        <h3 className="font-bold text-lg text-slate-800 mb-3">
          Issue Description
        </h3>

        <p className="text-slate-600 text-sm leading-7">
          {complaint.description || 'No additional description provided.'}
        </p>

      </div>


      {/* STATUS TIMELINE */}

      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">

        <h3 className="font-bold text-lg text-slate-800 mb-2">
          Complaint Progress
        </h3>

        <p className="text-sm text-slate-500 mb-7">
          Follow the progress of your reported civic issue.
        </p>


        <div className="space-y-0">

          {stages.map((stage, index) => {

            const completed = index <= currentStage
            const current = index === currentStage

            return (

              <div key={stage} className="flex gap-4 min-h-20">

                {/* TIMELINE ICON */}

                <div className="flex flex-col items-center">

                  {completed ? (

                    <CheckCircle2
                      size={24}
                      className="text-teal-600"
                    />

                  ) : (

                    <Circle
                      size={24}
                      className="text-slate-300"
                    />

                  )}

                  {index !== stages.length - 1 && (

                    <div className={`w-0.5 flex-1 my-1 ${
                      index < currentStage
                        ? 'bg-teal-500'
                        : 'bg-slate-200'
                    }`} />

                  )}

                </div>


                {/* TIMELINE TEXT */}

                <div className="pb-7">

                  <p className={`font-semibold ${
                    completed
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}>

                    {stage}

                  </p>

                  <p className="text-xs text-slate-400 mt-1">

                    {current
                      ? 'Current status'
                      : completed
                      ? 'Completed'
                      : 'Pending'}

                  </p>

                </div>

              </div>

            )

          })}

        </div>

      </div>


      {/* INFORMATION */}

      <div className="bg-teal-50 border border-teal-100 rounded-xl p-5 flex gap-3">

        <Clock className="text-teal-700 shrink-0" size={21} />

        <p className="text-sm text-teal-900 leading-6">
          Your complaint is being tracked by CivicLens.
          You can revisit this page to check for status updates.
        </p>

      </div>

    </div>

  )
}

export default ComplaintDetails