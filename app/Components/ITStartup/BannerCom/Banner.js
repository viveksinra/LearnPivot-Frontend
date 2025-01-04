import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";
import TypeWriterCom from "./TypeWriterCom";

const Banner = () => {
  // To open the lightbox change the value of the "toggler" prop.
  const [toggler, setToggler] = useState(false);

  useEffect(() => {
    setToggler(true); // Open the lightbox when the component mounts
  }, []);

  return (
    <>
      <div className="it-banner">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="container mt-50">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="banner-content">
                    <h1
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-delay="100"
                      className="animated-text"
                      style={{textSize:"10px"}}
                    >
                Empowering young Minds 
                    </h1>
                    {/* <TypeWriterCom /> */}
                    <p
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-delay="200"
                    >
                      Join our platform where I, as an experienced educator,
                      guide and inspire students on their journey of discovery.
                      Parents can book classes and mock tests to help their
                      children succeed on their journey to academic success.
                    </p>

                    <div
                      className="banner-btn"
                      data-aos="fade-up"
                      data-aos-duration="800"
                      data-aos-delay="300"
                    >
                      <Link href="/course" className="default-btn-course mr-3">
                      COURSES <span></span>
                      </Link>
                      <Link
                        href="/mockTest"
                        className="default-btn-mocktest mr-3"
                      >
                        MOCK TESTS
                        <span></span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <Swiper
                    navigation={true}
                    modules={[Autoplay, Navigation]}
                    autoplay={{
                      delay: 6500,
                      disableOnInteraction: true,
                      pauseOnMouseEnter: true,
                    }}
                    className="it-banner-image"
                  >
                    <SwiperSlide>
                      <div className="animate-image">
                        <Image
                          src="https://res.cloudinary.com/qualifier/image/upload/v1725734488/LearnPivot/animate-img_lca0b4.png"
                          alt="animate image 1"
                          width={650}
                          height={650}
                          priority // Mark above-the-fold images with priority
                          quality={75} // Adjust quality if needed
                          sizes="(max-width: 768px) 100vw, 50vw" // Responsive size hint
                        />
                      </div>
                    </SwiperSlide>

                    <SwiperSlide>
                      <div className="animate-image">
                        <Image
                          src="https://res.cloudinary.com/qualifier/image/upload/v1725734488/LearnPivot/animate-img2_n11uku.jpg"
                          alt="animate image 2"
                          width={650}
                          height={650}
                          priority
                          quality={75}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shape Images */}
        {/* (existing shape images code) */}
      </div>

      {/* Include the custom mobile view CSS */}
      <style jsx>{`
        @media (max-width: 768px) {
          .banner-btn a {
            display: block;
            margin-bottom: 15px;
          }

          .banner-btn a:last-child {
            margin-bottom: 0;
          }
        }
      `}</style>
    </>
  );
};

export default Banner;
