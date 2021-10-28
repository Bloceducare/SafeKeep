
import { useMoralis } from "react-moralis";
import {Button, Modal} from "react-bootstrap"


function IsAuthenticating() {

    const {  isAuthenticating, isLoggingOut} = useMoralis();
    return (
        <>
        <Modal show={isAuthenticating} >
          <Modal.Body style ={{color:'black'}}>
              'isAuthenticating'
          </Modal.Body>
          </Modal>
        </>
    )
}

export default IsAuthenticating
