import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Onboarding() {
  return (
    <div className="h-screen flex flex-col items-center">
      <Header />
      <div className="w-2/3 my-20 flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Onboarding;
