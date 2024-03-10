import { PageRouter } from './router/PageRouter';
import { ContextProvider } from './context/Context';

function App() {
  return (
    <div className="app">
      <ContextProvider>
        <PageRouter />
      </ContextProvider>
    </div>
  );
}

export default App;
