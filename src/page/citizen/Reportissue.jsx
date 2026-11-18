import { useState } from 'react'
import {
  ArrowLeft,
  Upload,
  MapPin,
  Camera,
  FileText,
  Send,
  Navigation,
  X,
  CheckCircle
} from 'lucide-react'

function ReportIssue({ onSubmit, onCancel }) {

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    severity: 'Medium'
  })

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!form.category || !form.title || !form.description || !form.location) {
      alert('Please fill in all required fields.')
      return
    }

    const complaint = {
      ...form,
      id: 'CL-' + Math.floor(1000 + Math.random() * 9000),
      date: new Date().toLocaleDateString('en-IN'),
      status: 'Under Review',
      image: preview
    }

    onSubmit(complaint)
  }

  return (
    <div className="max-w-5xl mx-auto">

      <button
        onClick={onCancel}
        className="flex items-center gap-2 text-slate-500 hover:text-teal-700 mb-6"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </button>

      <div className="mb-8">
        <p className="text-teal-700 font-semibold text-sm mb-2">
          CITIZEN SERVICES
        </p>

        <h1 className="text-3xl font-bold text-slate-800">
          Report a Civic Issue
        </h1>

        <p className="text-slate-500 mt-2">
          Help us identify and resolve infrastructure problems in your community.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-7"
      >

        <div>
          <h2 className="font-bold text-lg text-slate-800 flex items-center gap-2">
            <FileText size={20} className="text-teal-600" />
            Issue Information
          </h2>

          <p className="text-sm text-slate-400 mt-1">
            Provide details about the problem you encountered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">
              Issue Category *
            </label>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500"
            >
              <option value="">Select a category</option>
              <option>Road Damage</option>
              <option>Streetlight</option>
              <option>Drainage</option>
              <option>Waste Management</option>
              <option>Water Supply</option>
              <option>Public Facilities</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-slate-700">
              Severity *
            </label>

            <select
              name="severity"
              value={form.severity}
              onChange={handleChange}
              className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </div>

        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            Issue Title *
          </label>

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            placeholder="Example: Large pothole near main road"
            className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-2 text-slate-700">
            Detailed Description *
          </label>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            rows="4"
            placeholder="Describe the issue, its impact and any safety concerns..."
            className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500 resize-none"
          />
        </div>

        <div>
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4">
            <MapPin size={20} className="text-teal-600" />
            Location Details
          </h3>

          <label className="block text-sm font-semibold mb-2 text-slate-700">
            Issue Location *
          </label>

          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="Enter street, area or landmark"
            className="w-full border border-slate-200 rounded-xl p-3 outline-none focus:border-teal-500"
          />

          <button
            type="button"
            onClick={() => alert('GPS integration will be added in the next stage.')}
            className="mt-3 text-sm text-teal-700 font-semibold flex items-center gap-2"
          >
            <Navigation size={16} />
            Use my current location
          </button>
        </div>

        <div>
          <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2 mb-4">
            <Camera size={20} className="text-teal-600" />
            Upload Evidence
          </h3>

          <label className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-teal-500 transition">

            <Upload size={30} className="text-teal-600 mb-3" />

            <p className="font-semibold text-slate-700">
              Click to upload an image
            </p>

            <p className="text-xs text-slate-400 mt-2">
              PNG, JPG or JPEG
            </p>

            <input
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImage}
              className="hidden"
            />

          </label>

          {preview && (
            <div className="mt-4 relative w-fit">
              <img
                src={preview}
                alt="Issue preview"
                className="w-48 h-36 object-cover rounded-xl"
              />

              <button
                type="button"
                onClick={() => {
                  setImage(null)
                  setPreview(null)
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X size={15} />
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 border-t border-slate-100 pt-6">

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold flex items-center gap-2"
          >
            <Send size={17} />
            Submit Report
          </button>

        </div>

      </form>

    </div>
  )
}

export default ReportIssue