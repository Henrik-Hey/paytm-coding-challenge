import '../styles/Receipt.css';

import React, { useState, useEffect } from 'react';

import TextField from '../shared/TextField';

const __CURRENCIES__ = ["CAD", "HKD", "ISK", "PHP", "DKK", "HUF", "CZK", "GBP", "RON", "SEK", "IDR", "INR", "BRL", "RUB", "HRK", "JPY", "THB", "CHF", "EUR", "MYR", "BGN", "TRY", "CNY", "NOK", "NZD", "ZAR", "USD", "MXN", "SGD", "AUD", "ILS", "KRW", "PLN"];
const RecieptView = ({ onUpdate }) => {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState("CAD");

    useEffect(() => {
        onUpdate({description, amount, currency});
    }, [description, amount, currency])

    return (
        <div className="card">
            <TextField placeholder="description" label="Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
            <TextField type="number" placeholder="Amount" label="Amount" value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
            <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
                {__CURRENCIES__.map(currKey => <option value={currKey}>{currKey}</option>)}
            </select>
        </div>
    );
}

export default RecieptView;