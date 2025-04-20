import { useState } from 'react';
import { Link } from 'react-router-dom';

function MenuHeader() {
  const [index, setIndex] = useState(0);

  return (
    <div className="bg-[#f7f7f7] border border-[#edebe9] border-b-[#dbd9d7]  w-full pl-[131px] pt-[15px] pb-[10px] z-[2] max-md:relative max-[425px]:hidden">
      <div className="flex gap-[25px]">
        <Link
          className={`text-black/90 font-semibold text-[13px] pb-[5px] ${index === 0 ? 'border-b border-black' : ''}`}
          onClick={() => setIndex(0)}
        >
          All products
        </Link>
        <Link
          to="/menu/featured"
          className={`text-black/90 font-semibold text-[13px] pb-[5px] ${index === 1 ? 'border-b border-black' : ''}`}
          onClick={() => setIndex(1)}
        >
          Featured
        </Link>
        <Link className="text-black/90 font-semibold text-[13px] pb-[5px]">
          Previous Orders
        </Link>
        <Link className="text-black/90 font-semibold text-[13px] pb-[5px]">
          Favorite Products
        </Link>
      </div>
    </div>
  );
}

export default MenuHeader;
