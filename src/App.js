import './App.scss';
import NavigationBar from './components/Navigation/NavigationBar';
import { Link } from 'react-router-dom';
 
const App = () => {

  return (
    <div className="app-container">
        <NavigationBar />
        <div>
          test Link
          <button><Link to='/admin'>Go to admin</Link></button>
          <button><Link to='/users'>Go to user</Link></button>
        </div>
    </div>
  );
}

export default App;
