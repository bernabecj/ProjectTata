import { StyleSheet } from 'react-native';
import { COLORS, SIZES, FONT } from '../../../constants';

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.navBarColor,
        paddingBottom: 30,
        paddingTop: SIZES.statusBarHeight
    },
});

export default styles;