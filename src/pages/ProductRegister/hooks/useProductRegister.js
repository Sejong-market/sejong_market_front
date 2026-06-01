import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api';

export default function useProductRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '도서',
    price: '0',
    description: '',
    status: '판매중',
    location: '학생회관'
  });
  const [customLocation, setCustomLocation] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'location' && errors.customLocation) {
      setErrors((prev) => ({ ...prev, customLocation: '' }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 10) {
      alert('사진은 최대 10장까지만 등록할 수 있습니다.');
      return;
    }
    const newUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...newUrls]);
    e.target.value = '';
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = '제목을 입력해주세요.';
    if (!formData.price) newErrors.price = '가격을 입력해주세요.';
    if (formData.location === '직접입력' && !customLocation.trim()) {
      newErrors.customLocation = '거래 장소를 입력해주세요.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError('');
    try {
      const finalLocation = formData.location === '직접입력' ? customLocation : formData.location;
      await createProduct({ ...formData, location: finalLocation, images });
      navigate('/products');
    } catch (err) {
      setError(err.message || '상품 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData, customLocation, setCustomLocation, images, loading, error, errors, setErrors, isModalOpen, setIsModalOpen,
    handleChange, handleImageChange, handleRemoveImage, handleSubmit, navigate
  };
}