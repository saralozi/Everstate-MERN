import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Team from './components/Team';
import TeamReadOne from './components/TeamReadOne';
import TeamUpdate from './components/TeamUpdate';
import Signup from './components/Signup';
import Login from './components/Login';
import { UserContextProvider } from './components/UserContext';  
import TeamAdmin from './components/TeamAdmin';
import Rent from './components/Rent';
import RentAdmin from './components/RentAdmin';
import RentReadOne from './components/RentReadOne';
import RentUpdate from './components/RentUpdate';
import RentDetail from './components/RentDetail';
import BuySearch from './components/BuySearch';
import BuyReadOne from './components/BuyReadOne';
import BuyAdmin from './components/BuyAdmin';
import BuyUpdate from './components/BuyUpdate';

function App() {
  return (
    <div>
      <UserContextProvider> 
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path='/add' element={<TeamAdmin />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/readone/:id" element={<TeamReadOne />} />
            <Route path="/update/:id" element={<TeamUpdate />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/addRent" element={<RentAdmin />} />
            <Route path="/readoneRent/:id" element={<RentReadOne />} />
            <Route path="/updateRent/:slug" element={<RentUpdate />} />
            <Route path="/rentDetail/:slug" element={<RentDetail />} />
            <Route path="/buy" element={<BuySearch />} />
            <Route path="/addbuy" element={<BuyAdmin />} />
            <Route path="/buyreadOne/:slug" element={<BuyReadOne />} />
            <Route path="/buyupdate/:slug" element={<BuyUpdate />} />

  


          </Routes>
          <Footer />
        </BrowserRouter>
      </UserContextProvider>
    </div>
  );
}

export default App;
