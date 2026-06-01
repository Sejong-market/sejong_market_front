import useProductRegister from './hooks/useProductRegister';
import ProductRegisterForm from './components/ProductRegisterForm';
import ProhibitedItemsModal from './components/ProhibitedItemsModal';
import './ProductRegister.css';

export default function ProductRegister() {
  const props = useProductRegister();
  
  return (
    <div className="product-register">
      <div className="product-register__container">
        <h2 className="product-register__title">상품 등록</h2>
        {props.error && <div className="product-register__error">{props.error}</div>}
        <ProductRegisterForm {...props} />
      </div>
      <ProhibitedItemsModal isOpen={props.isModalOpen} onClose={() => props.setIsModalOpen(false)} />
    </div>
  );
}