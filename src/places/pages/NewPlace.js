import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
    return (
        <form className="place-form">
            {/**
             * validation component
             */}
            <Input element="input" type="text" label="Title" validator={[]} validators={[]} errorText="Please enter a valid title" />
        </form>
    );
};

export default NewPlace;
