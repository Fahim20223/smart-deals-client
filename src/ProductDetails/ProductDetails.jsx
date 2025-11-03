import React, { use, useEffect, useRef, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import Swal from "sweetalert2";

const ProductDetails = () => {
  const [bids, setBids] = useState([]);

  const { user } = use(AuthContext);
  // const product = useLoaderData();
  const { _id: productId } = useLoaderData();
  // console.log(product);
  const bidModalRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/bids/${productId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("bids for this product", data);
        setBids(data);
      });
  }, [productId]);

  const handleBidModalOpen = () => {
    bidModalRef.current.showModal();
  };
  const handleBidSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const bid = e.target.bid.value;

    console.log(productId, name, email, bid);

    const newBid = {
      product: productId,
      buyer_name: name,
      buyer_email: email,
      buyer_image: user?.photURL,
      bid_price: bid,
      status: "pending",
    };

    fetch("http://localhost:3000/bids", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newBid),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          bidModalRef.current.close();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your bid has been placed",
            showConfirmButton: false,
            timer: 1500,
          });
          //add the new bid to the state
          newBid._id = data.insertedId;
          const newBids = [...bids, newBid];
          newBids.sort((a, b) => b.bid_price - a.bid_price);
          setBids(newBids);
        }
        console.log("after place bid ", data);
      });
  };
  return (
    <div>
      <div>
        <button onClick={handleBidModalOpen} className="btn btn-accent">
          I want to buy The product
        </button>

        {/* Open the modal using document.getElementById('ID').showModal() method */}

        <dialog
          ref={bidModalRef}
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Give the best offer!</h3>
            <p className="py-4">Offer something seller can not resist</p>
            <form onSubmit={handleBidSubmit}>
              <fieldset className="fieldset">
                {/* Name */}
                <label className="label">Name</label>
                <input
                  name="name"
                  type="text"
                  className="input"
                  defaultValue={user?.displayName}
                  readOnly
                />
                {/* Email */}
                <label className="label">Email</label>
                <input
                  name="email"
                  type="email"
                  className="input"
                  defaultValue={user?.email}
                  readOnly
                />
                <label className="label">Bid</label>
                <input
                  type="text"
                  name="bid"
                  className="input"
                  placeholder="Your Bid"
                />

                <button className="btn btn-neutral mt-4">Place your bid</button>
              </fieldset>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
      <div>
        <h3 className="text-3xl ">
          Bids for this product:{" "}
          <span className="text-primary">{bids.length}</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>SL No.</th>
                <th>Buyer Name</th>
                <th>Buyer Email</th>
                <th>Bid Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {bids.map((bid, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{bid.buyer_name}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {bid.buyer_email}
                    <br />
                  </td>
                  <td>$ {bid.bid_price}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </th>
                </tr>
              ))}
              {/* row 2 */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
