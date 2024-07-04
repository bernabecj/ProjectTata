import React from 'react'
import { EditProductBody, Header } from '../components'

const EditProduct = ({ route }) => {
    return (
        <>
            <Header />
            <EditProductBody route={route} />
        </>
    )
}

export default EditProduct