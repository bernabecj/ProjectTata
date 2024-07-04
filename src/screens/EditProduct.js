import { View, Text } from 'react-native'
import React from 'react'
import { EditProductBody, HomeHeader } from '../components'

const EditProduct = ({ route }) => {
    return (
        <>
            <HomeHeader />
            <EditProductBody route={route} />
        </>
    )
}

export default EditProduct