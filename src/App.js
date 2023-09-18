import logo from './logo.svg';
import './App.css';
import DOBInput from './components/DOBInput';
import AgeDisplay from './components/AgeDisplay';
import Evaluate from './components/Evaluate';


function App() {


  return (
    <div className="App">
      <main>
        <DOBInput />
        <Evaluate />
        <AgeDisplay />
      </main>
    </div>
  );
}

export default App;
