import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [flats, setFlats] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reports, setReports] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Pagination states
  const [userPage, setUserPage] = useState(1);
  const [flatPage, setFlatPage] = useState(1);
  const [bookingPage, setBookingPage] = useState(1);
  const [reportPage, setReportPage] = useState(1);

  // Search states
  const [userSearch, setUserSearch] = useState('');
  const [flatSearch, setFlatSearch] = useState('');

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          setError('Please log in to access admin dashboard');
          setLoading(false);
          return;
        }

        // Check admin status by trying to fetch dashboard stats
        const response = await fetch(`/api/admin/dashboard-stats?userEmail=${encodeURIComponent(userEmail)}`);
        
        if (response.status === 403) {
          setError('Access denied. Admin privileges required.');
          setIsAdmin(false);
        } else if (response.ok) {
          setIsAdmin(true);
          const data = await response.json();
          setDashboardStats(data);
        } else {
          setError('Failed to verify admin status');
        }
      } catch (err) {
        setError('Network error: ' + err.message);
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, []);

  // Fetch data based on active tab
  useEffect(() => {
    if (!isAdmin) return;
    
    const fetchData = async () => {
      const userEmail = localStorage.getItem('userEmail');
      
      try {
        switch (activeTab) {
          case 'users':
            await fetchUsers(userEmail);
            break;
          case 'flats':
            await fetchFlats(userEmail);
            break;
          case 'bookings':
            await fetchBookings(userEmail);
            break;
          case 'reports':
            await fetchReports(userEmail);
            break;
          case 'analytics':
            await fetchAnalytics(userEmail);
            break;
        }
      } catch (err) {
        setError('Failed to fetch data: ' + err.message);
      }
    };

    fetchData();
  }, [activeTab, userPage, flatPage, bookingPage, reportPage, userSearch, flatSearch, isAdmin]);

  const fetchUsers = async (userEmail) => {
    const response = await fetch(
      `/api/admin/users?userEmail=${encodeURIComponent(userEmail)}&page=${userPage}&search=${userSearch}`
    );
    if (response.ok) {
      const data = await response.json();
      setUsers(data.users);
    }
  };

  const fetchFlats = async (userEmail) => {
    const response = await fetch(
      `/api/admin/flats?userEmail=${encodeURIComponent(userEmail)}&page=${flatPage}&search=${flatSearch}`
    );
    if (response.ok) {
      const data = await response.json();
      setFlats(data.flats);
    }
  };

  const fetchBookings = async (userEmail) => {
    const response = await fetch(
      `/api/admin/bookings?userEmail=${encodeURIComponent(userEmail)}&page=${bookingPage}`
    );
    if (response.ok) {
      const data = await response.json();
      setBookings(data.bookings);
    }
  };

  const fetchReports = async (userEmail) => {
    const response = await fetch(
      `/api/admin/reports?userEmail=${encodeURIComponent(userEmail)}&page=${reportPage}`
    );
    if (response.ok) {
      const data = await response.json();
      setReports(data.reports);
    }
  };

  const fetchAnalytics = async (userEmail) => {
    const response = await fetch(
      `/api/admin/analytics?userEmail=${encodeURIComponent(userEmail)}`
    );
    if (response.ok) {
      const data = await response.json();
      setAnalytics(data);
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/admin/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole, userEmail })
      });

      if (response.ok) {
        await fetchUsers(userEmail);
        alert('User role updated successfully');
      } else {
        alert('Failed to update user role');
      }
    } catch (err) {
      alert('Error updating user role: ' + err.message);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/admin/users/${userId}?userEmail=${encodeURIComponent(userEmail)}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchUsers(userEmail);
        alert('User deleted successfully');
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      alert('Error deleting user: ' + err.message);
    }
  };

  const deleteFlat = async (flatId) => {
    if (!confirm('Are you sure you want to delete this flat listing?')) {
      return;
    }

    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/admin/flats/${flatId}?userEmail=${encodeURIComponent(userEmail)}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        await fetchFlats(userEmail);
        alert('Flat listing deleted successfully');
      } else {
        alert('Failed to delete flat listing');
      }
    } catch (err) {
      alert('Error deleting flat: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-red-50 border border-red-200 rounded-lg">
        <div className="text-red-800 text-center">
          <h2 className="text-lg font-semibold mb-2">Access Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => navigate('/')} 
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const StatCard = ({ title, value, subtitle, icon, color = "blue" }) => (
    <div className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-${color}-500`}>
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-600 mt-1">{subtitle}</p>}
        </div>
        <div className={`text-${color}-500 text-2xl`}>{icon}</div>
      </div>
    </div>
  );

  const TabButton = ({ id, label, isActive, onClick }) => (
    <button
      onClick={() => onClick(id)}
      className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${
        isActive 
          ? 'bg-blue-600 text-white border-b-2 border-blue-600' 
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );


  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your FlatScout platform</p>
        </div>
        {/* Tab Navigation - now below heading */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-1">
              <TabButton id="overview" label="Overview" isActive={activeTab === 'overview'} onClick={setActiveTab} />
              <TabButton id="users" label="Users" isActive={activeTab === 'users'} onClick={setActiveTab} />
              <TabButton id="flats" label="Flat Listings" isActive={activeTab === 'flats'} onClick={setActiveTab} />
              <TabButton id="bookings" label="Bookings" isActive={activeTab === 'bookings'} onClick={setActiveTab} />
              <TabButton id="reports" label="Reports" isActive={activeTab === 'reports'} onClick={setActiveTab} />
              <TabButton id="analytics" label="Analytics" isActive={activeTab === 'analytics'} onClick={setActiveTab} />
            </nav>
          </div>
        </div>

        {/* Overview Stats */}
        {activeTab === 'overview' && dashboardStats && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <StatCard
                title="Total Users"
                value={dashboardStats.totalStats.totalUsers}
                subtitle={`+${dashboardStats.monthlyStats.newUsersThisMonth} this month`}
                icon="👥"
                color="blue"
              />
              <StatCard
                title="Total Flats"
                value={dashboardStats.totalStats.totalFlats}
                subtitle={`+${dashboardStats.monthlyStats.newFlatsThisMonth} this month`}
                icon="🏠"
                color="green"
              />
              <StatCard
                title="Total Bookings"
                value={dashboardStats.totalStats.totalBookings}
                subtitle={`+${dashboardStats.monthlyStats.newBookingsThisMonth} this month`}
                icon="📅"
                color="purple"
              />
              <StatCard
                title="Pending Connections"
                value={dashboardStats.totalStats.pendingConnections}
                icon="🔗"
                color="yellow"
              />
              <StatCard
                title="Total Reports"
                value={dashboardStats.totalStats.totalReports}
                icon="⚠️"
                color="red"
              />
              <StatCard
                title="Active Flatmates"
                value={dashboardStats.totalStats.totalFlatmates}
                icon="👤"
                color="indigo"
              />
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
                <div className="space-y-3">
                  {dashboardStats.recentActivity.recentUsers.map((user) => (
                    <div key={user._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {dashboardStats.recentActivity.recentBookings.map((booking) => (
                    <div key={booking._id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">{booking.flatId?.title || 'Unknown Flat'}</p>
                        <p className="text-sm text-gray-600">{booking.userId?.name || 'Unknown User'}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm">
          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">User Management</h2>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Connections</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={user.role}
                            onChange={(e) => updateUserRole(user._id, e.target.value)}
                            className="text-sm border border-gray-300 rounded px-2 py-1"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.connections?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteUser(user._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Flats Tab */}
          {activeTab === 'flats' && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Flat Listings</h2>
                <input
                  type="text"
                  placeholder="Search flats..."
                  value={flatSearch}
                  onChange={(e) => setFlatSearch(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rent</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {flats.map((flat) => (
                      <tr key={flat._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {flat.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {flat.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ₹{flat.rent}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {flat.ownerEmail}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(flat.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => deleteFlat(flat._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Booking Management</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Flat</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visitor</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.flatId?.title || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.userId?.name || booking.visitorName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(booking.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {booking.timeSlot}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Reports Tab */}
          {activeTab === 'reports' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Reports Management</h2>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reported By</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Listing</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {reports.map((report) => (
                      <tr key={report._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {report.reportedBy?.name || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.listingId?.title || 'Unknown'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {report.reason.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            report.status === 'resolved' ? 'bg-green-100 text-green-800' :
                            report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {report.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(report.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && analytics && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Analytics & Insights</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">User Registration Trend</h3>
                  <div className="text-sm text-gray-600">
                    Last 12 months: {analytics.userTrend.data.reduce((a, b) => a + b, 0)} total registrations
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">Booking Trend</h3>
                  <div className="text-sm text-gray-600">
                    Last 12 months: {analytics.bookingTrend.data.reduce((a, b) => a + b, 0)} total bookings
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg lg:col-span-2">
                  <h3 className="text-lg font-medium mb-3">Top Locations</h3>
                  <div className="space-y-2">
                    {analytics.topLocations.map((location, index) => (
                      <div key={location._id} className="flex justify-between items-center">
                        <span className="text-sm">{index + 1}. {location._id}</span>
                        <span className="text-sm font-medium">{location.count} listings</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;