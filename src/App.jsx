import './app/App.css'
import { TodoFeature } from './features/todo/TodoFeature'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">FDD React Project</p>
          <h1>Feature-Driven Development App</h1>
        </div>
      </header>

      <TodoFeature />
    </div>
  )
}

export default App
