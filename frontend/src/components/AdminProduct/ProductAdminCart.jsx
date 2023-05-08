import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { deleteProduct } from '../../Redux/productsReducers/action'
import { useDispatch } from 'react-redux'

const ProductAdminCart = ({
  name,
  rating,
  price,
  sizes,
  quantity,
  color,
  mainCategory,
  subCategory,
  images,
  brand,
  description,
  id, 
  
  }) => {
    
    // const dispatch = useDispatch()

    // const handleDelete = (id) => {
    //   if(window.confirm("Are you wanted to delete the product?")){
    //     dispatch(deleteProduct(id))
    //   }
    // };
  
  return (
  
    <DIV>
     <div> 
      <img src={images[0]} alt={name}/>
      <p>Title: {name}</p>
      <h3>Rating: {rating}</h3>
      <h3>Price: {price}</h3>
      {/* <p>Sizes: {sizes}</p> */}
      <select>
        <option>Sizes: {sizes[0]}</option>
        <option>Sizes: {sizes[1]}</option>
        <option>Sizes: {sizes[2]}</option>
        <option>Sizes: {sizes[3]}</option>
        <option>Sizes: {sizes[4]}</option>
        <option>Sizes: {sizes[5]}</option>
      </select>
      <p>Quantity: {quantity}</p>
      <p>Color: {color}</p>
      <p>MainCategory: {mainCategory}</p>
      <p>SubCategory: {subCategory}</p>
      <p>Brand: {brand}</p>
      <p>Description: {description}</p>
      <button style={{paddingRight:'50px', color: "green"}}>
        <Link to={`/edit/${id}`}>Edit</Link>
      </button>
      <button style={{color: 'red', paddingLeft:'20px'}}
              // onClick={() => handleDelete(id)}
              >DELETE</button>
      </div>
    </DIV>
  )
}

export default ProductAdminCart

const DIV = styled.div`
border: 1px solid gray;
padding: 10px;
width: 300px;


img{
  width:100%;
  height: auto
}
`