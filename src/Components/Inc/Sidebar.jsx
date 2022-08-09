import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useAgencyInfo } from "../../Context/ContextProvider";
import { WEB_NAME } from "../Common/SecreteConst";
const Sidebar = () => {
  const location = useLocation();
  console.log('location', location)
  console.log('location.pathname', location.pathname);
  const {agencyInfo, Testing} = useAgencyInfo()
  console.log('sidebarContext', agencyInfo)
  return (
    <>
      <div id="header_top" className="header_top">
        <div className="container">
          <div className="hleft">
            <Link className="header-brand" to="">
              <i className="fa fa-soccer-ball-o brand-logo"></i>
            </Link>
            <div className="dropdown">

              <Link to="" className="nav-link icon xs-hide">
                <i className="fa fa-search"></i>
              </Link>
              <Link
                to=""
                className="nav-link icon app_inbox xs-hide"
              >
                <i className="fa fa-calendar"></i>
              </Link>
              <Link to="" className="nav-link icon xs-hide">
                <i className="fa fa-id-card-o"></i>
              </Link>
              <Link to="" className="nav-link icon xs-hide">
                <i className="fa fa-comments-o"></i>
              </Link>
              <Link
                to=""
                className="nav-link icon app_file xs-hide"
              >
                <i className="fa fa-folder-o"></i>
              </Link>
              <Link
                to=""
                className="nav-link icon theme_btn xs-hide"
              >
                <i
                  className="fa fa-paint-brush"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Themes"
                ></i>
              </Link>
            </div>
          </div>
          <div className="hright">
            <div className="dropdown">
              <Link to="#" className="nav-link icon settingbar d-block">
                <i
                  className="fa fa-gear fa-spin"
                  data-toggle="tooltip"
                  data-placement="right"
                  title="Settings"
                ></i>
              </Link>
              {/* <Link to="" className="nav-link icon menu_toggle"> */}
              <i className="fa fa-align-left icon menu_toggle"></i>
              {/* </Link> */}
            </div>
          </div>
        </div>
      </div>

      <div id="left-sidebar" className="sidebar ">
        <h5 className="brand-name" style={{ borderBottom: '1px solid gray', paddingBottom: '10px' }}>
          {WEB_NAME}
          <Link to="" className="menu_option float-right">
            <i
              className="fa fa-qrcode"
              data-toggle="tooltip"
              data-placement="left"
              title="Grid & List Toggle"
            ></i>
          </Link>
        </h5>
        <nav id="left-sidebar-nav" className="sidebar-nav">
          <ul className="metismenu">

            <li className="active">
              <Link to="/">
                <i className="fa fa-home"></i>
                <span>Dashboard</span>
              </Link>
            </li>

            <li>
              <Link to="#" class="has-arrow arrow-c"><i class="fa fa-lock"></i><span>Reports</span></Link>
              <ul>
                <li><Link to="/incident">Incident</Link></li>
                <li><Link to="">Case Management</Link></li>
                <li><Link to="">Arrest</Link></li>
                <li><Link to="">Civil Process</Link></li>
              </ul>
            </li>

            <li>
              <Link to="#">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width={'15px'}><path d="M304 32C304 49.67 289.7 64 272 64C254.3 64 240 49.67 240 32C240 14.33 254.3 0 272 0C289.7 0 304 14.33 304 32zM160 80C160 62.33 174.3 48 192 48C209.7 48 224 62.33 224 80C224 97.67 209.7 112 192 112C174.3 112 160 97.67 160 80zM160 128C177.7 128 192 142.3 192 160H200C213.3 160 224 170.7 224 184V200C224 201.7 223.8 203.4 223.5 205.1C280.3 229.6 320 286.2 320 352C320 440.4 248.4 512 160 512C71.63 512 0 440.4 0 352C0 286.2 39.74 229.6 96.54 205.1C96.19 203.4 96 201.7 96 200V184C96 170.7 106.7 160 120 160H128C128 142.3 142.3 128 160 128zM160 448C213 448 256 405 256 352C256 298.1 213 256 160 256C106.1 256 64 298.1 64 352C64 405 106.1 448 160 448zM337.6 278.9C354.5 246.1 382.5 219.8 416.5 205.1C416.2 203.4 416 201.7 416 199.1V183.1C416 170.7 426.7 159.1 440 159.1H448C448 142.3 462.3 127.1 480 127.1C497.7 127.1 512 142.3 512 159.1H520C533.3 159.1 544 170.7 544 183.1V199.1C544 201.7 543.8 203.4 543.5 205.1C600.3 229.6 640 286.2 640 352C640 440.4 568.4 512 480 512C417.1 512 364.2 476.7 337.6 425.1C346.9 402.5 352 377.9 352 352C352 326.1 346.9 301.5 337.6 278.9V278.9zM480 256C426.1 256 384 298.1 384 352C384 405 426.1 448 480 448C533 448 576 405 576 352C576 298.1 533 256 480 256zM336 32C336 14.33 350.3 0 368 0C385.7 0 400 14.33 400 32C400 49.67 385.7 64 368 64C350.3 64 336 49.67 336 32zM416 80C416 62.33 430.3 48 448 48C465.7 48 480 62.33 480 80C480 97.67 465.7 112 448 112C430.3 112 416 97.67 416 80z" /></svg>
                <span className="ml-3">Arrest</span>
              </Link>
            </li>
            <li>
              <Link to="#">
                <i className="fa fa-check-square-o"></i>
                <span>Warrent</span>
              </Link>
            </li>

            <li>
              <Link to="/name">
                <i className="fa fa-calendar-check-o"></i>
                <span>Name</span>
              </Link>
            </li>

            <li>
              <Link to="/property">
                <i className="fa fa-list-ul"></i>
                <span>Property</span>
              </Link>
            </li>
            <li>
              {/* utility */}
              <Link to="/utility">
                <i className="fa fa-cog" aria-hidden="true"></i>
                <span>Utility</span>
              </Link>
            </li>
            <li>
              <Link to="/agency">
                <i className="fa fa-th-large" aria-hidden="true"></i>
                <span>Agency</span>
              </Link>
            </li>
            <li>
              {/* view */}
              <Link to="/view">
                <i className="fa fa-eye" aria-hidden="true"></i>
                <span>View</span>
              </Link>
            </li>

            <li>
              <Link to="#" onClick={()=>Testing()}>
                <i className="fa fa-support"></i>
                <span>Need Help?</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
