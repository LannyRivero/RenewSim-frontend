import './App.css';
//import Home from './pages/Home';
import TestList from './components/TestList';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-4xl font-bold text-blue-600">
        Welcome to the Renewable Energy Simulator
      </h1>
      <p className="mt-4 text-lg">Now using Tailwind CSS!</p>
      <TestList />
    </div>
  );
}

export default App;
