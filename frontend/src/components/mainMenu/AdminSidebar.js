import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { setAllItems, setIssueRequest, setMyItems, setRequests, setSubmitRequest } from '../../redux/userMenuSlice';
import { setAddStock, setApprovel, setIssue, setSoldOut, setSubmit } from '../../redux/adminMenuSlice';
const AdminSidebar = () => {
  const sidebar = () => {
    document.getElementById("Sidenav").style.width = '30vw';
  }
  function closeuserside() {
    document.getElementById("Sidenav").style.width = "0";
  }
  const dispatch = useDispatch();

  const { allItems } = useSelector(store => store.userMenu);
  const { addStock, issue, submit, approvel, soldOut, } = useSelector(store => store.adminMenu);

  const handleUserAction = (setAction) => {
    // Reset all states to false
    dispatch(setAddStock(false));
    dispatch(setAllItems(false));
    dispatch(setIssue(false));
    dispatch(setSubmit(false));
    dispatch(setApprovel(false));
    dispatch(setSoldOut(false));

    // Set the selected state to true
    dispatch(setAction(true));
    console.log(setAction);
  };


  return (
    <>
      <div id="Sidenav" className="usersidenav">
        <div className='closebtn'><FontAwesomeIcon icon={faClose}
          onClick={closeuserside}
        /></div>
        <div
          onClick={() => handleUserAction(setAddStock)}
        >Add Stock</div>
        <div
          onClick={() => handleUserAction(setAllItems)}
        >All Items</div>
        <div
          onClick={() => handleUserAction(setIssue)}
        >Issue</div>
        <div
          onClick={() => handleUserAction(setSubmit)}
        >Submit</div>
        <div
          onClick={() => handleUserAction(setApprovel)}
        >Approvel</div>
        <div
          onClick={() => handleUserAction(setSoldOut)}
        >Sold Out</div>
      </div>
      <FontAwesomeIcon icon={faBars}
        onClick={sidebar}
        className='menuicon' style={{ marginTop: '1vh', marginLeft: '1vh', position: 'absolute',zIndex:10 }} />
    </>
  )
}

export default AdminSidebar
