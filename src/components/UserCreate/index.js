import React from 'react'
import { useState } from 'react';
import { userService } from '../../APIs/Services/User';
import { useUsersContext } from '../../context/User';
import Modal from '../Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

const uuid = require('uuid')

const UserCreate = ({ onClose }) => {

    const [{ handleClose, setUsers }] = useUsersContext();

    const [customRole, setCustomRole] = useState();

    const [data, setData] = useState({
        id: uuid.v4(),
        name: "",
        surname: "",
        balance: 0,
        date: new Date()
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === "genderId") {
            const value = (parseInt(e.target.value)) || 0;
            setCustomRole({ ...customRole, [name]: value })
            setData({ ...data, [name]: value });
        } else {
            setCustomRole({ ...customRole, [name]: value })
            setData({ ...data, [name]: value });
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        userService.createNewUser(data);
        userService.getAllUsers().then(({ data }) => setUsers(data));
        onClose();

    }

    return (
        <Modal onClose={handleClose} >
            <form onSubmit={handleSubmit}>
                <input onChange={handleChange} type="text" name="name" id="name" placeholder='Enter your Name' />
                <input onChange={handleChange} type="text" name="surname" id="surname" placeholder='Enter your Surname' />
                <input onChange={handleChange} type="text" name="cart" id="cart" placeholder='Enter your Cart' />
                <input onChange={handleChange} value={data.balance || ''} type="number" name="balance" id="balance" placeholder='Enter your Balance' />
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel onChange={handleChange} name="genderId"
                        value="1" control={<Radio />} label="Man" />

                    <FormControlLabel onChange={handleChange} name="genderId"
                        value="2" control={<Radio />} label="Female" />
                </RadioGroup>
                <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group">
                    <FormControlLabel onChange={handleChange} name="cart"
                        value="false" control={<Radio />} label="No cart" />

                    <FormControlLabel onChange={handleChange} name="cart"
                        value="true" control={<Radio />} label="Yes cart" />
                </RadioGroup>
                <button type='submit'>Click</button>
            </form>
        </Modal>
    )
}

export default UserCreate