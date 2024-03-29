import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";
/**
 * second component when two components are closly related.
 * <ModalOverlay> is only for internal use.
 */
const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className={`modal__content ${props.contentClass}`}>{props.children}</div>
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {/**
       * 조건이 true일 경우에는 && 이후에 위치한 expression을 반환하고, false일 경우 expression을 반환하지 않고 무시합니다.
       * '...' is Spread Operator
       */}
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal">
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  );
};

export default Modal;
