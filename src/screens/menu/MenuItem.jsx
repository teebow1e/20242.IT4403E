import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import ProductDetail from '../../components/ProductDetail';

function MenuItem({ path, type, image, category }) {
  const [showModal, setShowModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e) => {
    if (path) return;           // let <Link> handle navigation

    e.preventDefault();         // open modal for items without a path
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const Container = path ? Link : 'div';
  const toProps = path ? { to: path } : {};

  return (
    <>
      <Container
        {...toProps}
        className="flex flex-col items-center transition-transform duration-300 cursor-pointer hover:opacity-90 group"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative mb-3 overflow-hidden rounded-full">
          <img
            src={image}
            alt={type}
            className={`rounded-full object-cover w-[120px] h-[120px] transition-transform duration-500 ${isHovered ? 'scale-105' : 'scale-100'
              }`}
          />
        </div>

        {/* replaced custom color class with explicit Meowbucks green hex */}
        <h3 className="text-center text-base font-medium text-gray-800 group-hover:text-[#006241] transition-colors duration-300">
          {type}
        </h3>
      </Container>

      {showModal && (
        <Modal isOpen={showModal} onClose={closeModal}>
          <ProductDetail
            item={{ type, image }}
            category={category}
            onClose={closeModal}
          />
        </Modal>
      )}
    </>
  );
}

export default MenuItem;
