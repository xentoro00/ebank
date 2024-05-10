import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../admin/Dashboard/Sidebar';
import { useNavigate } from 'react-router-dom';

export const ManageAccounts = () => {
    const [mess, setMess] = useState([]);
    const [numMess, setNumMess] = useState(0); 

    useEffect(() => {
        getMess();
    }, []);

    const navigate = useNavigate();

    const getMess = () => {
        axios.post('http://localhost:8080/getAccounts')
            .then(res => {
                const fetchedMess = res.data;
                setMess(fetchedMess);
                setNumMess(fetchedMess.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8080/deleteAccounts/${id}`)
            .then(res => {
                getMess();
            })
            .catch(err => console.log(err));
    };

    return (
        <div> 
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />

                <div className="container-fluid " style={{  marginTop: '100px' }} >
                    <h1 className=''>MANAGE Accounts</h1>
                    <div className="row">
                        <caption>List of Messages</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">AccountID</th>
                                        <th scope="col">UserId</th>
                                        <th scope="col">CurrentAccount</th>
                                        <th scope="col">Balance</th> 
                                        <th scope="col">Action</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(mess) && mess.map((item, index) => (
                                        <tr key={item.AccountID}>
                                            <th scope="row">{item.AccountID}</th> 
                                            <td>{item.UserID}</td>
                                            <td>{item.CurrentAccount}</td>
                                            <td>{parseFloat(item.Balance).toFixed(2)}</td> 
                                            <td>
                                                <button onClick={() => handleDelete(item.AccountID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total message: {numMess}</div> 
                </div>
            </main>
        </div>
    )
}

export default ManageAccounts;
