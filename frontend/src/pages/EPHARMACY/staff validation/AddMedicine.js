import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import Axios from 'axios'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function AddMedicine() {
    const classes = useStyles();
    const [med, setMed] = useState('');
    const [price, setPrice] = useState(0);
    const [presNeed, setPresNeed] = useState('no');

    const addMedicine = (e) => {
        e.preventDefault()
        Axios.post("http://localhost:3001/addmedicine", {
            mname: med,
            price: price,
            presneed: presNeed
        }).then((res) => {
            if(res.data==='success')
                alert("Medicine Added Successfully")
            else
                alert("Medicine Already Exists")
        }
        );
    }

    const onNameChange = (e) => {
        setMed(e.target.value)
    }

    const onPriceChange = (e) => {
        setPrice(e.target.value)
    }

    const onPresNeedChange = (e) => {
        console.log(presNeed)
        setPresNeed(e.target.value)
    }

    return (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={addMedicine}>
            <TextField id="filled-basic" label="Medicine Name" variant="filled" onChange={onNameChange} />
            <TextField id="filled-basic" label="Price" variant="filled" onChange={onPriceChange} />
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={presNeed}
                onChange={onPresNeedChange}
            >
                <MenuItem value={'yes'}>Yes</MenuItem>
                <MenuItem value={'no'}>No</MenuItem>
            </Select>
            <Button type="submit" style={{ backgroundColor: "#00D8EB" }}>Add Medicine</Button>
        </form>
    );
}
