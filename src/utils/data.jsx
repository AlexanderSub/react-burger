import { useState, useEffect } from 'react';

const useGetIngredientsData = () => {
  const [products, setProducts] = useState([]);

  const URL = 'https://norma.nomoreparties.space/api/ingredients';

  function checkResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}, ${res.statusMessage}`)
  }

  useEffect(() => {
    fetch(URL)
      .then(checkResponse)
      .then((data) => {
        setProducts(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return products;
};

export default useGetIngredientsData;