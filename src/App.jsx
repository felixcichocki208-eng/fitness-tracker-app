import React, { useState, useEffect } from 'react'
import Dashboard from './pages/Dashboard'
import BMICalculator from './pages/BMICalculator'
import CalorieTracker from './pages/CalorieTracker'
import StepCounter from './pages/StepCounter'
import MealPlan from './pages/MealPlan'
import Stats from './pages/Stats'
import { useLocalStorage } from './hooks/useLocalStorage'

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [userData, setUserData] = useLocalStorage('fitnessUserData', {
    age: 25,
    gender: 'M',
    height: 180,
    weight: 75,
    activityLevel: 'moderate',
  })
  const [theme, setTheme] = useState('dark')

  const pages = {
    dashboard: <Dashboard userData={userData} />,
    bmi: <BMICalculator userData={userData} setUserData={setUserData} />,
    calories: <CalorieTracker userData={userData} />,
    steps: <StepCounter />,
    meals: <MealPlan userData={userData} />,
    stats: <Stats userData={userData} />,
  }

  const navItems = [
    { id: 'dashboard', label: 'Panel', icon: '📊' },
    { id: 'bmi', label: 'BMI', icon: '⚖️' },
    { id: 'calories', label: 'Kalorie', icon: '🔥' },
    { id: 'steps', label: 'Kroki', icon: '🚶' },
    { id: 'meals', label: 'Plan', icon: '🍽️' },
    { id: 'stats', label: 'Statystyki', icon: '📈' },
  ]

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-4xl">💪</div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Fitness Tracker</h1>
              <p className="text-xs text-slate-400">Twój osobisty asystent fitness</p>
            </div>
          </div>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="glass-sm p-2 hover:bg-slate-400/10 transition-all"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 pb-32">
        {pages[currentPage]}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass border-t">
        <div className="max-w-7xl mx-auto px-4 flex justify-around items-center">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`flex-1 py-4 px-4 text-center transition-all duration-300 ${
                currentPage === item.id
                  ? 'text-blue-400 bg-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200'
              } border-b-2 ${currentPage === item.id ? 'border-blue-400' : 'border-transparent'}`}
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs font-semibold">{item.label}</div>
            </button>
          ))}
        </div>
      </nav>
    </div>
  )
