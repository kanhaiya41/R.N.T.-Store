import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setAllItems, setIssueRequest, setMyItems, setRequests, setSubmitRequest } from '../../redux/userMenuSlice';
const Usersidebar = () => {
  const sidebar = () => {
    document.getElementById("Sidenav").style.width = '30vw';
  }
  function closeuserside() {
    document.getElementById("Sidenav").style.width = "0";
  }
  const dispatch = useDispatch();
  const { allItems, myItems, issueRequest, submitRequest, requests } = useSelector(store => store.userMenu);

  const handleUserAction = (setAction) => {
    // Reset all states to false
    dispatch(setAllItems(false));
    dispatch(setMyItems(false));
    dispatch(setIssueRequest(false));
    dispatch(setSubmitRequest(false));
    dispatch(setRequests(false));

    // Set the selected state to true
    dispatch(setAction(true));
    closeuserside();
  };


  return (
    <>
      <div id="Sidenav" className="usersidenav">
        <div className='closebtn'><FontAwesomeIcon icon={faClose} onClick={closeuserside} /></div>
        <div onClick={() => handleUserAction(setAllItems)}>All Items</div>
        <div onClick={() => handleUserAction(setMyItems)}>My items</div>
        <div onClick={() => handleUserAction(setIssueRequest)}>Request to issue</div>
        <div onClick={() => handleUserAction(setSubmitRequest)}>Submit</div>
        <div onClick={() => handleUserAction(setRequests)}>Your Requests</div>
      </div>
      <FontAwesomeIcon icon={faBars} onClick={sidebar} className='menuicon' style={{ marginTop: '1vh', marginLeft: '1vh', position: 'absolute' }} />
    </>
  )
}

export default Usersidebar
