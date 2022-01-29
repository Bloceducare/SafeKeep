import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Btn } from "./style";
import {
  FaTrashAlt,
  FaEdit,
  FaPlus,
  FaAddressBook,
  FaEthereum,
  FaMoneyBill,
} from "react-icons/fa";
import DashboardHero from "../../components/DashboardHero";
import CustomSearchInput from "../../components/CustomSearchInput";
import AddModal from "./Components/AddModal";
import {
  showCreateInheritorsModal,
  showCreateVaultModal,
  showEditAliasModal,
  showAllocateTokenModal,
} from "../../state/ui";
import { inheritors } from "./selector";
import { getInheritorsAsync, deleteInheritorAsync } from "./state";
import CustomButton from "../../components/Button";
import ConfirmationModalComponent from "../../components/ConfirmModal";
import {
  showConfirmationModal,
  showAllocateEthSingleModal,
} from "../../state/ui";
import EditAliasModal from "./Components/EditModal";
import AllocateSingleEthModal from "./Components/AllocateEthSingle";
import { tokenValue } from "../../utils/formatter";
import { currentNetworkConfig } from "../../utils/networkConfig";
import AllocateTokenModal from "./Components/AllocateTokens";
import TokenPanel from "../../components/TokenPanel";
import { Col, Row } from "react-bootstrap";
import Check from "../../assets/check.svg";
import WrapAddress from "../../components/WrapAddress";

function Inheritors() {
  const dispatch = useDispatch();
  const { data, loading, crud, status, loaded } = useSelector(inheritors);
  const {
    user: { address },
    vault: {
      data: { id },
    },
  } = useSelector((state) => state);
  const [currentData, setCurrentData] = useState({});
  const [aliasNotAvailable, setAliasAvailable] = useState(false);

  const handleShow = () => {
    if (!id) return dispatch(showCreateVaultModal());
    dispatch(showCreateInheritorsModal());
  };

  const handleSingleAllocateModal = (data) => {
    setCurrentData(data);
    dispatch(showAllocateEthSingleModal());
  };

  const handleShowConfirmationModal = (data) => {
    setCurrentData(data);
    dispatch(showConfirmationModal());
  };

  const handleShowTokenAllocationModal = (data) => {
    setCurrentData(data);
    dispatch(showAllocateTokenModal());
  };

  useEffect(() => {
    id && dispatch(getInheritorsAsync(address));
  }, [address, dispatch, id]);

  const _loading = loading && "Loading...";

  const _error = status === "rejected" && (
    <div>
      An error occurred
      <CustomButton
        text="try again"
        onClick={() => dispatch(getInheritorsAsync())}
      />
    </div>
  );

  const handleDelete = () => {
    const data = [currentData.address];
    const inheritorId = [currentData.id];
    const info = { _vaultId: id, _inheritors: data, ids: inheritorId };
    dispatch(deleteInheritorAsync(info));
  };

  const handleAliasEdit = (inheritor, isAddOperation) => {
    setCurrentData(inheritor);
    setAliasAvailable(isAddOperation);
    dispatch(showEditAliasModal());
  };

  const _data = loaded && (
    <>
      {data.map((item, index) => (
        <>
          <Row
            className="mb-3 py-2"
            key={item?.id ?? item?.address}
            style={{
              outline: "1px solid",
              borderRadius: "5px",
              paddingLeft: "0",
              paddingRight: "0",
            }}
          >
            <Col lg="2" className="my-1">
              <span>
                <img
                  src={Check}
                  alt="check"
                  style={{
                    width: "25px",
                    height: "25px",
                    marginRight: "0.5rem",
                  }}
                />
                {item?.alias}
              </span>
            </Col>
            <Col lg="5" className="d-flex align-items-center">
              <WrapAddress className="d-flex align-items-center">
                {item?.id ?? item?.address}
              </WrapAddress>
            </Col>
            <ActionContainer
              lg="5"
              className="d-flex align-items-center justify-content-end"
            >
              <Btn
                bvar="danger"
                cvar="danger"
                onClick={() => handleShowConfirmationModal(item)}
              >
                <FaTrashAlt className="mx-1" />
              </Btn>
              {item.alias ? (
                <Btn
                  bvar="edit"
                  cvar="edit"
                  onClick={() => handleAliasEdit(item)}
                >
                  <FaEdit className="mx-1" />
                </Btn>
              ) : (
                <Btn
                  bvar="edit"
                  cvar="edit"
                  onClick={() => handleAliasEdit(item, true)}
                >
                  <FaPlus className="mx-1" />
                  <FaAddressBook className="ml-1" />
                </Btn>
              )}
              {tokenValue(item.ethAllocated) ? (
                <Btn
                  bvar="success"
                  cvar="success"
                  onClick={() => handleSingleAllocateModal(item)}
                >
                  <FaEdit className="mx-1" />

                  <FaEthereum className="mx-1" />
                </Btn>
              ) : (
                <Btn
                  bvar="success"
                  cvar="success"
                  onClick={() => handleSingleAllocateModal(item)}
                >
                  <FaPlus className="mx-1" />
                  <FaEthereum className="mx-1" />
                </Btn>
              )}
              <Btn
                bvar="edit"
                cvar="edit"
                onClick={() => handleShowTokenAllocationModal(item, true)}
              >
                <FaPlus className="mx-1" />
                <FaMoneyBill />
              </Btn>
              {tokenValue(item.ethAllocated)}{" "}
              {currentNetworkConfig?.currencySymbol?.toLocaleLowerCase()}{" "}
            </ActionContainer>

            {item.tokens.map((token, idx) => (
              <TokenPanel
                className={`${idx === 0 ? "mt-3" : ""} my-1`}
                token={token}
                key={token?.id}
              />
            ))}
          </Row>
        </>
      ))}
    </>
  );

  return (
    <div>
      <AddModal />
      <ConfirmationModalComponent
        label="inheritor"
        yesOperation={handleDelete}
        operationInProgress={crud}
      >
        <p className="my-3 mt-0 text-center text-muted ">
          <h6>{currentData?.address}</h6>
        </p>

        <p className="my-0 mt-0 text-center text-muted">
          <h5>{currentData?.alias}</h5>
        </p>
      </ConfirmationModalComponent>
      <EditAliasModal aliasNotAvailable={aliasNotAvailable} {...currentData} />
      <AllocateSingleEthModal {...currentData} />
      <AllocateTokenModal {...currentData} />
      <div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
      </div>

      <DashboardHero
        btntext="+ Add Inheritors"
        text="This is the inheritors page"
        margin="3rem auto"
        clickshow={handleShow}
      />

      <h3 className="text-center text-uppercase font-weight-bold">
        {" "}
        Inheritors{" "}
      </h3>

      <CustomSearchInput
        placeholder={!id && "Please create a vault first"}
        disabled={!id}
        style={{ backgroundColor: `${!id ? "transparent" : ""}` }}
      />

      <section>
        {id && _loading}
        {_error}
        {_data}
      </section>
    </div>
  );
}

export default Inheritors;

export const ActionContainer = styled(Col)``;
