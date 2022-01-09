import { toast } from "react-toastify";
import { currentNetworkConfig } from "../utils/networkConfig";

/**
 * @description - This function is used to display a toast message
 * @param {string} message
 * @param {string} txnHash
 * @param {string} type - success, error, warning, info
 * @returns {void}
 **/
const toastify = (type = "info", message, txnHash) => {
  toast[type](
    <div className="text-center">
      {" "}
      {message}
      {type === "success" && txnHash && (
        <p>
          <a
            href={`${currentNetworkConfig?.blockExplorerUrl}tx/${txnHash}`}
            rel="noopener noreferrer"
            target="_blank"
            className="text-secondary"
            style={{
              textDecoration: "underline",
              fontSize: "14px",
              marginBottom: "-3rem!important",
              marginTop: "1.5rem",
            }}
          >
            check here for transaction details
          </a>
        </p>
      )}
    </div>,
    {
      position: toast.POSITION.TOP_CENTER,
      autoClose: type === "success" ? 10000 : 3000,
      [type === "success" && "icon"]: "",
    }
  );
};

export default toastify;
