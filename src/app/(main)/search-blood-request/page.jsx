// app/search/page.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPin,
  Calendar,
  Clock,
  Droplet,
  Search as SearchIcon,
  Loader2,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

// Import JSON data for districts / upazilas
import districtsRaw from '../../../../data/districts.json';
import upazilasRaw from '../../../../data/upazilas.json';

const districtsInfo = districtsRaw[2].data;
const upazilasInfo = upazilasRaw[2].data;
const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export default function SearchPage() {
  const router = useRouter();

  // Search form state
  const [bloodGroup, setBloodGroup] = useState('');
  const [district, setDistrict] = useState('');
  const [upazila, setUpazila] = useState('');
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // Results state
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState(null);

  // Filter upazilas based on district
  useEffect(() => {
    if (district) {
      const selected = districtsInfo.find((d) => d.name === district);
      if (selected) {
        const upazilas = upazilasInfo.filter(
          (u) => u.district_id === selected.id
        );
        setFilteredUpazilas(upazilas);
        if (!upazilas.find((u) => u.name === upazila)) {
          setUpazila('');
        }
      }
    } else {
      setFilteredUpazilas([]);
      setUpazila('');
    }
  }, [district]);

const handleSearch = async (e) => {
  e.preventDefault();
  if (!bloodGroup && !district && !upazila) {
    setError('Please select at least one filter');
    return;
  }

  setLoading(true);
  setError(null);
  setSearched(true);

  // Build query params with manual encoding for blood group
  const params = new URLSearchParams();
  params.append('status', 'pending');
  if (bloodGroup) params.append('bloodGroup', bloodGroup); // ✅ explicit encode
  if (district) params.append('district', district);
  if (upazila) params.append('upazila', upazila);

  const url = `http://localhost:5000/api/donation-requests?${params.toString()}`;
  console.log('Search URL:', url); // debug

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();
    setResults(data);
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0b0f1c] py-16 px-4 pt-30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Find Blood Donation Requests
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Search for active blood needs by blood group and location. Every
            request is a life waiting for a hero.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 md:p-8 mb-10">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {/* Blood Group */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-gray-600 rounded-xl text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <option value="">All Groups</option>
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* District */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                District
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#1a1a2e] border border-gray-600 rounded-xl text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              >
                <option value="">All Districts</option>
                {districtsInfo.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Upazila
              </label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                disabled={!district}
                className="w-full bg-[#1a1a2e] border border-gray-600 rounded-xl text-white py-3 px-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <option value="">All Upazilas</option>
                {filteredUpazilas.map((u) => (
                  <option key={u.id} value={u.name}>
                    {u.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="flex items-end">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    <SearchIcon size={18} />
                    Search
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {searched && (
          <div>
            {error && (
              <div className="text-center text-red-400 mb-6">{error}</div>
            )}

            {!loading && !error && results.length === 0 && (
              <div className="text-center text-gray-400 py-12">
                <Droplet size={48} className="mx-auto mb-4 text-gray-600" />
                <p className="text-lg">
                  No donation requests found matching your criteria.
                </p>
                <p className="text-sm mt-2">
                  Try different filters or check back later.
                </p>
              </div>
            )}

            {results.length > 0 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">
                  {results.length} Request{results.length > 1 ? 's' : ''} Found
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {results.map((req) => (
                    <div
                      key={req._id}
                      className="group relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 hover:border-red-500/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] hover:-translate-y-1"
                    >
                      {/* Animated top border */}
                      <span className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r from-red-600 to-rose-500 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-bold text-white">
                          {req.recipientName}
                        </h3>
                        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-red-600/20 text-red-300 rounded-full text-sm font-bold border border-red-500/30">
                          <Droplet size={16} />
                          {req.bloodGroup}
                        </span>
                      </div>

                      <div className="space-y-3 text-gray-300 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-red-400" />
                          <span>
                            {req.district}, {req.upazila}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar size={16} className="text-red-400" />
                          <span>
                            {new Date(req.donationDate).toLocaleDateString(
                              'en-BD',
                              {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              }
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-red-400" />
                          <span>{req.donationTime}</span>
                        </div>
                      </div>

                      <Link
                        href={`/donation-requests/${req._id}`}
                        className="mt-6 w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500 text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-red-600/20"
                      >
                        <Eye size={18} />
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
