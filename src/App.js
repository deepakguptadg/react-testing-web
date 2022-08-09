import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Pages/Dashboard';
import Header from './Components/Inc/Header';
import Sidebar from './Components/Inc/Sidebar';
import Incident from './Components/Pages/Incident';
import PageNotFound from './Components/Pages/PageNotFound';
import IncidentDetails from './Components/Pages/IncidentDetails';
import Property from './Components/Pages/Property';
import ThemeSetting from './Components/Inc/ThemeSetting';
import Login from './Components/Auth/Login';
import Name from './Components/Pages/Name';
import View from './Components/Pages/View';
import Agency from './Components/Pages/Agency';
import Utility from './Components/Pages/Utility';
import Auth from './Auth';
import ContextProvider from './Context/ContextProvider';


function App() {
  return (
    <>

      <ContextProvider>
        <BrowserRouter >
          <div id="main_content">
            <Sidebar />
            <ThemeSetting />
            <div className="page">
              <Header />
              <Routes>
                <Route exact path="/" element={<Auth cmp={Dashboard} />} />
                <Route exact path="/incident" element={<Auth cmp={Incident} />} />
                <Route exact path="/incidentDetails/:IncidentID" element={<Auth cmp={IncidentDetails} />} />
                <Route exact path="/name" element={<Auth cmp={Name} />} />
                <Route exact path="/property" element={<Auth cmp={Property} />} />
                <Route exact path="/view" element={<Auth cmp={View} />} />
                <Route exact path="/agency" element={<Auth cmp={Agency} />} />
                <Route exact path="/utility" element={<Auth cmp={Utility} />} />
                <Route exact path="/login" element={<Login />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
