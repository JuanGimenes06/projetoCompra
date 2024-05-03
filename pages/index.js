import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons/'

export default function Index() {

    const navigation = useNavigation()

    return (
        <View style={styles.conteiner}>
            <View style={styles.conteinerHeader}>

            <Ionicons name={'cart-outline'} size={30} color={'#fff'} />
            <Text style={styles.text}>Listas de Compras</Text>
            
            </View>

            <View style={styles.conteinerMain}></View>

            <View style={styles.conteinerFooter}></View>
        </View>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    conteinerHeader: {
        flex:2/3,
        backgroundColor: "#7A0300",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:   "space-around" ,
    },
    conteinerMain:{
        flex:5,
        backgroundColor: "#fff",
    },
    conteinerFooter: {
        flex:1,
        backgroundColor: "#7A0300",
    },
    text:{
        fontSize: 20,
        color: "#fff",
    }
});
