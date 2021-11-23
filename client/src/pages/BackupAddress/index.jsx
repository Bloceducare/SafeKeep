import React, {useState, useEffect} from 'react'
import CustomButton from '../../components/Button'
import CustomInput from '../../components/CustomInput'
import { CurrentAddress, Table } from './style'

function BackupAddress() {

  const [backupAddress, setBackupAddress] = useState('')
  

  const handleChange = (e)=>{
    setBackupAddress(e.target.value)
  }
  const updateBackupAddress = (e)=>{
    
    
    
  }
    return (
        <div>
             <div>          
          <p>         
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod temporincididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
          </div>
            <section>
            <form onSubmit = {updateBackupAddress} >
          <CustomInput placeholder ='Input Address' />

            <div  className ='my-4 d-flex justify-content-center align-items-center'>
          <CustomButton text ='Update' value = {backupAddress} onChange = {handleChange}  />
          </div>
          </form>
          </section>
          

          <section>
              <p className ='text-muted' style ={{
                  marginBottom:'-0.01rem'
              }}>Current Address</p>
              <CurrentAddress>
              0xbcaAB35233Ec7305D83C0A5b25d4d20C60B38Fb4
              </CurrentAddress>
          </section>

  
  <section>
  <Table className="table borderless gig-table-section">
  <p className ='text-muted'>Current Address</p>
  <tbody>
    <tr >
      <td className='user-name'> 0xbcaAB35233Ec7305D83C0A5b25d4d20C60B38Fb4</td>
      <td className='user-table-details'>10 : 13 : 16 AM</td>
      <td className='user-table-details'>12 - 20 - 20</td>
    </tr>

    <tr className=''>
      <td className='user-name'> 0xbcaAB35233Ec7305D83C0A5b25d4d20C60B38Fb4</td>
      <td className='user-table-details'>10 : 13 : 16 AM</td>
      <td className='user-table-details'>12 - 20 - 20</td>
    </tr>


  </tbody>
  </Table>

          </section>
        </div>
    )
}

export default BackupAddress
