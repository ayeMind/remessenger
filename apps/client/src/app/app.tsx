import WithLogin from './pages/WithLogin/WithLogin';
import WithoutLogin from './pages/WithoutLogin/WithoutLogin';
import { useLogin } from './pages/store';

export function App() {
  const { isLogged, user } = useLogin();
  return <div>{isLogged ? <WithLogin user={user} /> : <WithoutLogin />}</div>;
}

export default App;
