import { useState } from 'react';
import { Search, Calendar, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import { supabase, type VisaApplication } from '../lib/supabase';

export default function TrackApplication() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [applications, setApplications] = useState<VisaApplication[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const { data, error } = await supabase
        .from('visa_applications')
        .select('*')
        .eq('email', email)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'under_review':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5" />;
      case 'under_review':
        return <FileText className="h-5 w-5" />;
      case 'approved':
        return <CheckCircle className="h-5 w-5" />;
      case 'rejected':
        return <XCircle className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section id="track" className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Track Your Application</h2>
          <p className="text-xl text-gray-600">Enter your email to check the status of your visa application</p>
        </div>

        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-lg"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center space-x-2 disabled:opacity-50"
            >
              <Search className="h-5 w-5" />
              <span>{loading ? 'Searching...' : 'Search'}</span>
            </button>
          </form>
        </div>

        {searched && applications.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 max-w-md mx-auto">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No applications found for this email address.</p>
            </div>
          </div>
        )}

        {applications.length > 0 && (
          <div className="space-y-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-gradient-to-r from-white to-blue-50 rounded-xl shadow-md hover:shadow-lg transition p-6 border border-gray-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{app.full_name}</h3>
                    <p className="text-gray-600">
                      {app.visa_type} - {app.country_destination}
                    </p>
                  </div>
                  <div className={`mt-4 md:mt-0 px-4 py-2 rounded-full border-2 font-semibold flex items-center space-x-2 w-fit ${getStatusColor(app.application_status || 'pending')}`}>
                    {getStatusIcon(app.application_status || 'pending')}
                    <span className="capitalize">{app.application_status?.replace('_', ' ')}</span>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Applied: {app.created_at && formatDate(app.created_at)}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FileText className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Passport: {app.passport_number}</span>
                  </div>
                  {app.university_name && (
                    <div className="flex items-center text-gray-700 md:col-span-2">
                      <span className="font-semibold mr-2">University:</span>
                      <span>{app.university_name}</span>
                    </div>
                  )}
                  {app.course_name && (
                    <div className="flex items-center text-gray-700 md:col-span-2">
                      <span className="font-semibold mr-2">Course:</span>
                      <span>{app.course_name}</span>
                    </div>
                  )}
                </div>

                {app.application_status === 'pending' && (
                  <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 text-sm">
                      Your application is pending review. We will contact you via email within 2-3 business days.
                    </p>
                  </div>
                )}

                {app.application_status === 'approved' && (
                  <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-green-800 text-sm font-semibold">
                      Congratulations! Your visa application has been approved. Check your email for further instructions.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
