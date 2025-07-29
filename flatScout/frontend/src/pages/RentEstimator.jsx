import React, { useState } from 'react';

const RentEstimator = () => {
  const [formData, setFormData] = useState({
    location: '',
    propertyType: 'apartment',
    bedrooms: '1',
    bathrooms: '1',
    area: '',
    furnishing: 'unfurnished',
    amenities: [],
    floor: '',
    age: '',
    nearbyTransport: false,
    nearbySchools: false,
    nearbyHospitals: false,
    nearbyMalls: false
  });

  const [estimatedRent, setEstimatedRent] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'house', label: 'Independent House' },
    { value: 'villa', label: 'Villa' },
    { value: 'studio', label: 'Studio' },
    { value: 'duplex', label: 'Duplex' },
    { value: 'penthouse', label: 'Penthouse' }
  ];

  const furnishingOptions = [
    { value: 'unfurnished', label: 'Unfurnished' },
    { value: 'semi-furnished', label: 'Semi-Furnished' },
    { value: 'fully-furnished', label: 'Fully Furnished' }
  ];

  const amenityOptions = [
    'Parking', 'Gym', 'Swimming Pool', 'Security', 'Lift', 'Power Backup',
    'Water Supply', 'Garden', 'Club House', 'Children Play Area', 'AC', 'Balcony'
  ];

  const handleAmenityChange = (amenity) => {
    const updatedAmenities = formData.amenities.includes(amenity)
      ? formData.amenities.filter(a => a !== amenity)
      : [...formData.amenities, amenity];
    
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const calculateRent = async () => {
    setIsCalculating(true);
    
    try {
      // Mock calculation - in real app, this would call an API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Base rent calculation (simplified)
      let baseRent = 10000; // Base rent
      
      // Location factor (mock data)
      const locationMultipliers = {
        'mumbai': 2.5,
        'delhi': 2.2,
        'bangalore': 2.0,
        'pune': 1.8,
        'chennai': 1.7,
        'hyderabad': 1.6,
        'kolkata': 1.4,
        'ahmedabad': 1.3,
        'jaipur': 1.2,
        'indore': 1.1
      };
      
      const locationKey = formData.location.toLowerCase();
      const locationMultiplier = locationMultipliers[locationKey] || 1.0;
      baseRent *= locationMultiplier;
      
      // Property type factor
      const typeMultipliers = {
        'studio': 0.7,
        'apartment': 1.0,
        'duplex': 1.3,
        'house': 1.4,
        'villa': 1.8,
        'penthouse': 2.5
      };
      baseRent *= typeMultipliers[formData.propertyType];
      
      // Bedroom factor
      baseRent *= parseInt(formData.bedrooms) * 0.8;
      
      // Area factor
      if (formData.area) {
        baseRent *= (parseInt(formData.area) / 1000);
      }
      
      // Furnishing factor
      const furnishingMultipliers = {
        'unfurnished': 1.0,
        'semi-furnished': 1.2,
        'fully-furnished': 1.5
      };
      baseRent *= furnishingMultipliers[formData.furnishing];
      
      // Amenities factor
      baseRent += formData.amenities.length * 500;
      
      // Nearby facilities bonus
      let facilitiesBonus = 0;
      if (formData.nearbyTransport) facilitiesBonus += 1000;
      if (formData.nearbySchools) facilitiesBonus += 800;
      if (formData.nearbyHospitals) facilitiesBonus += 600;
      if (formData.nearbyMalls) facilitiesBonus += 400;
      
      baseRent += facilitiesBonus;
      
      // Age depreciation
      if (formData.age) {
        const ageYears = parseInt(formData.age);
        if (ageYears > 10) {
          baseRent *= 0.9;
        } else if (ageYears > 5) {
          baseRent *= 0.95;
        }
      }
      
      const finalRent = Math.round(baseRent);
      const range = {
        min: Math.round(finalRent * 0.85),
        max: Math.round(finalRent * 1.15)
      };
      
      setEstimatedRent({ estimated: finalRent, range });
    } catch (error) {
      console.error('Error calculating rent:', error);
      alert('Error calculating rent estimate. Please try again.');
    } finally {
      setIsCalculating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateRent();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rent Estimator</h1>
          <p className="text-gray-600">Get an estimated rental value for your property based on location and features</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter city or area"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Type *
                    </label>
                    <select
                      value={formData.propertyType}
                      onChange={(e) => setFormData({...formData, propertyType: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {propertyTypes.map(type => (
                        <option key={type.value} value={type.value}>{type.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bedrooms *
                    </label>
                    <select
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({...formData, bedrooms: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4,5].map(num => (
                        <option key={num} value={num}>{num} BHK</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bathrooms *
                    </label>
                    <select
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({...formData, bathrooms: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {[1,2,3,4].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Area (sq ft)
                    </label>
                    <input
                      type="number"
                      value={formData.area}
                      onChange={(e) => setFormData({...formData, area: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter area"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Furnishing Status *
                    </label>
                    <select
                      value={formData.furnishing}
                      onChange={(e) => setFormData({...formData, furnishing: e.target.value})}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {furnishingOptions.map(option => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Property Age (years)
                    </label>
                    <input
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter age in years"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Amenities
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {amenityOptions.map(amenity => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.amenities.includes(amenity)}
                          onChange={() => handleAmenityChange(amenity)}
                          className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Nearby Facilities
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.nearbyTransport}
                        onChange={(e) => setFormData({...formData, nearbyTransport: e.target.checked})}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Public Transport</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.nearbySchools}
                        onChange={(e) => setFormData({...formData, nearbySchools: e.target.checked})}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Schools</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.nearbyHospitals}
                        onChange={(e) => setFormData({...formData, nearbyHospitals: e.target.checked})}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Hospitals</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.nearbyMalls}
                        onChange={(e) => setFormData({...formData, nearbyMalls: e.target.checked})}
                        className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="text-sm text-gray-700">Shopping Malls</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isCalculating}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isCalculating ? 'Calculating...' : 'Estimate Rent'}
                  </button>
                </div>
              </form>
            </div>

            {/* Results */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Rent Estimate</h3>
                
                {estimatedRent ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        ₹{estimatedRent.estimated.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">per month</div>
                    </div>
                    
                    <div className="border-t pt-4">
                      <div className="text-sm text-gray-700 mb-2">Expected Range:</div>
                      <div className="flex justify-between text-sm">
                        <span>Min: ₹{estimatedRent.range.min.toLocaleString()}</span>
                        <span>Max: ₹{estimatedRent.range.max.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3 mt-4">
                      <div className="text-xs text-yellow-800">
                        <strong>Note:</strong> This is an estimated value based on the provided information. Actual rental prices may vary based on market conditions, exact location, and other factors.
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-500">
                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <p>Fill out the form to get your rent estimate</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentEstimator;
