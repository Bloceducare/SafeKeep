import React from "react";
import { useDispatch } from "react-redux";
import { Btn, Tbody } from "./style";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import DashboardHero from "../../components/DashboardHero";
import CustomSearchInput from "../../components/CustomSearchInput";
import AddModal from "./Components/AddModal";
import { showCreateInheritorsModal } from "../../state/ui";

function Inheritors() {
  const dispatch = useDispatch();

  const handleShow = () => {
    dispatch(showCreateInheritorsModal());
  };

  return (
    <div>
      <AddModal />
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
      <CustomSearchInput />

      <section>
        <table class="table text-white my-4">
          <Tbody>
            <tr>
              <td>Tunde Makinwa</td>
              <td className="d-flex">
                <Btn bvar="danger" cvar="danger">
                  <FaTrashAlt className="mx-1" /> Delete
                </Btn>
                <Btn bvar="edit" cvar="edit">
                  <FaEdit className="mx-1" /> Edit
                </Btn>
              </td>
              <td>50 DAI</td>
            </tr>
            <tr>
              <td>Odebunmi Fiyinfoluwa</td>
              <td className="d-flex">
                <Btn bvar="danger" cvar="danger">
                  <FaTrashAlt className="mx-1" /> Delete
                </Btn>
                <Btn bvar="edit" cvar="edit">
                  <FaEdit className="mx-1" /> Edit
                </Btn>
              </td>
              <td>500 DAI</td>
            </tr>
          </Tbody>
        </table>
      </section>
    </div>
  );
}

export default Inheritors;
