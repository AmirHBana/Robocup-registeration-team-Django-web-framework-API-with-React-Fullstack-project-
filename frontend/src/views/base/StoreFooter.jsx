

function StoreFooter() {
    return (
        <>
            <div>
            <footer
                className="bg-light text-center text-lg-start"
                style={{marginTop: 55}}
            >
                {/* Grid container */}
                <div className="container p-4">
                    <div className="row">
                        <div
                            className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
                            <strong>راه ارتباط با ما در شبکه های اجتماعی</strong>
                        </div>
                        <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                            {/* Facebook */}
                            <a
                                className="btn btn-primary btn-sm btn-floating me-2"
                                style={{backgroundColor: "#3b5998"}}
                                href="#"
                                role="button"
                            >
                                <i className="fab fa-facebook-f"/>
                            </a>
                            {/* Twitter */}
                            <a
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{backgroundColor: "#55acee"}}
                                href="#"
                                role="button"
                            >
                                <i className="fab fa-twitter"/>
                            </a>
                            {/* Pinterest */}
                            <a
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{backgroundColor: "#c61118"}}
                                href="#"
                                role="button"
                            >
                                <i className="fab fa-pinterest"/>
                            </a>
                            {/* Youtube */}
                            <a
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{backgroundColor: "#ed302f"}}
                                href="#"
                                role="button"
                            >
                                <i className="fab fa-youtube"/>
                            </a>
                            {/* Instagram */}
                            <a
                                className="btn text-white btn-sm btn-floating me-2"
                                style={{backgroundColor: "#ac2bac"}}
                                href="#"
                                role="button"
                            >
                                <i className="fab fa-instagram"/>
                            </a>
                        </div>
                    </div>
                    <hr className="my-3"/>
                    <div className="row">
                        <div className="col-lg-4 mb-4 mb-lg-0">
                            <p>
                                <strong>درباره ما</strong>
                            </p>
                            <p>
                                شرکت دانش بنیان کیمیازیم با هدف تولید محصولات زیست فناوری در صنایع غذایی و همچنین صنعت دام، طیور و آبزیان به پشتوانه دوازده سال فعالیت و پژوهش در حوزه محصولات تخمیری و آنزیم های صنعتی در سال ۱۳۹۳ تاسیس و با محوریت محصولات مخمری فعالیت خود را آغاز نموده است.
                            </p>
                        </div>
                        <div className="col-lg-3 mb-4 mb-lg-0">
                            <p>
                                <strong>راه ارتیاط با ما</strong>
                            </p>
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <a href="" className="text-dark">
                                        ۰۹۱۳۴۴۶۰۶۳۶ <i className="fa fa-phone" aria-hidden="true"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="" className="text-dark">
                                        amir666arrow@gmail.com <i className="fa-solid fa-envelope"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>


                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center p-3"
                     style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>


                    <a href='https://github.com/AmirHBana' className='text-dark ml-2'><i className="fa fa-github"
                                                                                         aria-hidden="true"></i></a>
                    <a href='https://www.linkedin.com/in/amirhossien-banayikhalilabad/' className='text-dark ml-2'><i
                        className="fa fa-linkedin" aria-hidden="true"></i></a>
                    <p className="text-dark ml-2" style={{marginRight: '1%', marginLeft: '1%'}} title="amir666arrow@gmail.com">AmirHossien Banayi KhalilAbad</p>
                    <span>&copy; 2024 - Date Copyright Design and Developed By:</span>
                </div>


                {/* Copyright */}
            </footer>

            </div>
        </>
    )
}

export default StoreFooter