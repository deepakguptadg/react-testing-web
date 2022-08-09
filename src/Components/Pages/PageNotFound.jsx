import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <>
      <div className="PageNotFound">
        <div className="auth">
          <div className="auth_left">
            <div className="card">
              <div className="card-body">
                <div className="display-3 text-muted mb-5">
                  <i className="si si-exclamation"></i> 404
                </div>
                <h1 className="h3 mb-3">
                  Oops.. You just found an error page..
                </h1>
                <p className="h6 text-muted font-weight-normal mb-3">
                  We are sorry but our service is currently not available;
                </p>
                <Link className="btn btn-primary" to="/">
                  {/* <i className="fa user mr-2"></i>Go back */}
                  Go Back
                </Link>
              </div>
            </div>
          </div>
          <div className="auth_right full_img"></div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
