import logo from './logo.svg';
import './App.css';
import Add from './components/add.jsx';
import Table from './components/table.jsx';
import {ReactNotifications} from 'react-notifications-component';

function App() {
  return (
    <div className="App"> 
    <ReactNotifications/>
    <Add/>
    <Table/>
    </div>
  );
}

export default App;
