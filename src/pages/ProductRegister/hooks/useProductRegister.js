import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../api';

export default function useProductRegister() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    price: '0',
    content: ''
  });
  
  // 미리보기용 URL과 실제 백엔드에 전송할 파일 객체를 분리 관리합니다.
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 10MB 용량 제한 체크
    if (file.size > 10 * 1024 * 1024) {
      alert('이미지 용량은 최대 10MB를 초과할 수 없습니다.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim() || formData.title.length > 100) {
      newErrors.title = '제목은 필수이며 1~100자 사이여야 합니다.';
    }
    const numericPrice = Number(formData.price);
    if (formData.price === '' || Number.isNaN(numericPrice) || numericPrice < 0) {
      newErrors.price = '가격은 0 이상의 정수여야 합니다.';
    }
    if (formData.content.length > 10000) {
      newErrors.content = '내용은 10,000자 이내로 입력해주세요.';
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
      // 명세서 규격에 맞추어 Multipart/Form-Data 객체 생성
      const data = new FormData();

      // 1. request 파트: JSON 데이터를 blob 형태로 추가 및 타입 명시
      const requestData = {
        title: formData.title,
        content: formData.content,
        price: parseInt(formData.price, 10)
      };
      
      data.append(
        'request',
        new Blob([JSON.stringify(requestData)], { type: 'application/json' })
      );

      // 2. image 파트: 선택된 파일이 있을 경우 파일 객체 추가
      if (imageFile) {
        data.append('image', imageFile);
      }

      await createProduct(data);
      alert('상품이 성공적으로 등록되었습니다.');
      navigate('/products');
    } catch (err) {
      console.error(err);
      if (err.status === 413) {
        setError('이미지 용량이 너무 큽니다. (최대 10MB)');
      } else if (err.status === 400) {
        setError('입력하신 정보를 다시 확인해주세요. (유효성 검증 실패)');
      } else if (err.status === 401 || err.status === 403) {
        setError('인증 정보가 만료되었습니다. 다시 로그인 해주세요.');
      } else {
        setError('상품 등록 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    imagePreview,
    loading,
    error,
    errors,
    isModalOpen,
    setIsModalOpen,
    handleChange,
    handleImageChange,
    handleRemoveImage,
    handleSubmit,
    navigate
  };
}