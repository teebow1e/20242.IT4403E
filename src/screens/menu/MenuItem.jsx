import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../../components/Modal';
import ProductDetail from '../../components/ProductDetail';

function MenuItem({ path, type, image, category }) {
  const [showModal, setShowModal] = useState(false);

  const handleClick = (e) => {
    if (path) {
      // If it has a path, let the Link component handle it
      return;
    }

    // Otherwise, open the modal
    e.preventDefault();
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const Container = path ? Link : 'div';
  const toProps = path ? { to: path } : {};

  return (
    <>
      <Container
        {...toProps}
        className="flex items-center gap-[10px] w-[240px] md:w-[260px] cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={image}
          alt={type}
          className="rounded-full object-contain w-[80px] md:w-[120px]"
        />
        <h4 className="text-[16px] md:text-[18px] leading-[1.5] font-semibold text-black/90">
          {type}
        </h4>
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
