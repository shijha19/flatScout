import React, { useState } from 'react';

const ReportListing = () => {
  const [formData, setFormData] = useState({
    listingId: '',
    listingUrl: '',
    reportType: 'fraud',
    description: '',
    reporterName: localStorage.getItem('name') || '',
    reporterEmail: localStorage.getItem('userEmail') || '',
    evidence: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const reportTypes = [
    { value: 'fraud', label: 'Fraudulent Listing' },
    { value: 'fake', label: 'Fake Property' },
    { value: 'spam', label: 'Spam/Duplicate' },
    { value: 'inappropriate', label: 'Inappropriate Content' },
    { value: 'pricing', label: 'Misleading Pricing' },
    { value: 'photos', label: 'Fake/Misleading Photos' },
    { value: 'other', label: 'Other' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Implement API call to submit report
      console.log('Report submitted:', formData);
      alert('Report submitted successfully! We will review it shortly.');
      
      // Reset form
      setFormData({
        listingId: '',
        listingUrl: '',
        reportType: 'fraud',
        description: '',
        reporterName: localStorage.getItem('name') || '',
        reporterEmail: localStorage.getItem('userEmail') || '',
        evidence: ''
      });
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Error submitting report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report a Listing</h1>
          <p className="text-gray-600">Help us maintain quality by reporting suspicious or inappropriate listings</p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing ID (if known)
                </label>
                <input
                  type="text"
                  value={formData.listingId}
                  onChange={(e) => setFormData({...formData, listingId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Enter listing ID"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Listing URL *
                </label>
                <input
                  type="url"
                  value={formData.listingUrl}
                  onChange={(e) => setFormData({...formData, listingUrl: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type *
              </label>
              <select
                value={formData.reportType}
                onChange={(e) => setFormData({...formData, reportType: e.target.value})}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {reportTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Please provide detailed information about the issue..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={formData.reporterName}
                  onChange={(e) => setFormData({...formData, reporterName: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  value={formData.reporterEmail}
                  onChange={(e) => setFormData({...formData, reporterEmail: e.target.value})}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Supporting Evidence
              </label>
              <textarea
                value={formData.evidence}
                onChange={(e) => setFormData({...formData, evidence: e.target.value})}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Any additional evidence or URLs that support your report..."
              />
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important Note
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>Please ensure your report is accurate and provide as much detail as possible. False reports may result in account restrictions.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportListing;
