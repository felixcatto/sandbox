import React from 'react';
import cn from 'classnames';


const Header = ({ toggle, children }) => (
  <div className="modal-header">
    <div className="modal-title">{children}</div>
    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={toggle}>
      <span aria-hidden="true">×</span>
    </button>
  </div>
);
const Body = ({ children }) => <p className="modal-body">{children}</p>;
const Footer = ({ children }) => <p className="modal-footer">{children}</p>;


export default class Modal extends React.Component {
  static defaultProps = {
    isOpen: false,
  };

  static Header = Header;
  static Body = Body;
  static Footer = Footer;

  render() {
    const { isOpen, children } = this.props;
    const modalClass = cn('modal', {
      fade: isOpen,
      show: isOpen,
    });
    const modalStyle = { display: isOpen ? 'block' : 'none' };
    return (
      <div className={modalClass} style={modalStyle}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">{children}</div>
        </div>
      </div>
    );
  }
}
