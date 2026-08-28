import { Link } from 'react-router-dom';
import SearchOrder from '../order/SearchOrder';
import Username from '../user/Username';

function Header() {
  return (
    <div>
      <header className=" flex items-center  justify-between bg-yellow-400 uppercase px-4 py-3 border-b font-pizza border-stone-200 sm:px-6">
        <Link to="/" className="tracking-widest">
          Fast React Pizza Co.
        </Link>
        <SearchOrder />

        <Username />
      </header>
    </div>
  );
}

export default Header;
