/* eslint-disable no-unused-vars */
import { useNavigate, useSearchParams } from "react-router-dom";
import "./Verify.css";
import ClipLoader from "react-spinners/ClipLoader";
import { useStores } from "../../contexts/storeContext";
import axios from "axios";
import { useEffect, useState } from "react";

function Verify() {
  const [searchParams, setSearchParams] = useSearchParams();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useStores();
  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post(url + "/api/order/verify", {
      success,
      orderId,
    });

    if (response.data.success) {
      navigate("/myorders");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, []);

  return (
    <div className="verify">
      <div className="verify-loading">
        <ClipLoader color="#FF6347" loading={true} size={70} />
      </div>
    </div>
  );
}

export default Verify;
