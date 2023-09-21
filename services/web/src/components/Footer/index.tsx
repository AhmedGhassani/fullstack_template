import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="w-full mt-auto flex flex-row justify-between">
      <Link to="/">
        {/* <img src={logo} alt="dashboard logo" className="mr-4 ml-2" /> */}
        <h1 className="mr-4 ml-2">Footer</h1>
      </Link>
    </div>
  );
}

export default Footer;
