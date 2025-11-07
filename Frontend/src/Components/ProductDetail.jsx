import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import StarRatings from 'react-star-ratings';
import { useDispatch, useSelector } from "react-redux";
import { addItem, addCartItemDB, calculateTotalQuantity} from "../utils/cartSlice";
import loader from '../assets/spinner.gif'
import { fetchProductByID } from "../utils/productDataSlice";


function ProductDetail(){

   const dispatch = useDispatch();
   const product = useSelector(state => state.products);
   const isUserLoggedIn = useSelector(state => state.users.isLogin);
   const detailItem = product.product;

   // getting id from url
   const params = useParams();

  //  const [detailItem, setDetailItem] = useState({});

    useEffect(() => {
            dispatch(fetchProductByID(params.id));
    }, [dispatch]);


    function handleProductDetailAddToCart(){
      if(isUserLoggedIn){
        dispatch(addItem(detailItem));
        dispatch(addCartItemDB(detailItem));
        dispatch(calculateTotalQuantity());
      }else{
        alert("Please login first to add item to cart!!")
      }
    }

    //////// creating logic for set size of star ratings ///////////
    const [starSize, setStarSize] = useState('20px');

    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 480) {
            setStarSize("16px");
        } else if (window.innerWidth < 768) {
            setStarSize("20px");
        } else {
            setStarSize("25px");
        }
       };

        handleResize(); // set initial size
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if(product.loading){
                return (
                    <div className="fetch_error_box">
                      <img src={loader} alt="loader icon" />
                    </div>
                )
    }
    
    return (
        <div className="productDetail_component">
          <div className="productDetail_container">
            <div className="productDetail_image_box">
              {detailItem?.images && <img src={detailItem?.images[0]} alt="" />}
            </div>
            <div className="productDetail_content_box">
               <div className="productDetail_content_inner_container">
                  <div className="productDetail_box_1">
                    <p className="productDetail_title">{detailItem?.title}</p>
                    <p className="productDetail_price">$ {detailItem?.price}</p>
                    <div>
                    <StarRatings
                        rating={detailItem?.rating}
                        starRatedColor="gold"
                        numberOfStars={5}
                        starDimension={starSize}
                        starSpacing="5px"
                        name="rating"
                        className="starRatings"
                    />
                    </div>
                    <button onClick={handleProductDetailAddToCart} className="productDetail_addToCart_btn">Add to cart</button>
                  </div>
                  
                  <div className="productDetail_box_2">
                    <p className="productDetail_description">{detailItem?.description}</p>
                    <p className="productDetail_returnPolicy">- {detailItem?.returnPolicy}</p>
                    <p className="productDetail_warranty">- {detailItem?.warrantyInformation}</p>
                    <p className="productDetail_shippingInfo">- {detailItem?.shippingInformation}</p>
                    <p className="productDetail_availabilityStatus">{detailItem?.availabilityStatus}</p>
                  </div>
                </div>

            </div>
          </div>
        </div>
    )
}

export default ProductDetail;