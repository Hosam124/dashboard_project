import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Loader2, Droplets, MapPin, Wind, Compass } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

export default function Weather() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const { weather, loading, error, fetchWeather } = useWeather();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchWeather(city, apiKey);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <header className="relative z-10 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-cyan-300 hover:text-cyan-200 mb-4 font-semibold transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-black bg-gradient-to-r from-sky-300 to-cyan-400 bg-clip-text text-transparent">
            Weather Widget
          </h1>
        </div>
      </header>

      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Search Weather</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-200 mb-2">
                Find Your City
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city name"
                  className="flex-1 px-5 py-3.5 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all text-white placeholder-gray-400"
                  required
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-sky-500 to-cyan-600 text-white rounded-2xl hover:from-sky-600 hover:to-cyan-700 transition-all font-semibold shadow-lg hover:shadow-xl hover:shadow-sky-500/50 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Search className="w-5 h-5" />
                  )}
                  <span>Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        {loading && (
          <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-12 flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-sky-400 animate-spin mx-auto mb-3" />
              <p className="text-gray-200 font-medium">Fetching weather...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="backdrop-blur-xl bg-red-500/20 border border-red-500/50 rounded-3xl p-6 text-red-200 font-semibold">
            {error}
          </div>
        )}

        {weather && !loading && (
          <div className="backdrop-blur-xl bg-gradient-to-br from-sky-600 to-cyan-600 rounded-3xl p-10 text-white shadow-2xl border border-white/20 overflow-hidden relative">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-transparent"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <MapPin className="w-7 h-7" />
                    <h2 className="text-5xl font-black">{weather.name}</h2>
                  </div>
                  <p className="text-xl text-sky-100 capitalize font-light">
                    {weather.weather[0].description}
                  </p>
                </div>
                {weather.weather[0].icon && (
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="w-28 h-28 drop-shadow-xl"
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 text-sky-100 text-sm mb-2">
                    <Compass className="w-5 h-5" />
                    <span className="font-medium">Temperature</span>
                  </div>
                  <p className="text-5xl font-black">{Math.round(weather.main.temp)}°C</p>
                </div>
                <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center gap-2 text-sky-100 text-sm mb-2">
                    <Droplets className="w-5 h-5" />
                    <span className="font-medium">Humidity</span>
                  </div>
                  <p className="text-5xl font-black">{weather.main.humidity}%</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
