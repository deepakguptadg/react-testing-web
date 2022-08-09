import React from "react";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  function signOut() {
    if (window.confirm("Are You Sure You Want To Logout !!")) {
      localStorage.clear();
      alert('Logout Succesfully !')
    }
  }
  const showCAD = () => {
    navigate('/view')
  }
  // offcanvas-active
  return (
    <>
      <div id="page_top" className="section-body top_dark">
        <div className="container-fluid">
          <div className="page-header">
            <div className="left">
              {/* <Link to="" className="icon menu_toggle mr-3"> */}
              <i className="fa fa-align-left menu_toggle mr-2 ml-2"></i>
              {/* </Link> */}
              <h1 className="page-title">Dashboard</h1>

              <div className="switch-cad-rms d-flex" style={{ alignItems: 'center' }}>
                <p className="p-0 m-0">RMS</p>
                <div id="cad_rms_switch" className="mx-1 rms">
                  <input type="checkbox" id="switch" onChange={showCAD} />
                  <label for="switch">Toggle</label>
                </div>
                <p className="p-0 m-0">CAD</p>
              </div>
            </div>

            <div className="right">
              <div className="input-icon xs-hide mr-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for..."
                />
                <span className="input-icon-addon">
                  <i className="fa fa-search"></i>
                </span>
              </div>
              <div className="notification d-flex">
                <div className="dropdown d-flex">
                  <Link to=''
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-language"></i>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <Link className="dropdown-item" to="">
                      <img className="w20 mr-2" />
                      English
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="">
                      {/* <img
                          className="w20 mr-2"
                          src="assets/images/flags/es.svg"
                        /> */}
                      Spanish
                    </Link>
                    <Link className="dropdown-item" to="">
                      <img
                        className="w20 mr-2"
                        src="assets/images/flags/jp.svg"
                      />
                      japanese
                    </Link>
                    <Link className="dropdown-item" to="">
                      <img
                        className="w20 mr-2"
                        src="assets/images/flags/bl.svg"
                      />
                      France
                    </Link>
                  </div>
                </div>
                <div className="dropdown d-flex">
                  <Link to=''
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-envelope"></i>
                    <span className="badge badge-success nav-unread"></span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <ul className="right_chat list-unstyled w350 p-0">
                      <li className="online">
                        <Link to="" className="media">
                          <img
                            className="media-object"
                            src="assets/images/xs/avatar4.jpg"
                            alt=""
                          />
                          <div className="media-body">
                            <span className="name">Donald Gardner</span>
                            <div className="message">
                              It is a long established fact that a reader
                            </div>
                            <small>11 mins ago</small>
                            <span className="badge badge-outline status"></span>
                          </div>
                        </Link>
                      </li>
                      <li className="online">
                        <Link to="" className="media">
                          <img className="media-object " alt="" />
                          <div className="media-body">
                            <span className="name">Wendy Keen</span>
                            <div className="message">
                              There are many variations of passages of Lorem
                              Ipsum
                            </div>
                            <small>18 mins ago</small>
                            <span className="badge badge-outline status"></span>
                          </div>
                        </Link>
                      </li>
                      <li className="offline">
                        <Link to="" className="media">
                          <img
                            className="media-object "
                            src="assets/images/xs/avatar2.jpg"
                          />
                          <div className="media-body">
                            <span className="name">Matt Rosales</span>
                            <div className="message">
                              Contrary to popular belief, Lorem Ipsum is not
                              simply
                            </div>
                            <small>27 mins ago</small>
                            <span className="badge badge-outline status"></span>
                          </div>
                        </Link>
                      </li>
                      <li className="online">
                        <Link to="" className="media">
                          <img
                            className="media-object "
                            src="assets/images/xs/avatar3.jpg"
                            alt=""
                          />
                          <div className="media-body">
                            <span className="name">Phillip Smith</span>
                            <div className="message">
                              It has roots in a piece of classNameical Latin
                              literature from 45 BC
                            </div>
                            <small>33 mins ago</small>
                            <span className="badge badge-outline status"></span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                    <div className="dropdown-divider"></div>
                    <Link
                      to=""
                      className="dropdown-item text-center text-muted-dark readall"
                    >
                      Mark all as read
                    </Link>
                  </div>
                </div>
                <div className="dropdown d-flex">
                  <Link to=''
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"
                    data-toggle="dropdown"
                  >
                    <i className="fa fa-bell"></i>
                    <span className="badge badge-primary nav-unread"></span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <ul className="list-unstyled feeds_widget">
                      <li>
                        <div className="feeds-left">
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="feeds-body">
                          <h4 className="title text-danger">
                            Issue Fixed
                            <small className="float-right text-muted">
                              11:05
                            </small>
                          </h4>
                          <small>
                            WE have fix all Design bug with Responsive
                          </small>
                        </div>
                      </li>
                      <li>
                        <div className="feeds-left">
                          <i className="fa fa-user"></i>
                        </div>
                        <div className="feeds-body">
                          <h4 className="title">
                            New User
                            <small className="float-right text-muted">
                              10:45
                            </small>
                          </h4>
                          <small>I feel great! Thanks team</small>
                        </div>
                      </li>
                      <li>
                        <div className="feeds-left">
                          <i className="fa fa-thumbs-o-up"></i>
                        </div>
                        <div className="feeds-body">
                          <h4 className="title">
                            7 New Feedback
                            <small className="float-right text-muted">
                              Today
                            </small>
                          </h4>
                          <small>
                            It will give a smart finishing to your site
                          </small>
                        </div>
                      </li>
                      <li>
                        <div className="feeds-left">
                          <i className="fa fa-question-circle"></i>
                        </div>
                        <div className="feeds-body">
                          <h4 className="title text-warning">
                            Server Warning
                            <small className="float-right text-muted">
                              10:50
                            </small>
                          </h4>
                          <small>Your connection is not private</small>
                        </div>
                      </li>
                      <li>
                        <div className="feeds-left">
                          <i className="fa fa-shopping-cart"></i>
                        </div>
                        <div className="feeds-body">
                          <h4 className="title">
                            7 New Orders
                            <small className="float-right text-muted">
                              11:35
                            </small>
                          </h4>
                          <small>You received a new oder from Tina.</small>
                        </div>
                      </li>
                    </ul>
                    <div className="dropdown-divider"></div>
                    <Link
                      to=""
                      className="dropdown-item text-center text-muted-dark readall"
                    >
                      Mark all as read
                    </Link>
                  </div>
                </div>

                <div className="dropdown d-flex">
                  <Link to='#'
                    className="nav-link icon d-none d-md-flex btn btn-default btn-icon ml-2"
                    data-toggle="dropdown"
                  >
                    {/* <i className="fa fa-user"></i> */}
                    <span className="text-uppercase text-white">
                      {localStorage.getItem('UserName')}&nbsp;
                      <i class="fa fa-caret-down" aria-hidden="true"></i>
                    </span>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
                    <Link className="dropdown-item" to="#">
                      <i className="fa fa-user"></i> &nbsp; Profile
                    </Link>
                    <Link className="dropdown-item" to="#">
                      <i className="fa fa-cog"></i>&nbsp;
                      Settings
                    </Link>
                    <Link className="dropdown-item" to="#">
                      <span className="float-right">
                        <span className="badge badge-primary">6</span>
                      </span>
                      <i class="fa fa-inbox" aria-hidden="true"></i>&nbsp; Inbox
                    </Link>
                    <Link className="dropdown-item" to="#">
                      <i className="fa fa-envelope"></i>&nbsp; Message
                    </Link>
                    <div className="dropdown-divider"></div>
                    <Link className="dropdown-item" to="3">
                      <i className="fa fa-info-circle"></i>&nbsp; Need
                      help?
                    </Link>
                    <Link className="dropdown-item" to="/login" onClick={signOut}>
                      <i className="fa fa-sign-out"></i>&nbsp; Sign out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header;
