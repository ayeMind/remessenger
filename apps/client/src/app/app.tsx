import WithLogin from './pages/WithLogin/WithLogin';
import WithoutLogin from './pages/WithoutLogin/WithoutLogin';
import { useLogin } from './stores/login';

export function App() {
  const { isLogged, user } = useLogin();
  return <div>{isLogged && user ? <WithLogin /> : <WithoutLogin />}</div>;
}

export default App;
