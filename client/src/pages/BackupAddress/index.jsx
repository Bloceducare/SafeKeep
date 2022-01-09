import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import { Spinner, Button } from "react-bootstrap";
import CustomButton from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import { showCreateVaultModal } from "../../state/ui";
import BackupAddressModal from "./components/BackupAddressModal";
import { vaultId, backupAdd } from "./selector";
import { getBackupAddressAsync, updateBackupAddressAsync } from "./state";
import { CurrentAddress, Table } from "./style";
import { getDate } from "../../utils/formatter";

function BackupAddress() {
  const dispatch = useDispatch();
  const id = useSelector(vaultId);
  const { crud, data, status, loading, currentBackup, currentBackupTime } =
    useSelector(backupAdd);
  const [backupAddress, setBackupAddress] = useState("");

  const handleChange = (e) => {
    if (!id) return dispatch(showCreateVaultModal());
    setBackupAddress(e.target.value);
  };
  const updateBackupAddress = (e) => {
    e.preventDefault();
    if (!id) return dispatch(showCreateVaultModal());
    if (!backupAddress) return;
    const data = {
      _vaultId: id,
      _newBackup: backupAddress,
    };
    return dispatch(updateBackupAddressAsync(data));
  };



  const  handleBackupAddress = useCallback(() => {
    dispatch(getBackupAddressAsync());

  },[dispatch])
  useEffect(() => {
    handleBackupAddress();
  }, [handleBackupAddress]);

  const _loading = loading && "Loading...";
  const _error = status === "rejected" && (
    <p>
      An error occured{" "}
      <CustomButton text="try again" onClick={handleBackupAddress} />{" "}
    </p>
  );
  const _renderBackupAddress = data && data.length > 0 && (
    <>
      <Table className="table borderless gig-table-section">
        <p className="text-muted">Backup Address Change History </p>
        <tbody>
          {[...data].reverse().map((item) => (
            <tr key={item.id}>
              <td className="user-name">
                {" "}
                {item.address}
                {item.createdAt === currentBackupTime && (
                  <span class="badge badge-light mx-2">current</span>
                )}
              </td>
              <td className="user-table-details">
                {" "}
                {getDate(item.createdAt)?.time}{" "}
              </td>
              <td className="user-table-details">
                {" "}
                {getDate(item.createdAt)?.date}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
  return (
    <div>
      <ToastContainer />
      <BackupAddressModal />
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
      <section>
        <form onSubmit={updateBackupAddress}>
          <CustomInput
            placeholder={
              !id ? "Create a vault first" : "Enter your backup address"
            }
            onChange={handleChange}
            value={backupAddress}
            disabled={crud || !currentBackup}
            style={{
              backgroundColor: crud || !currentBackup ? "transparent" : "",
            }}
          />
          <div className="my-4 d-flex justify-content-center align-items-center">
            {crud ? (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />

                <span style={{ marginLeft: "1rem" }}>Updating</span>
              </Button>
            ) : (
              <CustomButton
                text="Update"
                disabled={crud || backupAddress.length === 0}
              />
            )}
          </div>
        </form>
      </section>

      {status === "success" && !!currentBackup && (
        <section>
          <p
            className="text-muted"
            style={{
              marginBottom: "-0.01rem",
            }}
          >
            Current Address
          </p>
          <CurrentAddress>{currentBackup} </CurrentAddress>
        </section>
      )}

      <section>
        {_renderBackupAddress}

        {id && _loading}
        {_error}
      </section>
    </div>
  );
}

export default BackupAddress;
