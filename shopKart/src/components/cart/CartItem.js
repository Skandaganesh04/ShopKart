import React, { useContext } from 'react';
import { TbTrash } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { displayMoney } from '../../helpers/utils';
import cartContext from '../../contexts/cart/cartContext';
import QuantityBox from '../common/QuantityBox';


const CartItem = (props) => {

    const { id, images, title, info, finalPrice, originalPrice, quantity, path } = props;

    const { removeItem } = useContext(cartContext);

    const newPrice = displayMoney(finalPrice);
    const oldPrice = displayMoney(originalPrice);

    const removeProduct = async () => {
        try {
            removeItem(id);
            const email = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8000/api/user/products/${id}?add=false`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
            });
            if(res.status !== 201){
                throw new Error("an error in adding product");
            }
        } catch (err) {
            console.log(`an error in removing product:${err}`);
        }
    }
    return (
        <>
            <div className="cart_item">
                <figure className="cart_item_img">
                    <Link to={`${path}${id}`}>
                        <img src={images[0]} alt="product-img" />
                    </Link>
                </figure>
                <div className="cart_item_info">
                    <div className="cart_item_head">
                        <h4 className="cart_item_title">
                            <Link to={`/product-details/${id}`}>{title} {info}</Link>
                        </h4>
                        <div className="cart_item_del">
                            <span onClick={removeProduct}>
                                <TbTrash />
                            </span>
                            <div className="tooltip">Remove Item</div>
                        </div>
                    </div>

                    <h2 className="cart_item_price">
                        {newPrice} &nbsp;
                        <small><del>{oldPrice}</del></small>
                    </h2>

                    <QuantityBox itemId={id} itemQuantity={quantity} />
                </div>
            </div>
        </>
    );
};

export default CartItem;