
import { useState } from 'react'

import {
  LayoutDashboard,
  FilePlus,
  ClipboardList,
  MapPin,
  Bell,
  Settings,
  ChevronDown,
  Clock,
  CheckCircle,
  Construction,
  Building2,
  ArrowRight,
  CheckCheck,
  Circle
} from 'lucide-react'

import ReportIssue from './page/citizen/ReportIssue'
import ComplaintDetails from './page/citizen/ComplaintDetails'
import MapView from './page/citizen/MapView'


function App() {

  const [active, setActive] = useState('Overview')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [notifications, setNotifications] = useState([])

  // Initial complaint data
  const [complaints, setComplaints] = useState([
    {
      id: 'CL-1024',
      issue: 'Damaged Road',
      location: 'Yelahanka New Town',
      date: '16 Nov 2026',
      status: 'In Progress'
    },
    {
      id: 'CL-1023',
      issue: 'Streetlight Not Working',
      location: 'Avalahalli',
      date: '15 Nov 2026',
      status: 'Under Review'
    },
    {
      id: 'CL-1022',
      issue: 'Blocked Drainage',
      location: 'Bagalur Road',
      date: '13 Nov 2026',
      status: 'Resolved'
    },
    {
      id: 'CL-1021',
      issue: 'Garbage Overflow',
      location: 'Yelahanka',
      date: '12 Nov 2026',
      status: 'Resolved'
    }
  ])


  // Handle new complaint submission
  const handleReportSubmit = (complaint) => {

    const newComplaint = {
      ...complaint,
      issue: complaint.title || complaint.category,
      date: complaint.date,
      status: 'Under Review'
    }

    setComplaints(prev => [newComplaint, ...prev])

    // Create a notification whenever a new complaint is submitted
    setNotifications(prev => [
      {
        id: Date.now(),
        title: 'Complaint submitted successfully',
        message: `Your complaint "${newComplaint.issue}" has been registered. Your complaint ID is ${newComplaint.id}.`,
        complaintId: newComplaint.id,
        date: 'Just now',
        read: false
      },
      ...prev
    ])

    setSelectedComplaint(null)
    setActive('My Complaints')

    alert(
      `Complaint submitted successfully!\n\nYour Complaint ID: ${newComplaint.id}`
    )
  }


  // Notification helpers
  const unreadCount = notifications.filter(notification => !notification.read).length

  const markNotificationAsRead = (notificationId) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === notificationId
          ? { ...notification, read: true }
          : notification
      )
    )
  }

  const handleNotificationClick = (notification) => {
    markNotificationAsRead(notification.id)

    const relatedComplaint = complaints.find(
      complaint => complaint.id === notification.complaintId
    )

    if (relatedComplaint) {
      setSelectedComplaint(relatedComplaint)
      setActive('My Complaints')
    }
  }

  const markAllNotificationsAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    )
  }


  // Sidebar navigation
  const menuItems = [
    { name: 'Overview', icon: LayoutDashboard },
    { name: 'Report an Issue', icon: FilePlus },
    { name: 'My Complaints', icon: ClipboardList },
    { name: 'Track Issues', icon: MapPin },
    { name: 'Notifications', icon: Bell }
  ]


  // Dynamic statistics
  const stats = [
    {
      title: 'Total Reports',
      value: complaints.length,
      icon: ClipboardList,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Under Review',
      value: complaints.filter(c => c.status === 'Under Review').length,
      icon: Clock,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'In Progress',
      value: complaints.filter(c => c.status === 'In Progress').length,
      icon: Construction,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Resolved',
      value: complaints.filter(c => c.status === 'Resolved').length,
      icon: CheckCircle,
      color: 'bg-green-100 text-green-600'
    }
  ]


  // Complaint table
  const ComplaintTable = ({ showAll = false }) => (

    <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

      <div className="flex justify-between items-center mb-7">

        <div>
          <h3 className="text-lg font-bold text-slate-800">
            {showAll ? 'My Complaints' : 'Recent Complaints'}
          </h3>

          <p className="text-sm text-slate-500 mt-1">
            Click on a complaint to view its tracking details.
          </p>
        </div>

        {!showAll && (

          <button
            onClick={() => {
              setSelectedComplaint(null)
              setActive('My Complaints')
            }}
            className="text-teal-700 text-sm font-semibold flex items-center gap-1"
          >
            View All <ArrowRight size={16} />
          </button>

        )}

      </div>


      <div className="overflow-x-auto">

        <table className="w-full text-left">

          <thead>
            <tr className="text-xs text-slate-400 border-b border-slate-100">

              <th className="pb-4">COMPLAINT ID</th>
              <th className="pb-4">ISSUE</th>
              <th className="pb-4">LOCATION</th>
              <th className="pb-4">DATE</th>
              <th className="pb-4">STATUS</th>

            </tr>
          </thead>


          <tbody>

            {complaints.length === 0 ? (

              <tr>
                <td colSpan="5" className="text-center py-10 text-slate-400">
                  No complaints reported yet.
                </td>
              </tr>

            ) : (

              (showAll ? complaints : complaints.slice(0, 4)).map(item => (

                <tr
                  key={item.id}
                  onClick={() => setSelectedComplaint(item)}
                  className="border-b border-slate-50 text-sm cursor-pointer hover:bg-slate-50 transition"
                  title="Click to view complaint details"
                >

                  <td className="py-5 font-semibold text-slate-700">
                    {item.id}
                  </td>

                  <td className="py-5 text-slate-700">
                    {item.issue}
                  </td>

                  <td className="py-5 text-slate-500">
                    {item.location}
                  </td>

                  <td className="py-5 text-slate-500">
                    {item.date}
                  </td>

                  <td className="py-5">

                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      item.status === 'Resolved'
                        ? 'bg-green-100 text-green-700'
                        : item.status === 'In Progress'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>

                      {item.status}

                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>

  )


  return (

    <div className="min-h-screen bg-slate-50 flex">


      {/* SIDEBAR */}

      <aside className="w-64 bg-[#102A43] text-white min-h-screen p-6 flex flex-col shrink-0">

        {/* LOGO */}

        <div className="flex items-center gap-3 mb-12">

          <div className="bg-teal-400 p-2 rounded-xl">
            <Building2 size={25} className="text-[#102A43]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold">
              CivicLens
            </h1>

            <p className="text-xs text-slate-400">
              Smart Civic Platform
            </p>
          </div>

        </div>


        <p className="text-xs text-slate-400 uppercase mb-4 tracking-widest">
          Main Menu
        </p>


        {/* NAVIGATION */}

        <nav className="space-y-2">

          {menuItems.map(item => {

            const Icon = item.icon

            return (

              <button
                key={item.name}
                onClick={() => {
                  setSelectedComplaint(null)
                  setActive(item.name)
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-sm transition ${
                  active === item.name
                    ? 'bg-teal-400 text-[#102A43] font-semibold'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >

                <Icon size={19} />

                {item.name}

                {item.name === 'Notifications' && unreadCount > 0 && (
                  <span className="ml-auto min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}

              </button>

            )

          })}

        </nav>


        {/* SIDEBAR FOOTER */}

        <div className="mt-auto border-t border-slate-600 pt-5">

          <button className="flex items-center gap-3 text-slate-300 text-sm p-2">
            <Settings size={19} />
            Settings
          </button>

          <p className="text-xs text-slate-500 mt-6">
            CivicLens © 2026
          </p>

        </div>

      </aside>



      {/* MAIN CONTENT */}

      <main className="flex-1 p-8 min-w-0">


        {/* TOP BAR */}

        <header className="flex justify-between items-center mb-10">

          <div>

            <p className="text-sm text-slate-500">
              Citizen Portal / {active}
            </p>

            <h2 className="text-2xl font-bold text-slate-800 mt-1">
              {selectedComplaint
                ? 'Complaint Details'
                : active === 'Overview'
                ? 'Dashboard Overview'
                : active}
            </h2>

          </div>


          <div className="flex items-center gap-5">

            <button
              onClick={() => {
                setSelectedComplaint(null)
                setActive('Notifications')
              }}
              className="relative text-slate-500"
            >

              <Bell size={22} />

              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-2 min-w-5 h-5 px-1 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                  {unreadCount}
                </span>
              )}

            </button>


            <div className="flex items-center gap-3">

              <div className="bg-teal-100 text-teal-800 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                S
              </div>

              <div>

                <p className="font-semibold text-sm text-slate-800">
                  Citizen
                </p>

                <p className="text-xs text-slate-500">
                  User Account
                </p>

              </div>

              <ChevronDown size={16} />

            </div>

          </div>

        </header>



        {/* COMPLAINT DETAILS / TRACKING PAGE */}

        {selectedComplaint && (

          <ComplaintDetails
            complaint={selectedComplaint}
            onBack={() => setSelectedComplaint(null)}
          />

        )}



        {/* REPORT ISSUE PAGE */}

        {!selectedComplaint && active === 'Report an Issue' && (

          <ReportIssue
            onSubmit={handleReportSubmit}
            onCancel={() => setActive('Overview')}
          />

        )}



        {/* OVERVIEW PAGE */}

        {!selectedComplaint && active === 'Overview' && (

          <>

            {/* WELCOME SECTION */}

            <section className="bg-gradient-to-r from-[#102A43] to-teal-700 rounded-2xl p-8 text-white mb-8">

              <div className="flex justify-between items-center">

                <div>

                  <p className="text-teal-200 text-sm mb-2">
                    WELCOME TO CIVICLENS
                  </p>

                  <h2 className="text-3xl font-bold mb-3">
                    Hello, Citizen! 👋
                  </h2>

                  <p className="text-slate-200">
                    Together, let's make our communities better.
                  </p>


                  <button
                    onClick={() => setActive('Report an Issue')}
                    className="mt-6 bg-teal-400 text-[#102A43] px-5 py-3 rounded-xl font-semibold hover:bg-teal-300 transition flex items-center gap-2"
                  >

                    <FilePlus size={18} />

                    Report a Civic Issue

                  </button>

                </div>


                <Building2
                  size={110}
                  className="text-white opacity-20 hidden md:block"
                />

              </div>

            </section>



            {/* STATISTICS CARDS */}

            <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-9">

              {stats.map(stat => {

                const Icon = stat.icon

                return (

                  <div
                    key={stat.title}
                    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                  >

                    <div className="flex justify-between items-center">

                      <div>

                        <p className="text-sm text-slate-500">
                          {stat.title}
                        </p>

                        <h3 className="text-3xl font-bold text-slate-800 mt-3">
                          {stat.value}
                        </h3>

                      </div>


                      <div className={`p-3 rounded-xl ${stat.color}`}>
                        <Icon size={23} />
                      </div>

                    </div>

                    <p className="text-xs text-slate-400 mt-4">
                      Your complaint records
                    </p>

                  </div>

                )

              })}

            </section>



            {/* RECENT COMPLAINTS */}

            <ComplaintTable />

          </>

        )}



        {/* MY COMPLAINTS PAGE */}

        {!selectedComplaint && active === 'My Complaints' && (

          <ComplaintTable showAll={true} />

        )}



        {/* TRACK ISSUES PAGE */}

        {!selectedComplaint && active === 'Track Issues' && (

          <div className="space-y-6">

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">
                    Civic Issues Map
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Explore reported civic issues around Yelahanka and nearby areas.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-xs text-slate-600">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                    Under Review
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                    In Progress
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-600"></span>
                    Resolved
                  </span>
                </div>
              </div>

              <MapView
                complaints={complaints}
                onSelectComplaint={(complaint) => setSelectedComplaint(complaint)}
              />

              <p className="text-xs text-slate-400 mt-3">
                Map markers use approximate area-level demo coordinates. Precise GPS locations will be added when location capture is connected.
              </p>

            </section>

            <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">
                  Reported Issues ({complaints.length})
                </h3>

                <button
                  onClick={() => setActive('My Complaints')}
                  className="text-sm text-teal-700 font-semibold hover:text-teal-900"
                >
                  View all
                </button>
              </div>

              <div className="space-y-3">
                {complaints.map(complaint => (
                  <button
                    key={complaint.id}
                    onClick={() => setSelectedComplaint(complaint)}
                    className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-left p-4 rounded-xl border border-slate-100 hover:bg-slate-50 transition"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">
                        {complaint.issue}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {complaint.id} · {complaint.location}
                      </p>
                    </div>

                    <span className={`w-fit px-3 py-1.5 rounded-full text-xs font-semibold ${
                      complaint.status === 'Resolved'
                        ? 'bg-green-100 text-green-700'
                        : complaint.status === 'In Progress'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {complaint.status}
                    </span>
                  </button>
                ))}
              </div>
            </section>

          </div>

        )}



        {/* NOTIFICATIONS PAGE */}

        {!selectedComplaint && active === 'Notifications' && (

          <section className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>
                <div className="flex items-center gap-3">
                  <Bell size={27} className="text-teal-600" />
                  <h2 className="text-xl font-bold text-slate-800">
                    Notifications Centre
                  </h2>
                </div>

                <p className="text-sm text-slate-500 mt-2">
                  Stay updated on your civic complaints and their progress.
                </p>
              </div>

              {notifications.length > 0 && unreadCount > 0 && (
                <button
                  onClick={markAllNotificationsAsRead}
                  className="text-sm font-semibold text-teal-700 hover:text-teal-900 flex items-center gap-2"
                >
                  <CheckCheck size={17} />
                  Mark all as read
                </button>
              )}

            </div>

            {notifications.length === 0 ? (

              <div className="text-center py-16 border-t border-slate-100">
                <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell size={28} className="text-teal-600" />
                </div>

                <h3 className="text-lg font-semibold text-slate-700">
                  You're all caught up!
                </h3>

                <p className="text-sm text-slate-500 mt-2">
                  Notifications about your submitted complaints will appear here.
                </p>

                <button
                  onClick={() => setActive('Report an Issue')}
                  className="mt-6 bg-teal-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-teal-700 transition"
                >
                  Report an Issue
                </button>
              </div>

            ) : (

              <div className="space-y-3">

                {notifications.map(notification => (

                  <div
                    key={notification.id}
                    className={`w-full flex items-start gap-4 p-4 rounded-xl border transition ${
                      notification.read
                        ? 'bg-white border-slate-100'
                        : 'bg-teal-50 border-teal-100'
                    }`}
                  >

                    <div className="mt-1">
                      {notification.read ? (
                        <Bell size={20} className="text-slate-400" />
                      ) : (
                        <Circle size={11} fill="currentColor" className="text-teal-600 mt-1" />
                      )}
                    </div>

                    <button
                      onClick={() => handleNotificationClick(notification)}
                      className="flex-1 text-left min-w-0"
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-semibold text-slate-800">
                          {notification.title}
                        </h3>

                        {!notification.read && (
                          <span className="text-xs bg-teal-100 text-teal-700 px-2 py-1 rounded-full font-semibold">
                            New
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-slate-600 mt-1">
                        {notification.message}
                      </p>

                      <p className="text-xs text-slate-400 mt-2">
                        {notification.date} · Complaint ID: {notification.complaintId}
                      </p>
                    </button>

                    {!notification.read && (
                      <button
                        onClick={() => markNotificationAsRead(notification.id)}
                        className="text-xs text-teal-700 hover:text-teal-900 font-semibold whitespace-nowrap"
                      >
                        Mark as read
                      </button>
                    )}

                  </div>

                ))}

              </div>

            )}

          </section>

        )}



        {/* FOOTER */}

        <footer className="mt-8 text-center text-xs text-slate-400">

          CivicLens | Building Better Communities Through Technology

        </footer>


      </main>

    </div>

  )

}

export default App
