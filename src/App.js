import './App.css';
import Sign_in from './pages/Sign_in'; // use ./ when importing to prevent node_module search error
import Sign_up from './pages/Sign_up';
import ForgotPassword from './pages/Forgot_password';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import { Demo } from './pages/demo';
import {BrowserRouter, Route, Routes} from 'react-router-dom'; //all page routes nested in BrowserROuter
import KF_TechDemo from './pages/KF_TechDemo';
import { AddDevice } from './pages/AddDevice';
import { DeviceList } from './pages/DeviceList';
import ViewDetail from './pages/ViewDetail';

function App() {
  return (
    <div className="App">
      
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/KF_TechDemo' element={<KF_TechDemo />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Sign_in' element={<Sign_in />} />
          <Route path='/Sign_up' element={<Sign_up />} />
          <Route path='/Forgot_password' element={<ForgotPassword />} />
          <Route path='/demo' element={<Demo />} />
          <Route path='/AddDevice' element={<AddDevice />} />
          <Route path='/DeviceList' element={<DeviceList />} />
          <Route path='/ViewDetail' element={<ViewDetail />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
