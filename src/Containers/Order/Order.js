import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiRupee } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Layout } from "../../Components/Layout";
import { Card } from "../../Components/Card";
import { getOrders } from "../../actions/userAction";
import { Breed } from "../../Components/MaterialUI/material";
import "./Order.css";
import { generatePublicUrl } from "../../urlConfig";


export const Order = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  console.log(user);

  return (
    <Layout>
      <div style={{ maxWidth: "1160px", margin: "5px auto" }}>
        <Breed
          breed={[
            { name: "Home", href: "/" },
            { name: "My Account", href: "/account" },
            { name: "My Orders", href: "/account/orders" },
          ]}
          breedIcon={<IoIosArrowForward />}
        />
        {user.orders.map((order) => {
          return order.items.map((item) => (
            <Card style={{ display: "block", margin: "5px 0" }}>
              <Link
                to={`/order_details/${order._id}`}
                className="orderItemContainer"
              >
                <div className="orderImgContainer">
                  <img
                    className="orderImg"
                    src={ generatePublicUrl(item.productId.pictures[0].img)}
                  />
                </div>
                <div className="orderRow">
                  <div className="orderName">{item.productId.name}</div>
                  <div className="orderPrice">
                    <BiRupee />
                    {item.payablePrice}
                  </div>
                  <div>{order.paymentStatus}</div>
                </div>
              </Link>
            </Card>
          ));
        })}
      </div>
    </Layout>
  );
};



// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getOrders } from '../../actions/userAction'
// import { Card } from '../../Components/Card'
// import { Layout } from '../../Components/Layout'
// import { generatePublicUrl } from '../../urlConfig';
// import "./Order.css";

// export const Order = (props) => {
//     const dispatch = useDispatch();
//     const user = useSelector(state => state.user);
//     useEffect(() => {
//         dispatch(getOrders())
//     }, [])
//     return (
//         <Layout>
//             {
//                 user.orders.map(order => {
//                     return order.items.map(item =>
//                         <Card style={{ maxWidth: "1200px", margin: "5px auto" }}>
//                             <div className="orderItemContainer">
//                                 <div style={{ width: 80, height: 80, textAlign: "center", overflow: "hidden" }}><img style={{ maxWidth: 80, maxHeight: 80 }} src={generatePublicUrl(item.productId.pictures[0].img)} alt="" /></div>
//                                 <div style={{ display: "flex", justifyContent: "space-between"}}>
//                                     <div>{item.productId.name}</div>
//                                     <div>{item.payablePrice}</div>
//                                     <div>{order.paymentStatus}</div>
//                                 </div>
//                             </div>
//                         </Card>
//                     )
//                 })
//             }

//         </Layout>
//     )
// }
