import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatDateToShortMonth } from "@/app/utils/dateFormat";

const PaymentCom = ({data}) => {
  console.log(data)
  const isSuccess = data.status=="succeeded"?true:false;
  const paymentDetails = {
    amount: data.amount,
    refNo: data.refNo,
    paymentDate: formatDateToShortMonth(data.paymentDate),
    reason: isSuccess ? "All Good." : "data.status"
  };

  return (
    <div className="overview-area ptb-100">
      <div className="container">
        <div className="overview-box it-overview">
          {isSuccess ? (
            <>
              <div
                className="overview-image"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
                data-aos-once="true"
              >
                <div className="image">
                  <Image
                    src="/images/services/it-service1.png"
                    alt="success image"
                    width="852"
                    height="580"
                  />
                </div>
              </div>

              <div className="overview-content">
                <div className="content">
                  <h2>Payment Successful</h2>
                  <p>Payment Successful description</p>
                  <ul className="features-list">
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Amount: {paymentDetails.amount}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Ref No.: {paymentDetails.refNo}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Payment Date: {paymentDetails.paymentDate}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Reason: {paymentDetails.reason}
                      </span>
                    </li>
                  </ul>
                  <div className="rm-btn">
                    <Link href={`/course/`} className="default-btn">
                      Go To Course <span></span>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="overview-content">
                <div className="content">
                  <h2>Payment Failed</h2>
                  <p>Payment failed description</p>
                  <ul className="features-list">
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Amount: {paymentDetails.amount}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Ref No.: {paymentDetails.refNo}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Payment Date: {paymentDetails.paymentDate}
                      </span>
                    </li>
                    <li>
                      <span>
                        <i className="bx bxs-badge-check"></i> Reason: {paymentDetails.reason}
                      </span>
                    </li>
                  </ul>
                  <div className="rm-btn">
                    <Link href={`/course/`} className="default-btn">
                      Buy Again <span></span>
                    </Link>
                  </div>
                </div>
              </div>

              <div
                className="overview-image"
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-delay="100"
                data-aos-once="true"
              >
                <div className="image">
                  <Image
                    src="/images/services/it-service2.png"
                    alt="failure image"
                    width="770"
                    height="582"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentCom;
