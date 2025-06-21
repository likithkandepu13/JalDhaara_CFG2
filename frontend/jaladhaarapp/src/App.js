import logo from './logo.svg';
import './App.css';
// Import our Login component to test Firebase authentication
import Login from './Components/Login';

function App() {
  return (
    <div className="App">
      {/* Replace the default React content with our Login component */}
      <Login />
    </div>
  );
}

export default App;
