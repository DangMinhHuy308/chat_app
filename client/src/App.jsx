import './App.css'

// eslint-disable-next-line no-unused-vars
import Login from './pages/login/SignIn'
import SignUp from './pages/signup/SignUp'
import Home from './pages/home/Home'
function App() {


  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      {/* <Login/> */}
      {/* <SignUp /> */}
      <Home />
    </div>
  )
}

export default App
