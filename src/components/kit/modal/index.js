import { useRef } from "react";
import { useTransition } from "react-spring";
import { connect } from "react-redux";
import {
  StyledModal,
  StyledModalContainer,
  StyledModalItem,
  StyledCloseModal
} from "./modal.styles";
import Portal from "./Portal";
import { toggleModal } from "../../../redux/actions";
import { useOnClickOutside } from "../../../hooks";

function Modal(props) {
  const ref = useRef();

  const modalTransition = useTransition(props.modalOpen, null, {
    delay: 1,
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  });

  useOnClickOutside(ref, () => props.toggleModal());

  function closeModal() {
    return props.toggleModal();
  }

  function getChildren() {
    return props.children;
  }

  return (
    <Portal>
      <StyledModal>
        {modalTransition.map(({ item, key, props }) => {
          return item ? (
            <StyledModalContainer
              key={key}
              style={props}
              aria-modal="true"
              role="dialog"
            >
              <StyledModalItem ref={ref} key={key} style={props}>
                <StyledCloseModal
                  className="fa fa-window-close fa-2x"
                  onClick={() => closeModal()}
                />
                {getChildren()}
              </StyledModalItem>
            </StyledModalContainer>
          ) : null;
        })}
      </StyledModal>
    </Portal>
  );
}

const mapStateToProps = ({ root }) => ({
  modalOpen: root.modalOpen
});

const mapDispatchToProps = {
  toggleModal
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
