import { PageRouter } from './router/PageRouter';
import { ContextProvider } from './context/Context';
import { ThemeProviderWrapper } from './context/ThemeContext';

function App() {
  return (
    <div className="app">
      <ThemeProviderWrapper>
        <ContextProvider>
          <PageRouter />
        </ContextProvider>
      </ThemeProviderWrapper>
    </div>
  );
}

export default App;
