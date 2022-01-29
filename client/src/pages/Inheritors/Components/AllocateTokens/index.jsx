import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";
import { Modal, Form, Row } from "react-bootstrap";
import { allocateTokensAsync } from "../../state";
import CustomButton from "../../../../components/Button";
import MDBody from "../../../../components/Modal/ModalBody";
import ModalHeader from "../../../../components/Modal/ModalHeader";
import { FormControl } from "../AddModal/style";
import { hideAllocateTokenModal } from "../../../../state/ui";
import { inheritors } from "../../selector";
import { useEffect } from "react";
import SearchableTokenList from "../../../../components/SearchableTokenList";

function AllocateTokenModal(props) {
  const { alias, address } = props;
  const dispatch = useDispatch();
  const { crud } = useSelector(inheritors);
  const {
    ui: { allocateTokenModal },
    vault: {
      data: { id, tokens = [] },
    },
  } = useSelector((state) => state);

  const [selectedAssets, setSelectedAssets] = useState([{ userTokenAmt: 0 }]);

  const handleModal = () => {
    dispatch(hideAllocateTokenModal());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tokenAdd = selectedAssets.map(
      (asset) => asset.token_address || asset.address
    );
    const data = {
      _inheritors: [address],
      _shares: selectedAssets.map((asset) =>
        ethers.utils.parseEther(asset.userTokenAmt)
      ),
      _vaultId: id,
      tokenAdd: tokenAdd[0],
    };
    console.log(data);
    dispatch(allocateTokensAsync(data));
  };

  useEffect(() => {
    // setUserInputs(ethAllocated / 10 ** 18);
    // return () => dispatch(hideAllocateTokenModal());
  }, []);

  //filter out tokens with zero balance and eth

  const filteredTokens = tokens.filter((token) => {
    return token.balance > 0 && token.symbol !== "ETH";
  });

  return (
    <>
      <Modal show={allocateTokenModal} onHide={handleModal}>
        <ModalHeader
          title={`${true ? "Allocate Tokens" : "Update Allocation"}`}
        />
        <MDBody>
          <Form onSubmit={handleSubmit}>
            <Row className="mx-1 mt-4 mb-4">
              <FormControl
                placeholder="Addres"
                name="alias"
                className="mb-4 text-muted"
                value={address}
                disabled
                style={{ backgroundColor: "transparent" }}
              />

              {alias && (
                <FormControl
                  placeholder="Alias"
                  name="alias"
                  value={alias}
                  className="text-muted"
                  disabled
                  style={{ backgroundColor: "transparent" }}
                />
              )}
            </Row>

            {/* <MultiSearchableTokenList
              selectedAssets={selectedAssets}
              assets={filteredTokens}
              latestData={(latest) => setSelectedAssets(latest)}
            /> */}
            <SearchableTokenList
              assets={filteredTokens}
              latestAssetList={(latest) => setSelectedAssets(latest)}
              selectedAssets={selectedAssets}
              // selectedAssets,
            />
            <div className="d-flex justify-content-center align-items-center">
              <CustomButton
                disabled={crud}
                text={`${crud ? "Allocating" : "Allocate"}`}
                size="small"
              />
            </div>
          </Form>
        </MDBody>
      </Modal>
    </>
  );
}

export default AllocateTokenModal;
