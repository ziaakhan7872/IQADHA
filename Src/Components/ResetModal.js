import React from 'react';
import
{
    Modal,
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';
import { ResponsiveText, Button } from '../Components';
import { useTheme } from '@react-navigation/native';

const ResetModal = props =>
{
    const colors = useTheme().colors;
    const handleReset = () =>
    {
        props.navigation.navigate('PreRememberQadha',{reset:'reset'})
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.resetOrignal}
            onRequestClose={props.CloseModal}>
            <View style={styles.centeredView}>

                <View style={[styles.modalView,{backgroundColor:colors.background}]}>
                    <TouchableOpacity onPress={props.CloseModal} style={styles.cancel}>
                        <Image source={require('../Assets/Images/cancel.png')}
                            style={[styles.cancelImage, { tintColor: colors.textColor }]} />

                    </TouchableOpacity>
                    <Text style={[styles.warning,{color:colors.textColor}]}>Warning</Text>
                    <ResponsiveText style={[styles.textStyle,{color:colors.textColor}]}>This will reset your Qadha total and take you back to calculator screens.
                        Your history will be saved and your account will not be deleted. it will reset your Qadha
                        totals however. This cannot be changed
                    </ResponsiveText>

                    <Button
                        title={'RESET'}
                        fontColor="#FFFFFF"
                        _onPress={handleReset}
                        titleStyle={{ fontSize: 4 }}
                        btnContainer={{
                            borderRadius: 30,
                            backgroundColor: '#5CB390',
                            width: '80%',
                            marginTop: 30,
                            color: '#fff'

                        }}
                    />
                </View>


            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalView: {
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    cancelImage: {
        width: 20,
        height: 20
    },
    cancel: {
        alignSelf: 'flex-end',
        marginRight:20
    },
    textStyle: {
    fontSize:6
    },
    warning: {
       fontSize: 18,
       marginBottom: 20,
        fontWeight:'bold'
    }
});
export default ResetModal;
