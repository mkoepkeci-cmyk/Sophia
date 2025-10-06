import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { supabase, UserRequest, GovernanceType } from '../lib/supabase';

export function GovernanceAnalytics() {
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const [governanceTypes, setGovernanceTypes] = useState<GovernanceType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const [requestsResult, typesResult] = await Promise.all([
        supabase.from('user_requests').select('*'),
        supabase.from('governance_types').select('*')
      ]);

      if (requestsResult.data) setRequests(requestsResult.data);
      if (typesResult.data) setGovernanceTypes(typesResult.data);

      setLoading(false);
    };

    fetchData();
  }, []);

  const fullGovType = governanceTypes.find(gt => gt.name === 'Full Governance');
  const templatedGovType = governanceTypes.find(gt => gt.name === 'Governance Templated');

  const fullGovCount = requests.filter(r => r.governance_type_id === fullGovType?.id).length;
  const templatedGovCount = requests.filter(r => r.governance_type_id === templatedGovType?.id).length;
  const totalRequests = requests.length;

  const phaseDistribution = requests.reduce((acc, req) => {
    acc[req.current_phase] = (acc[req.current_phase] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Governance Pathway Analytics</h2>
        <p className="text-gray-600">Track and analyze requests across both governance pathways</p>
      </div>

      {/* Overview Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900">{totalRequests}</div>
          <div className="text-sm text-gray-600 mt-1">Total Requests</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center">
              <AlertTriangle className="text-orange-700" size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-orange-900">{fullGovCount}</div>
          <div className="text-sm text-orange-700 mt-1">Full Governance</div>
          {totalRequests > 0 && (
            <div className="text-xs text-orange-600 mt-2">
              {Math.round((fullGovCount / totalRequests) * 100)}% of total
            </div>
          )}
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center">
              <Zap className="text-green-700" size={24} />
            </div>
          </div>
          <div className="text-3xl font-bold text-green-900">{templatedGovCount}</div>
          <div className="text-sm text-green-700 mt-1">Governance Templated</div>
          {totalRequests > 0 && (
            <div className="text-xs text-green-600 mt-2">
              {Math.round((templatedGovCount / totalRequests) * 100)}% of total
            </div>
          )}
        </div>
      </div>

      {/* Pathway Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="text-purple-600" size={20} />
          Pathway Distribution
        </h3>

        {totalRequests > 0 ? (
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Full Governance</span>
                <span className="text-sm font-bold text-orange-600">{fullGovCount} requests</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-orange-400 to-orange-600 h-3 rounded-full transition-all"
                  style={{ width: `${(fullGovCount / totalRequests) * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Governance Templated</span>
                <span className="text-sm font-bold text-green-600">{templatedGovCount} requests</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all"
                  style={{ width: `${(templatedGovCount / totalRequests) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No requests yet</p>
        )}
      </div>

      {/* Phase Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="text-purple-600" size={20} />
          Current Phase Distribution
        </h3>

        {Object.keys(phaseDistribution).length > 0 ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(phaseDistribution).map(([phase, count]) => (
              <div key={phase} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <div className="text-2xl font-bold text-gray-900">{count}</div>
                <div className="text-sm text-gray-600 capitalize mt-1">{phase}</div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round((count / totalRequests) * 100)}%
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">No phase data available</p>
        )}
      </div>

      {/* Timeline Savings */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <CheckCircle className="text-purple-600" size={20} />
          Estimated Time Savings with Governance Templated
        </h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="text-sm text-gray-600 mb-2">Average Full Governance Timeline</div>
            <div className="text-2xl font-bold text-orange-700">8-12 weeks</div>
            <div className="text-xs text-gray-500 mt-2">
              Includes vetting, prioritization, and all governance meetings
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border border-green-200">
            <div className="text-sm text-gray-600 mb-2">Average Governance Templated Timeline</div>
            <div className="text-2xl font-bold text-green-700">2-4 weeks</div>
            <div className="text-xs text-gray-500 mt-2">
              Bypasses vetting and prioritization - moves directly to design
            </div>
          </div>
        </div>

        {templatedGovCount > 0 && (
          <div className="mt-4 p-4 bg-green-100 border border-green-300 rounded-lg">
            <div className="flex items-center gap-2">
              <Zap className="text-green-700" size={20} />
              <div className="text-sm font-medium text-green-800">
                Estimated time saved with {templatedGovCount} templated request
                {templatedGovCount !== 1 ? 's' : ''}:{' '}
                <span className="font-bold">{templatedGovCount * 6}-{templatedGovCount * 8} weeks</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Key Insights */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>

        <div className="space-y-3 text-sm">
          {templatedGovCount > 0 && (
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-medium text-green-900">
                  {Math.round((templatedGovCount / totalRequests) * 100)}% of requests
                </span>{' '}
                <span className="text-green-700">
                  are using the fast-track Governance Templated pathway, saving significant time.
                </span>
              </div>
            </div>
          )}

          {fullGovCount > templatedGovCount && (
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <AlertTriangle className="text-blue-600 flex-shrink-0 mt-0.5" size={18} />
              <div className="text-blue-700">
                Most requests are following Full Governance. Consider reviewing if any could qualify
                for Governance Templated to reduce processing time.
              </div>
            </div>
          )}

          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <BarChart3 className="text-gray-600 flex-shrink-0 mt-0.5" size={18} />
            <div className="text-gray-700">
              Track your requests in Strategic Planning Workspace (SPW) using your DMND number for
              real-time status updates.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
