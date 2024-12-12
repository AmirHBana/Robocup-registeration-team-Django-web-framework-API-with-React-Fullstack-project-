import Sidebar from "./Sidebar.jsx";
import DefaultImage from "../../assets/StyleForm/default-image.jpg";
import { useEffect, useState } from "react";
import apiInstance from "../../utils/axios.js";

function ObservHotelArrengedByAdmin() {
  const [hotelInformation, setHotelInformation] = useState([]);

  useEffect(() => {
    apiInstance.get("hotel/").then((res) => {
      setHotelInformation(res.data);
    });
  }, []);


  return (
    <>
      <div className="formbold-main-wrapper">
        <Sidebar />
        <div className="formbold-form-wrapper">
          {hotelInformation.length > 0 && (
            <>
              <img
                className="w-100"
                style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: '45%' }}
                src={hotelInformation[0]?.image ? hotelInformation[0]?.image : DefaultImage}
                alt="form-screen"
              />
              <br />
              <br />
              <div>
                <div className="formbold-form-title">
                  <h2 className="">مشاهده اطلاعات هتل (اسکان)</h2>
                </div>

                <br />
                <div className="formbold-input-flex">
                  <div>
                    <label htmlFor="title" className="formbold-form-label">
                      نام هتل
                    </label>
                    <h5 id="title" className="formbold-form-input">
                      {hotelInformation[0]?.title}
                    </h5>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="formbold-form-label">
                    توضیحات در مورد هتل
                  </label>
                  <h5 id="description" className="formbold-form-input">
                    {hotelInformation[0]?.description}
                  </h5>
                </div>

                <br />
                <div className="formbold-input-flex">
                  <div>
                    <label htmlFor="price_per_night" className="formbold-form-label">
                      قیمت به ازای هرشب
                    </label>
                    <h5 id="country" className="formbold-form-input">
                      {hotelInformation[0]?.price_per_night}{" "}
                      <h5 className="text-success">تومان</h5>
                    </h5>
                  </div>
                </div>
                <div className="formbold-input-flex">
                  <div>
                    <label htmlFor="price_per_night" className="formbold-form-label">
                      تاریخ شروع اقامت
                    </label>
                    <h5 id="country" className="formbold-form-input">
                      {hotelInformation[0]?.datestart}
                    </h5>
                  </div>
                  <div>
                    <label htmlFor="price_multi_nights" className="formbold-form-label">
                      تاریخ پایان اقامت
                    </label>
                    <h5 id="price_multi_nights" className="formbold-form-input">
                      {hotelInformation[0]?.dateend}
                    </h5>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ObservHotelArrengedByAdmin;
