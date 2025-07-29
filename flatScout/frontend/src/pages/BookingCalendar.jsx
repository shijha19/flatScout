import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BookingCalendar = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [flats, setFlats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    flatId: '',
    ownerEmail: '',
    visitorName: localStorage.getItem('name') || '',
    visitorEmail: localStorage.getItem('userEmail') || '',
    visitorPhone: '',
    purpose: 'Flat Visit',
    notes: ''
  });

  // Time slots configuration
  const timeSlots = [
    '09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00',
    '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00',
    '17:00-18:00', '18:00-19:00'
  ];

  const purposeOptions = [
    'Flat Visit',
    'Property Inspection', 
    'Meet & Greet',
    'Document Verification',
    'Other'
  ];

  // Fetch user bookings
  useEffect(() => {
    fetchBookings();
    fetchFlats();
  }, []);

  const fetchBookings = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await fetch(`/api/booking/user-bookings?userEmail=${encodeURIComponent(userEmail)}`);
      const data = await response.json();
      
      if (data.success) {
        // Combine visitor and owner bookings and format for calendar
        const allBookings = [...data.visitorBookings, ...data.ownerBookings];
        const formattedBookings = allBookings.map(booking => ({
          id: booking._id,
          title: `${booking.timeSlot} - ${booking.flatId?.title || 'Property Visit'}`,
          start: new Date(`${booking.date.split('T')[0]}T${booking.timeSlot.split('-')[0]}:00`),
          end: new Date(`${booking.date.split('T')[0]}T${booking.timeSlot.split('-')[1]}:00`),
          resource: booking,
          allDay: false
        }));
        setBookings(formattedBookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const fetchFlats = async () => {
    try {
      const response = await fetch('/api/flats/');
      const data = await response.json();
      if (data.flats) {
        setFlats(data.flats);
      }
    } catch (error) {
      console.error('Error fetching flats:', error);
    }
  };

  const checkAvailability = async (flatId, date) => {
    try {
      const dateStr = date.toISOString().split('T')[0];
      console.log('Checking availability for flatId:', flatId, 'date:', dateStr);
      const response = await fetch(`/api/booking/availability?flatId=${flatId}&date=${dateStr}`);
      
      if (!response.ok) {
        console.log('Availability API not available, showing all slots');
        // If API is not available, show all time slots as available
        setAvailableSlots(timeSlots);
        return;
      }
      
      const data = await response.json();
      console.log('Availability response:', data);
      
      if (data.success) {
        setAvailableSlots(data.availableSlots);
        console.log('Available slots set:', data.availableSlots);
      } else {
        console.log('API returned no success, showing all slots');
        // If API returns error, show all time slots as available
        setAvailableSlots(timeSlots);
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      console.log('Error occurred, showing all slots as available');
      // If there's an error, show all time slots as available (fallback)
      setAvailableSlots(timeSlots);
    }
  };

  const handleDateSelect = ({ start }) => {
    setSelectedDate(start);
    setShowBookingForm(true);
    setSelectedSlot('');
    
    // If a flat is already selected, check availability for the new date
    if (formData.flatId) {
      checkAvailability(formData.flatId, start);
    } else {
      // Show all slots as available by default
      setAvailableSlots(timeSlots);
    }
  };

  const handleEventSelect = (event) => {
    const booking = event.resource;
    alert(`
      Booking Details:
      Property: ${booking.flatId?.title || 'N/A'}
      Date: ${new Date(booking.date).toLocaleDateString()}
      Time: ${booking.timeSlot}
      Visitor: ${booking.visitorName}
      Purpose: ${booking.purpose}
      Status: ${booking.status}
      ${booking.notes ? `Notes: ${booking.notes}` : ''}
    `);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Form submitted with data:', formData);
    console.log('Selected slot:', selectedSlot);
    console.log('Selected date:', selectedDate);
    
    // Comprehensive validation
    if (!formData.flatId) {
      alert('Please select a property');
      return;
    }
    
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    
    if (!formData.visitorName.trim()) {
      alert('Please enter your name');
      return;
    }
    
    if (!formData.visitorPhone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    
    if (!formData.purpose) {
      alert('Please select a purpose for the visit');  
      return;
    }

    console.log('All validations passed, proceeding with booking...');
    setLoading(true);

    try {
      const selectedFlat = flats.find(f => f._id === formData.flatId);
      const bookingData = {
        ...formData,
        ownerEmail: selectedFlat?.email || selectedFlat?.ownerEmail || 'demo@example.com',
        date: selectedDate.toISOString().split('T')[0],
        timeSlot: selectedSlot
      };

      console.log('Sending booking data:', bookingData);

      const response = await fetch('/api/booking/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        alert('Booking created successfully!');
        setShowBookingForm(false);
        fetchBookings(); // Refresh bookings
        setFormData({
          flatId: '',
          ownerEmail: '',
          visitorName: localStorage.getItem('name') || '',
          visitorEmail: localStorage.getItem('userEmail') || '',
          visitorPhone: '',
          purpose: 'Flat Visit',
          notes: ''
        });
        setSelectedSlot('');
      } else {
        alert(data.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      
      // For demo purposes, if the API fails, show success message
      if (error.message.includes('fetch')) {
        alert('Demo mode: Booking would be created successfully! (Backend not connected)');
        setShowBookingForm(false);
        setFormData({
          flatId: '',
          ownerEmail: '',
          visitorName: localStorage.getItem('name') || '',
          visitorEmail: localStorage.getItem('userEmail') || '',
          visitorPhone: '',
          purpose: 'Flat Visit',
          notes: ''
        });
        setSelectedSlot('');
      } else {
        alert('Error creating booking. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFlatChange = (e) => {
    const flatId = e.target.value;
    console.log('Flat selected:', flatId);
    setFormData({ ...formData, flatId });
    setSelectedSlot('');
    
    if (flatId && selectedDate) {
      console.log('Checking availability for:', flatId, selectedDate);
      checkAvailability(flatId, selectedDate);
    } else {
      // If no flat selected or no date, show all slots as available
      setAvailableSlots(flatId ? timeSlots : []);
    }
  };

  const eventStyleGetter = (event) => {
    const booking = event.resource;
    let backgroundColor = '#3174ad';
    
    switch (booking.status) {
      case 'pending':
        backgroundColor = '#f59e0b';
        break;
      case 'confirmed':
        backgroundColor = '#10b981';
        break;
      case 'cancelled':
        backgroundColor = '#ef4444';
        break;
      case 'completed':
        backgroundColor = '#6b7280';
        break;
      default:
        backgroundColor = '#3174ad';
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Calendar</h1>
          <p className="text-gray-600">Schedule property visits and manage your bookings</p>
        </div>

        <div className="p-6">
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm">Confirmed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm">Cancelled</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500 rounded"></div>
              <span className="text-sm">Completed</span>
            </div>
          </div>

          {/* Calendar */}
          <div style={{ height: '600px' }} className="mb-6">
            <Calendar
              localizer={localizer}
              events={bookings}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              onSelectSlot={handleDateSelect}
              onSelectEvent={handleEventSelect}
              selectable
              eventPropGetter={eventStyleGetter}
              views={['month', 'week', 'day']}
              defaultView="month"
              min={new Date(2024, 0, 1, 9, 0)} // 9 AM
              max={new Date(2024, 0, 1, 19, 0)} // 7 PM
            />
          </div>

          {/* Booking Form Modal */}
          {showBookingForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-screen overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Book a Visit</h3>
                  <button
                    onClick={() => setShowBookingForm(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Selected Date
                    </label>
                    <input
                      type="text"
                      value={selectedDate.toLocaleDateString()}
                      readOnly
                      className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Select Property *
                    </label>
                    <select
                      value={formData.flatId}
                      onChange={handleFlatChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="">Choose a property...</option>
                      {flats.length > 0 ? (
                        flats.map(flat => (
                          <option key={flat._id} value={flat._id}>
                            {flat.title} - {flat.location} (₹{flat.rent}/month)
                          </option>
                        ))
                      ) : (
                        <option value="demo-flat-1">Demo Property - Sample Location (₹15000/month)</option>
                      )}
                    </select>
                  </div>

                  {formData.flatId && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Available Time Slots *
                      </label>
                      {availableSlots.length > 0 ? (
                        <select
                          value={selectedSlot}
                          onChange={(e) => setSelectedSlot(e.target.value)}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                        >
                          <option value="">Choose a time slot...</option>
                          {availableSlots.map(slot => (
                            <option key={slot} value={slot}>{slot}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="text-yellow-600 text-sm bg-yellow-50 p-3 rounded-md">
                          Loading available time slots... If this persists, all time slots are available.
                        </div>
                      )}
                    </div>
                  )}

                  {formData.flatId && availableSlots.length === 0 && (
                    <div className="text-blue-600 text-sm bg-blue-50 p-3 rounded-md">
                      <p className="mb-2">Unable to check availability. You can select any time slot:</p>
                      <select
                        value={selectedSlot}
                        onChange={(e) => setSelectedSlot(e.target.value)}
                        required
                        className="w-full px-2 py-1 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Choose a time slot...</option>
                        {timeSlots.map(slot => (
                          <option key={slot} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={formData.visitorName}
                      onChange={(e) => setFormData({...formData, visitorName: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.visitorPhone}
                      onChange={(e) => setFormData({...formData, visitorPhone: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Purpose of Visit *
                    </label>
                    <select
                      value={formData.purpose}
                      onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      {purposeOptions.map(purpose => (
                        <option key={purpose} value={purpose}>{purpose}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingForm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !formData.flatId || !selectedSlot || !formData.visitorName.trim() || !formData.visitorPhone.trim() || !formData.purpose}
                      className="flex-1 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {loading ? 'Booking...' : 'Book Visit'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCalendar;
