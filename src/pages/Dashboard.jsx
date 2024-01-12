// import React, { useEffect, useState } from 'react'
// import AddInvoice from '../components/AddInvoice'
// import InvoiceComponent from '../components/InvoiceComponent'
// import { useDispatch, useSelector } from 'react-redux'
// import FormModal from '../components/FormModal'
// import { Backdrop, CircularProgress } from '@mui/material'
// import { startLoader, stopLoader } from '../store/loader'
// import service from '../appwrite/config'
// import { getInvoiceData } from '../store/invoiceDataSlice'

// const Dashboard = () => {
//   useEffect(() => {

//     async function fetchData() {
//       try {
//         dispatch(startLoader())
//         const setInvoiceData = await service.getInvoice(id);
//         console.log(setInvoiceData.documents);
//         if(setInvoiceData.documents.length>0){
//           dispatch(getInvoiceData(setInvoiceData.documents))
//         }

//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }finally{
//         dispatch(stopLoader())
//       }
//     }

//     fetchData();
//   }, []);
//   const dispatch = useDispatch()
//   const items = JSON.parse(localStorage.getItem('getInvoice'));
//   const [filter,setFilter] = useState({
//     isPending:false,
//     isPaid:false,
//     isDraft:false,
//   })
//   const [filterData,setFilterData] = useState([])
//   const [open, setOpen] = React.useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
//   const isLoading = useSelector((state) => state.loader.status);
//   const userData = useSelector((state) => state.auth.userData?.$id);
//   const id = userData?.toString();
//   const invoiceData =  useSelector((state) => state.invoice.invoiceData) 

//   useEffect(()=>{
//     setFilterData(items.filter((item)=> item.status === (filter.isPending?"pending":filter.isPaid?"paid":filter.isDraft&&"draft")))
//   },[filter])


//   console.log("filterData", filterData);
//   // console.log(invoiceData);


//   return (
//     <div className='max-w-4xl mx-auto'>
//         <Backdrop
//           sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//           open={isLoading}
//         >
//           <CircularProgress color="inherit" />
//         </Backdrop>
//         <AddInvoice invoiceCount = {invoiceData.length} handleOpen={handleOpen} filter={filter} setFilter={setFilter}/>

//         <FormModal handleOpen={handleOpen} handleClose={handleClose} open={open} invoiceData={invoiceData} id={id}/>

//         {filterData.length>0 ?
//         <div>
//           {filterData.map((item)=>{
//             return(
//                 <div key={item.$id}>
//                     <InvoiceComponent id={item.$id} createdAt={item.$createdAt} clientName={item.clientName} status={item.status} total={item.items}/>
//                 </div>
//             )
//         })}
//         </div>
//           :
//           invoiceData.length>0?<div >
//         {invoiceData.map((item)=>{
//             return(
//                 <div key={item.$id}>
//                     <InvoiceComponent id={item.$id} createdAt={item.$createdAt} clientName={item.clientName} status={item.status} total={item.items}/>
//                 </div>
//             )
//         })}
//         </div> 
//         : 
        
//         <div>
//             <img src='/assets/illustration-empty.svg' alt='' className='mx-auto mt-20'/>
//             <h1 className='text-[#0C0E16] text-[24px] font-bold text-center my-5'>There is nothing here</h1>
//             <p className='text-[#888EB0] text-[13px] font-medium text-center'>  Create an invoice by clicking the <span className='font-bold'>New Invoice </span>button and get started</p>
//         </div>
//         }
//     </div>
//   )
// }

// export default Dashboard


import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop, CircularProgress } from '@mui/material';
import service from '../appwrite/config';
import { startLoader, stopLoader } from '../store/loader';
import { getInvoiceData } from '../store/invoiceDataSlice';
import AddInvoice from '../components/AddInvoice';
import InvoiceComponent from '../components/InvoiceComponent';
import FormModal from '../components/FormModal';
import ThemeContext from '../context/ThemeContext';

const Dashboard = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loader.status);
  const userData = useSelector((state) => state.auth.userData?.$id);
  const id = userData?.toString();
  const invoiceData = useSelector((state) => state.invoice.invoiceData);
  const items = JSON.parse(localStorage.getItem('getInvoice'));
  const userEmail = useSelector(state => state.auth.userData?.email)


  const [filter, setFilter] = useState({
    isPending: false,
    isPaid: false,
    isDraft: false,
  });
  const [filterData, setFilterData] = useState([]);
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(startLoader());
        const setInvoiceData = await service.getInvoice(id);
        console.log(setInvoiceData.documents);
        if (setInvoiceData.documents.length > 0) {
          dispatch(getInvoiceData(setInvoiceData.documents));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        dispatch(stopLoader());
      }
    };

    fetchData();
  }, [dispatch, id]);

  useEffect(() => {
    setFilterData(items.filter((item) => item.status === (filter.isPending ? 'pending' : filter.isPaid ? 'paid' : filter.isDraft && 'draft')));
  }, [filter]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderInvoices = filterData.length > 0 ? filterData : invoiceData;

  const {theme} = useContext(ThemeContext)


  return (
    <div className={`max-w-4xl mx-auto p-6 lg:p-auto `}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <h1 className={`${theme?"text-[#fff]":"text-[#0C0E16]"}  text-[24px] lg:text-[36px] font-bold`}>Welcome <span className='text-[#7C5DFA]'>{userEmail?.substring(0, userEmail?.indexOf('@'))}</span></h1>

      <AddInvoice invoiceCount={invoiceData.length} handleOpen={handleOpen} filter={filter} setFilter={setFilter} />
      <FormModal handleOpen={handleOpen} handleClose={handleClose} open={open} invoiceData={invoiceData} id={id} addNew={true} />

      {renderInvoices.length > 0 ? (
        <div >
          {renderInvoices.map((item) => (
            <div  key={item.$id}>
              <InvoiceComponent id={item.$id} createdAt={item.$createdAt} clientName={item.clientName} status={item.status} total={item.items} />
            </div>
          ))}
        </div>
      ) : (
        <div>
          <img src="/assets/illustration-empty.svg" alt="" className="mx-auto mt-20" />
          <h1 className="text-[#0C0E16] text-[24px] font-bold text-center my-5">There is nothing here</h1>
          <p className="text-[#888EB0] text-[13px] font-medium text-center">
            Create an invoice by clicking the <span className="font-bold">New Invoice </span>button and get started
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
