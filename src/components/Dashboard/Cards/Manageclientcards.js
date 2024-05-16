import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar';
import { useNavigate } from 'react-router-dom';
import EditCards from './EditCards';


export const Manageclientcards = () => {
    const [cards, setCards] = useState([]);
    const [numCards, setNumCards] = useState(0); 
    const [editCards, setEditCardsId] = useState(null); 

    useEffect(() => {
        getCards();
    }, []);

    const navigate = useNavigate();

    const getCards = () => {
        axios.post('http://localhost:8080/getCardsclients')
            .then(res => {
                const fetchedCards = res.data;
                setCards(fetchedCards);
                setNumCards(fetchedCards.length); 
            })
            .catch(err => console.log(err));
    };

    const handleDelete = (cardId) => {
        axios.delete(`http://localhost:8080/deleteCard/${cardId}`)
            .then(res => {
                getCards();
            })
            .catch(err => console.log(err));
    };

    const handleEdit = (id) => {
        setEditCardsId(id); 
    };

    const handleCloseEditModal = () => {
        setEditCardsId(null); 
    };

    const maskCardNumber = (cardNumber) => {
        if (cardNumber.length <= 10) {
          return '****'.repeat(Math.max(0, Math.ceil(cardNumber.length / 4))); 
        }
        const visibleDigits = 6;
        const masked = cardNumber.slice(0, visibleDigits) + '*'.repeat(cardNumber.length - visibleDigits - 4) + cardNumber.slice(-4);
        return masked;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    };
    // const transferBalance = (cardId) => {
    //     axios.post('http://localhost:8080/transferBalance')
    //         .then(res => {
    //             alert(res.data); 
    //             getCards();
    //         })
    //         .catch(err => console.log(err));
    // };

    return (
        <div> 
            <main style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'white', color: 'black' }}>
                <Sidebar />
                <div className="container-fluid" style={{ marginTop: '100px' }}>
                    <h1>MANAGE CARDS</h1>
                    <div className="row">
                        <caption>List of Cards</caption>
                        <div className="col-md-12 d-flex justify-content-center align-items-center">
                            <table className="table table-hover table-bordered table-striped dataTable no-footer" style={{ width: '100%' }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Card ID</th>
                                        <th scope="col">User Id</th>
                                        <th scope="col">Card Number</th>
                                        <th scope="col">Card Holder Name</th>
                                        <th scope="col">Valid From</th>
                                        <th scope="col">Valid Util</th>
                                        <th scope="col">Card Type</th>
                                        <th scope="col">Card Status</th>
                                        {/* <th scope="col">Available Balance</th> */}
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(cards) && cards.map((card, index) => (
                                        <tr key={card.CardID}>
                                            <th scope="row">{card.CardID}</th>
                                            <td>{card.UserID}</td>
                                            <td>{maskCardNumber(card.CardNumber)}</td>
                                            <td>{card.CardHolderName}</td>
                                            <td>{formatDate(card.ValidFrom)}</td>
                                            <td>{formatDate(card.ExpiryDate)}</td>
                                            <td>{card.CardType}</td>
                                            <td>{card.CardStatus}</td>
                                            {/* <td>{card.AvailableBalance}</td> */}
                                            <td>
                                                 <button onClick={() => handleEdit(card.CardID)} className="btn btn-primary mr-2">Edit</button>
                                                <button onClick={() => handleDelete(card.CardID)} className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>Total Cards: {numCards}</div> 
                    {editCards !== null && <EditCards id={editCards} onClose={handleCloseEditModal} />}

                </div>
            </main>
        </div>
    );
};

export default Manageclientcards;
