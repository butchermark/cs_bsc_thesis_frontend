import { PageRouter } from './router/PageRouter';
import { ContextProvider } from './context/Context';
import { ThemeProviderWrapper } from './context/ThemeContext';

function App() {
  return (
    <div className="app" style={{ margin: 0, padding: 0 }}>
      <ThemeProviderWrapper>
        <ContextProvider>
          <PageRouter />
        </ContextProvider>
      </ThemeProviderWrapper>
    </div>
  );
}

export default App;
