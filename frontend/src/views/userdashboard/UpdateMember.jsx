import Sidebar from "./Sidebar.jsx";
import CompleteFormScreen from "../../assets/StyleForm/CompleteFormScreen.png";


function UpdateMember() {
    return (
        <>
          <div className="formbold-main-wrapper">
            <Sidebar />
            <div className="formbold-form-wrapper">
              <img className="w-100" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={CompleteFormScreen} alt="form-screen" />
              <br />
                <form action="https://formbold.com/s/FORM_ID" method="POST">
                    <div className="formbold-form-title">
                        <h2 className="">ویرایش اطلاعات عضو </h2>
                        <p className='text-danger'>
                            سرپرست گرامی لطفا در صورت لزوم اطلاعات عضو خود را ویرایش نمایید.
                        </p>
                    </div>

                    <br/>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="first_name" className="formbold-form-label">
                                نام
                            </label>
                            <input type="text" name="first_name" id="first_name" className="formbold-form-input"
                                  />
                        </div>
                        <div>
                            <label htmlFor="last_name" className="formbold-form-label"> نام خانوادگی </label>
                            <input type="text" name="last_name" id="last_name" className="formbold-form-input"
                                   />
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="national_code" className="formbold-form-label">
                                کدملی
                            </label>
                            <input type="number" name="national_code" id="national_code" className="formbold-form-input"
                          />
                        </div>
                        <div>
                            <label htmlFor="name_of_team" className="formbold-form-label"> تلفن همراه </label>
                            <input type="number" name="name_of_team" id="name_of_team" className="formbold-form-input"
                                  />
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="email" className="formbold-form-label">
                                ایمیل
                            </label>
                            <input type="email" name="email" id="email" className="formbold-form-input"
                                  />
                        </div>
                        <div>
                            <label htmlFor="name_of_team" className="formbold-form-label"> تاریخ تولد </label>
                            <input type="text" name="name_of_team" id="name_of_team" className="formbold-form-input"
                                   />
                        </div>
                    </div>

                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="country" className="formbold-form-label">
                                کشور
                            </label>
                            <input type="text" name="country" id="country" className="formbold-form-input"
                                   />
                        </div>
                        <div>
                            <label htmlFor="city" className="formbold-form-label"> شهر </label>
                            <input type="text" name="city" id="city" className="formbold-form-input"
                                   />
                        </div>
                    </div>
                    <div className="formbold-input-flex">
                        <div>
                            <label htmlFor="sharestan" className="formbold-form-label"> شهرستان </label>
                            <input type="text" name="sharestan" id="sharestan" className="formbold-form-input"
                                  />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="address" className="formbold-form-label"> آدرس </label>
                        <input type="text" name="address" id="address" className="formbold-form-input"
                               />
                    </div>


                    <button className="formbold-btn">ثبت و ویرایش اطلاعات</button>
                </form>
            </div>
          </div>
        </>
    )
}

export default UpdateMember