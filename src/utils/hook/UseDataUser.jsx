import React from 'react'

export const UseDataUser = () => {
    const [dataUser, setDataUser] = React.useState('');
    const [error, setError] = React.useState(false);

    const handleChange = ({ target: { name, value } }) => setDataUser({ ...dataUser, [name]: value });

    return {handleChange, dataUser, error, setError}
}
