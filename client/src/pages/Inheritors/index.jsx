import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Btn, Tbody } from "./style";
import { FaTrashAlt, FaEdit, FaPlus, FaAddressBook, FaEthereum } from "react-icons/fa";
import DashboardHero from "../../components/DashboardHero";
import CustomSearchInput from "../../components/CustomSearchInput";
import AddModal from "./Components/AddModal";
import {
  showCreateInheritorsModal,
  showCreateVaultModal,
  showEditAliasModal,
} from "../../state/ui";
import { inheritors } from "./selector";
import { getInheritorsAsync, deleteInheritorAsync } from "./state";
import CustomButton from "../../components/Button";
import ConfirmationModalComponent from "../../components/ConfirmModal";
import { showConfirmationModal, showAllocateEthSingleModal } from "../../state/ui";
import EditAliasModal from "./Components/EditModal";
import AllocateSingleEthModal from './Components/AllocateEthSingle'
import { tokenValue } from "../../utils/formatter";
import { currentNetworkConfig } from "../../utils/networkConfig";

function Inheritors() {
  const dispatch = useDispatch();
  const { data, loading, error, crud, status } = useSelector(inheritors);
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
 
  }

  const handleShowConfirmationModal = (data) => {
    setCurrentData(data);
    dispatch(showConfirmationModal());
  };

  useEffect(() => {
    dispatch(getInheritorsAsync(address));
  }, [address, dispatch]);

  const _loading = loading && "Loading...";

  const _error = status === "rejected" && !loading && error && (
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
    setAliasAvailable(isAddOperation)
    dispatch(showEditAliasModal());
    //
  };

  const _data = !loading && status === "success" && !error && data && (
    <>
      <table class="table text-white my-4">
        <Tbody>
          {data.map((item, idx) => (
            <tr key={item.id}>
              <td>{item.alias}</td>
              <td>{item.address}</td>
              <td className="d-flex">
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
                ) :   <Btn
                bvar="edit"
                cvar="edit"
                onClick={() => handleAliasEdit(item, true)}
              >
                 <FaPlus className="mx-1" /> 
                <FaAddressBook className="mx-1" /> 
              </Btn> }

              

{tokenValue(item.ethAllocated) ?  (
                  <Btn
                    bvar="success"
                    cvar="success"
                     onClick={() => handleSingleAllocateModal(item)}
                  >
                     <FaEdit className="mx-1" /> 
                   
                    <FaEthereum className="mx-1" />
                  </Btn>
                ) : <Btn
                bvar="success"
                cvar="success"
                 onClick={() => handleSingleAllocateModal(item)}
              >
                <FaPlus className="mx-1" /> 
                <FaEthereum className="mx-1" />
              </Btn> }

              </td>
              <td>
                {tokenValue(item.ethAllocated)}{" "}
                {currentNetworkConfig.currencySymbol.toLocaleLowerCase()}{" "} 
              </td>
            </tr>
          ))}
        </Tbody>
      </table>
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
      <EditAliasModal  aliasNotAvailable ={aliasNotAvailable} {...currentData} />
      <AllocateSingleEthModal  {...currentData} />
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
        {id && _error}
        {_data}
      </section>
    </div>
  );
}

export default Inheritors;
