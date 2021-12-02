import React, { useEffect } from 'react';

const NotFoundPage = () => {
  useEffect(() => {
    alert('존재하지 않는 페이지입니다.');
    window.location.href = '/';
  }, []);

  return <></>;
};

export default NotFoundPage;
