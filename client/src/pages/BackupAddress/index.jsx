import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import { Spinner, Button } from "react-bootstrap";
import CustomButton from "../../components/Button";
import CustomInput from "../../components/CustomInput";
import { showCreateVaultModal } from "../../state/ui";
import BackupAddressModal from "./components/BackupAddressModal";
import { vaultId, backupAdd } from "./selector";
import { updateBackupAddressAsync } from "./state";
import { CurrentAddress, Table } from "./style";

function BackupAddress() {
  const dispatch = useDispatch()
  const id = useSelector(vaultId)
  const { crud } = useSelector(backupAdd)
  const [backupAddress, setBackupAddress] = useState("");


  const handleChange = (e) => {
    if (id === '0') return dispatch(showCreateVaultModal())
    setBackupAddress(e.target.value);
  };
  const updateBackupAddress = (e) => {
    e.preventDefault()
    if (id === '0') return dispatch(showCreateVaultModal())
    if (!backupAddress) return;
    const data = {
      _vaultId: id,
      _newBackup: backupAddress
    }
    return dispatch(updateBackupAddressAsync(data))

  };

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
          <CustomInput placeholder="Input Address" onChange={handleChange} value={backupAddress} />
          <div className="my-4 d-flex justify-content-center align-items-center">

            {
              crud ? <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />

                <span style={{ marginLeft: '1rem' }}>Updating
                </span>
              </Button> : <CustomButton
                text="Update"
              />
            }


          </div>
        </form>
      </section>

      <section>
        <p
          className="text-muted"
          style={{
            marginBottom: "-0.01rem",
          }}
        >
          Current Address
        </p>
        <CurrentAddress>
          0xbcaAB35233Ec7305D83C0A5b25d4d20C60B38Fb4
        </CurrentAddress>
      </section>

      <section>
        <Table className="table borderless gig-table-section">
          <p className="text-muted">Current Address</p>
          <tbody>
            <tr>
              <td className="user-name">
                {" "}
                0xbcaAB35233Ec7305D83C0A5b25d4d20C60B38Fb4
              </td>
              <td className="user-table-details">10 : 13 : 16 AM</td>
              <td className="user-table-details">12 - 20 - 20</td>
            </tr>

            <tr className="">
              <td className="user-name">
                {" "}
                0xbcaAB35233Ec7305D83C0A5b25d4d20C60B38Fb4
              </td>
              <td className="user-table-details">10 : 13 : 16 AM</td>
              <td className="user-table-details">12 - 20 - 20</td>
            </tr>
          </tbody>
        </Table>
      </section>
    </div>
  );
}

export default BackupAddress;
