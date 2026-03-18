import React from 'react'
import style from "./ProductCard.module.css"
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useToast } from '@chakra-ui/react'

const ProductCard = ({_id,name,price,images}) => {
  // Hover functionality disabled — image will not change on hover
  // const [hover,setHover] = useState(false);
  // const mouseEnterFn = ()=>{ setHover(true); }
  // const mouseLeaveFn = ()=>{ setHover(false); }
  const hover = false;
  const toast = useToast();
  const url = "https://fashionology-omega.vercel.app";

  const handleAdd = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const userData = JSON.parse(localStorage.getItem("userData")) || null;
    if (!userData) {
      toast({ title: "Please login to add products to cart", status: "error", duration: 3000, isClosable: true });
      return;
    }

    try {
      const res = await axios.get(`${url}/products/${_id}`);
      const product = res.data;
      const cartProduct = {
        name: product.name,
        rating: product.rating,
        price: product.price,
        size: product.sizes && product.sizes.length ? product.sizes[0] : "",
        color: product.color,
        mainCategory: product.mainCategory,
        subCategory: product.subCategory,
        images: product.images,
        brand: product.brand,
        description: product.description,
      };

      // check existing cart to prevent duplicate (match by name+size)
      try {
        const cartRes = await axios.get(`${url}/cart`, { headers: { Authorization: `Bearer ${userData.token}` } });
        const existing = Array.isArray(cartRes.data) ? cartRes.data : [];
        const already = existing.some((item) => item.name === cartProduct.name && item.size === cartProduct.size);
        if (already) {
          toast({ title: "Product already in cart", status: "info", duration: 2500, isClosable: true });
          return;
        }
      } catch (err) {
        console.warn("Could not read cart before adding", err);
      }

      await axios.post(`${url}/cart/add`, cartProduct, {
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${userData.token}` },
      });

      toast({ title: "Product added to cart", status: "success", duration: 3000, isClosable: true });
    } catch (err) {
      console.error(err);
      toast({ title: "Could not add to cart", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <Link to={`/productpage/${_id}`}>
    <div className={style.cardContainer}>
      {/* image remains static; hover image change disabled */}
      <img className={style.cardImage} src={images && images[0]} alt={name} />
      <div className={style.cardDetails}>
        <div className={style.infoRow}>
          <h4 className={style.cardName}>{name}</h4>
          <p className={style.cardPrice}>${price}</p>
        </div>
        <button className={style.addBtn} onClick={handleAdd}>Add</button>
      </div>
    </div>
    </Link>
  )
}

export default ProductCard;
