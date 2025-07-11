import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import Card from "./Card";
import { IoIosArrowRoundForward } from "@react-icons/all-files/io/IoIosArrowRoundForward";
import { ReactComponent as IngressGatewayImage } from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/ingress-gateway-partial-colorMode.svg";
import { ReactComponent as KubernetesImage } from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/kubernetes-navbar.svg";
import { ReactComponent as KubernetesImage1 } from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/kubernetes-navbar-light.svg";
import { ReactComponent as PodImage } from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/pod-partial-colorMode.svg";
import { ReactComponent as PrometheusImage } from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/prometheus-partial-colorMode.svg";
import { ReactComponent as ServiceIntefaceImage } from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/service-interface-partial-colorMode.svg";
import SupportingArrows from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/supporting-arrows.svg";
import EmptyLight from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/empty-light.svg";
import EmptyDark from "../../../../sections/Kanvas/Kanvas-collaborate/images/banner-transitions/empty-dark.svg";
import { useInView } from "react-intersection-observer";
import { useStyledDarkMode } from "../../../../theme/app/useStyledDarkMode";

const ScrollspyMenu = ({ menuItems, ...props }) => {
  const { blogData,className } = props;

  const addAllClasses = className ? [className] : [""];
  const [activeState,setActiveState] = useState(null);

  const [isWrapVisible,setIsWrapperVisible] = useState(false);
  const [imageInView, setimageInView] = useState(false);
  const { isDark } = useStyledDarkMode();

  const handleMouseOver = (index) => {
    setActiveState(menuItems[index]);
  };

  const wrapDisplay = () => {
    setIsWrapperVisible(true);
  };

  const wrapNone = () => {
    setIsWrapperVisible(false);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    setIsWrapperVisible(false);
    setActiveState(null);
  };

  const [transitionRef, inView] = useInView({ threshold: 0.7 });

  useEffect(() => {
    if (inView && !imageInView){
      setimageInView(true);
    } else if (imageInView && !inView){
      setimageInView(false);
    }
  },[inView,imageInView]);

  return (
    <ul className={addAllClasses.join(" ")} onMouseEnter={wrapDisplay} onMouseLeave={wrapNone}>
      {menuItems.map((menu, index) => (

        <li
          key={index}
          className={
            menu.subItems ? "nav-item has-dropdown" : "nav-item"
          }
          onMouseOver={() => handleMouseOver(index)}
        >
          <Link
            to={menu.path}
            className="menu-link"
            activeClassName="nav-link-active"
            onClick={handleLinkClick}
          >
            <span>
              {menu.name}
            </span>
          </Link>
        </li>
      ))}
      {activeState?.subItems && (
        <React.Fragment>
          <ul className="dropdown" style={{ zIndex: "101" }}>
            <div className="nav-grid">
              <div className="hr">
                <Link
                  className="section"
                  to={activeState.path}
                  activeClassName="nav-link-active"
                  onClick={handleLinkClick}
                >
                  {activeState.name}
                </Link>
                {activeState.subItems.map((subItem, i) => {
                  return (
                    <li key={i}>
                      {subItem.externalLink ?
                        <a
                          href={subItem.path}
                          target="_blank"
                          className={subItem.sepLine && "sub-item"}
                          rel="noreferrer"
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </a>
                        : <Link
                          to={subItem.path}
                          partiallyActive={false}
                          className={subItem.sepLine && "sub-item"}
                          activeClassName="nav-link-active"
                          onClick={handleLinkClick}
                        >
                          {subItem.name}
                        </Link>
                      }
                    </li>
                  );
                })}
                <div className="action-items">
                  {activeState.actionItems.map((actionItem, i) => (
                    (actionItem.actionName === "Join the discussion" ?
                      <a
                        key={i}
                        href={actionItem.actionLink}
                        target="_blank"
                        className="action-link"
                        rel="noreferrer"
                        onClick={handleLinkClick}
                      >
                        <span className="readmore-btn">
                          {actionItem.actionName} <IoIosArrowRoundForward />
                        </span>
                      </a>
                      : <Link
                        key={i}
                        to={actionItem.actionLink}
                        partiallyActive={true}
                        className="action-link"
                        onClick={handleLinkClick}
                      >
                        <span className="readmore-btn">
                          {actionItem.actionName} <IoIosArrowRoundForward />
                        </span>
                      </Link>
                    )
                  )
                  )}
                </div>
              </div>
              {blogData[activeState.name].nodes.length !== 0 ? (
                <div className="nav-display">
                  <Card frontmatter={blogData[activeState.name].nodes[0].frontmatter} fields={blogData[activeState.name].nodes[0].fields} />
                  <Card frontmatter={blogData[activeState.name].nodes[1].frontmatter} fields={blogData[activeState.name].nodes[1].fields} />
                </div>) : (
                <>
                  <Link
                    to="/cloud-native-management/kanvas"
                    onClick={handleLinkClick}
                  >
                    <div className="single-card">
                      <div className="transition-container" ref={transitionRef}>
                        <img className="canvas" src={isDark ? EmptyDark : EmptyLight} alt="" />
                        <ServiceIntefaceImage className="service-interface" alt="ServiceIntefaceImage" />
                        <IngressGatewayImage alt="IngressGatewayImage" className={imageInView ? "ingress-gateway-transition ingress-gateway" : "ingress-gateway"}/>
                        {isDark ? <KubernetesImage className={imageInView ? "kubernetes-transition kubernetes" : "kubernetes"} alt="KubernetesImage" /> : <KubernetesImage1 className={imageInView ? "kubernetes-transition kubernetes" : "kubernetes"} alt="KubernetesImage" />}
                        <PodImage className={imageInView ? "pod-transition pod" : "pod"} alt="PodImage" />
                        <PrometheusImage className={imageInView ? "prometheus-transition prometheus" : "prometheus"} alt="PrometheusImage" />
                        <img className={imageInView ? "supporting-arrows-transition supporting-arrows" : "supporting-arrows"} src={SupportingArrows} alt="" />
                      </div>
                      <div className="card-text">
                        <p>Kanvas</p>
                        <h6>Stop finger-pointing.</h6>
                        <h6>Start collaborating.</h6>
                      </div>
                    </div>
                  </Link>
                </>)
              }
            </div>
          </ul>
          {isWrapVisible && <div className="wrap" style={{ zIndex: "100", display: isWrapVisible ? "block" : "none" }} />}
        </React.Fragment>
      )}
    </ul>
  );
};

export default ScrollspyMenu;
