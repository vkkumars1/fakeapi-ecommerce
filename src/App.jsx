import { useAuth } from './contexts/AuthContext.jsx';
import { LoginPage } from './components/LoginPage.jsx';
import { ProductList } from './components/ProductList.jsx';

function App() {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <ProductList /> : <LoginPage />;
}

export default App;
