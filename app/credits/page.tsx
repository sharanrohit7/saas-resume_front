'use client';

import { useEffect, useState } from 'react';
import { FiCheckCircle } from 'react-icons/fi';
import { getAllPlans, SubscriptionPlan } from '../api/credits';


export default function Credits() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPlans = async () => {
      const response = await getAllPlans();
      if (response.success) {
        setPlans(response.data);
      }
      setLoading(false);
    };
    fetchPlans();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="px-6 py-8">
          <h1 className="text-2xl font-bold text-white mb-6">Choose Your Plan</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="flex flex-col border border-gray-700 bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-blue-400/20 transition-all duration-300"
              >
                <h3 className="text-xl font-bold text-blue-400 mb-2">{plan.name}</h3>
                {plan.description && (
                  <p className="text-gray-400 mb-4 text-sm">{plan.description}</p>
                )}

                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features &&
                    Object.entries(plan.features).map(([key, value]) => (
                      <li key={key} className="flex items-center gap-2 text-gray-300 text-sm">
                        <FiCheckCircle className="text-green-400" />
                        <span className="capitalize">{key.replace('_', ' ')}:</span>
                        <span className="font-medium ml-1">
                          {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : String(value)}
                        </span>
                      </li>
                    ))}
                </ul>

                <div>
                  <div className="text-white text-lg font-semibold">
                    ₹{plan.price.offer.toLocaleString('en-IN')}
                    {plan.price.offer !== plan.price.original && (
                      <span className="text-sm line-through text-gray-400 ml-2">
                        ₹{plan.price.original.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mb-4">
                    Billed in {plan.price.currency.toUpperCase()}
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Choose Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
