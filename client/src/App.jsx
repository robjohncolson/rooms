import { UserProvider } from './context/UserContext';
import Screen from './components/Screen';
import UserList from './components/UserList';
import ColorPicker from './components/ColorPicker';

function App() {
  return (
    <UserProvider>
      <div className="app">
        <main>
          <Screen />
          <aside>
            <ColorPicker />
            <UserList />
          </aside>
        </main>
      </div>
    </UserProvider>
  );
}

export default App; 