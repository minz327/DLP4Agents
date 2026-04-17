import { PolicyProvider } from './context/PolicyContext'
import PolicyWizard from './components/PolicyWizard'
import './App.css'

function App() {
  return (
    <PolicyProvider>
      <div className="app">
        <header className="app-header">
          <h1>DLP Policy Setup</h1>
        </header>
        <PolicyWizard />
      </div>
    </PolicyProvider>
  )
}

export default App
