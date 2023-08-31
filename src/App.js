import './App.css';
import Mainbody from './layout/main-body/Mainbody';
import Footer from './layout/navbar/Footer';
import Navbar from './layout/navbar/Navbar';
import Subheader from './layout/navbar/Subheader';

function App() {
  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <Subheader />
      <div className='flex-grow-1'>
        <Mainbody />
      </div>
      <Footer />
    </div>
  );
}

export default App;
