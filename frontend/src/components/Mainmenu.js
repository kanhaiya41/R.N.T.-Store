import React from 'react'
import Navbar from './Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faClose } from '@fortawesome/free-solid-svg-icons'
import Usersidebar from './mainMenu/Usersidebar'
import { useSelector } from 'react-redux'
import AllItems from './mainMenu/AllItems'
import MyItems from './mainMenu/MyItems'
import RequestItem from './mainMenu/RequestItem'
import SubmitItems from './mainMenu/SubmitItems'
import Requests from './mainMenu/Requests'
import AdminSidebar from './mainMenu/AdminSidebar'
import AddItems from './mainMenu/AddItems'
import Issue from './mainMenu/Issue'
import Submit from './mainMenu/Submit'
import Approvel from './mainMenu/Approvel'
import SoldOut from './mainMenu/SoldOut'
import store from '../redux/store'
import NoUser from './mainMenu/NoUser'
const Mainmenu = () => {
  const { allItems, myItems, issueRequest, submitRequest, requests } = useSelector(store => store.userMenu);
  const { addStock, issue, submit, approvel, soldOut } = useSelector(store => store.adminMenu);
  const {user,userType}=useSelector(store=>store.user);

  return (
    <>
      <Navbar />

      {
        user? (<>
        {
          userType==='Admin'?
          (
            <>
            <AdminSidebar />
      {
        addStock && <AddItems />
      }
      {
        allItems && <AllItems />
      }
      {
        issue && <Issue />
      }
      {
        submit && <Submit />
      }
      {
        approvel && <Approvel />
      }
      {
        soldOut && <SoldOut />
      }
            </>
          ):(
            <>
            <Usersidebar />
        {
          allItems &&<AllItems/> 
        }
        {
          myItems &&<MyItems/> 
        }
        {
          issueRequest &&<RequestItem/> 
        }
        {
          submitRequest &&<SubmitItems/> 
        }
        {
          requests &&<Requests/> 
        }
            </>
          )
        }
        </>) :
        
          <NoUser/>
        
      }

    

      

      

    </>
  )
}

export default Mainmenu
