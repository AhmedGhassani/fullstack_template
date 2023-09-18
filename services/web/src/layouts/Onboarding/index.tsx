import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

function Onboarding() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="w-2/3 my-20 mx-auto flex flex-col items-center">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default Onboarding;
