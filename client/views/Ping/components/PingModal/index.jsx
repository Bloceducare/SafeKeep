import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import { hidePingModal } from "@state/ui";
import ModalBody from "../../../../components/Modal/ModalBody";
import ModalHeader from "../../../../components/Modal/ModalHeader";
import { pingModal } from "../../selector";

const PingModal = () => {
  const dispatch = useDispatch();
  const pingStatus = useSelector(pingModal);
  const handleHideModal = () => {
    dispatch(hidePingModal());
  };

  return (
    <>
      <Modal show={pingStatus} onHide={handleHideModal}>
        <ModalHeader title={""} />
        <ModalBody style={{ textAlign: "center" }}>
          <CheckMarkContainer>
            <div className="icon icon--order-success svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="72px"
                height="72px"
                style={{ transform: "scale(0.95) translateY(-1.2rem)" }}
              >
                <g fill="none" stroke="blue" stroke-width="2">
                  <circle
                    cx="36"
                    cy="36"
                    r="35"
                    style={{
                      strokeDasharray: "240px, 240px",
                      strokeDashoffset: "480px",
                    }}
                  ></circle>
                  <path
                    d="M17.417,37.778l9.93,9.909l25.444-25.393"
                    style={{
                      strokeDasharray: "50px, 50px",
                      strokeDashoffset: "0px",
                    }}
                  ></path>
                </g>
              </svg>
            </div>
          </CheckMarkContainer>
          <span>Sweet! 🥳 , you've successfully ping your vault</span>
        </ModalBody>
      </Modal>
    </>
  );
};

export default PingModal;

const CheckMarkContainer = styled.div`
  /* @ref - https://codepen.io/benlrc/pen/JbReXj */
  /* animations */
  @-webkit-keyframes checkmark {
    0% {
      stroke-dashoffset: 50px;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @-ms-keyframes checkmark {
    0% {
      stroke-dashoffset: 50px;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @keyframes checkmark {
    0% {
      stroke-dashoffset: 50px;
    }

    100% {
      stroke-dashoffset: 0;
    }
  }

  @-webkit-keyframes checkmark-circle {
    0% {
      stroke-dashoffset: 240px;
    }

    100% {
      stroke-dashoffset: 480px;
    }
  }

  @-ms-keyframes checkmark-circle {
    0% {
      stroke-dashoffset: 240px;
    }

    100% {
      stroke-dashoffset: 480px;
    }
  }

  @keyframes checkmark-circle {
    0% {
      stroke-dashoffset: 240px;
    }

    100% {
      stroke-dashoffset: 480px;
    }
  }

  /* other styles */
  /* .svg svg {
    display: none
}
 */
  .inlinesvg .svg svg {
    display: inline;
  }

  /* .svg img {
    display: none
} */

  .icon--order-success svg path {
    -webkit-animation: checkmark 0.25s ease-in-out 0.7s backwards;
    animation: checkmark 0.25s ease-in-out 0.7s backwards;
    -webkit-animation-delay: 3s; /* Safari 4.0 - 8.0 */
    animation-delay: 3s;
  }

  .icon--order-success svg circle {
    -webkit-animation: checkmark-circle 0.6s ease-in-out backwards;
    animation: checkmark-circle 0.6s ease-in-out backwards;
    -webkit-animation-delay: 2s; /* Safari 4.0 - 8.0 */
    animation-delay: 2s;
  }
`;
