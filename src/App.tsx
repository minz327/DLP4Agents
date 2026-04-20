import { useState } from 'react'
import { PolicyProvider } from './context/PolicyContext'
import TopBar from './components/TopBar'
import Sidebar from './components/Sidebar'
import PolicyList from './components/PolicyList'
import PolicyWizard from './components/PolicyWizard'
import CreatePolicyModal from './components/CreatePolicyModal'
import './App.css'

function App() {
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
    <PolicyProvider>
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
    </PolicyProvider>
  )
}

export default App
