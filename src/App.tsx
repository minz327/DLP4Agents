import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { PolicyProvider } from './context/PolicyContext'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import PolicyList from './components/PolicyList'
import PolicyWizard from './components/PolicyWizard'
import CreatePolicyModal from './components/CreatePolicyModal'
import ReportPage from './components/ReportPage'
import './App.css'

function AuthoringHome() {
  const [view, setView] = useState<'list' | 'wizard'>('list')
  const [showModal, setShowModal] = useState(false)

  const handleCreatePolicy = () => {
    setShowModal(true)
  }

  const handleModalSelect = (_type: 'enterprise' | 'inline') => {
    setShowModal(false)
    setView('wizard')
  }

  return (
    <>
      <div className="app-shell">
        <TopBar />
        <div className="app-body">
          {view === 'list' && <Sidebar />}
          <main className="app-main">
            {view === 'list' ? (
              <PolicyList onCreatePolicy={handleCreatePolicy} />
            ) : (
              <PolicyWizard onCancel={() => setView('list')} />
            )}
          </main>
        </div>
      </div>
      {showModal && (
        <CreatePolicyModal
          onClose={() => setShowModal(false)}
          onSelect={handleModalSelect}
        />
      )}
    </>
  )
}

function ReportShell() {
  return (
    <div className="app-shell">
      <TopBar />
      <div className="app-body">
        <Sidebar />
        <main className="app-main app-main-report">
          <ReportPage />
        </main>
      </div>
    </div>
  )
}

function App() {
  return (
    <PolicyProvider>
      <Routes>
        <Route path="/" element={<AuthoringHome />} />
        <Route path="/report" element={<ReportShell />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PolicyProvider>
  )
}

export default App
