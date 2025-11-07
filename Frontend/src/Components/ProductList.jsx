import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import loader from '../assets/spinner.gif'
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../utils/productDataSlice";
import { getCartItemsDB } from "../utils/cartSlice";

function ProductList(){

    const [items, setItems] = useState([]);

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {
        dispatch(fetchProductData());
        dispatch(getCartItemsDB());
    }, [dispatch])

    useEffect(() => {
        if (products.data?.length) {
        setItems(products.data);
        }
    }, [products.data]);

    // handling search filter
    function handleSearchProduct(value){
        const filteredItems = products?.data?.filter(item => item.title.toLowerCase().includes(value.toLowerCase()));
        setItems(filteredItems)
    }

    if(products.loading){
        return (
            <div className="fetch_error_box">
                <img src={loader} alt="loader icon" />
            </div>
        )
    }

    if(products.error){
        return (
            <div className="fetch_error_box">
                <p>{products.error}</p>
            </div>
        )
    }

    return (
        <div className="productList_component" id="productList_id">
            <input type="text" onChange={(e) => handleSearchProduct(e.target.value)} className="productList_filter" placeholder="Search by Product name"/>
            <div className="productList_container">
                {items?.map((item) => {
                        return <ProductItem item={item} key={item.id}/>
                })}
            </div>
        </div>
    )
}

export default ProductList;