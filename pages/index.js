import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    ScrollView,
    FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons/'
import Compras from '../components/compra';
import { useIsFocused } from '@react-navigation/native';
import Armazenamento from '../hooks/banco';
import { CaixaToken } from '../components/teste';


export default function Index() {

    const [modalVisible, setModalVisible] = useState(false);
    const [listaTokens, defListaTokens] = useState([]);
    const { obterItem, removerItem, salvarItem } = Armazenamento();

    useEffect(() => {
        carregarTokens();
    }, []);

    async function carregarTokens() {
        const info = await obterItem("@info");
        defListaTokens(info || []);
    }

    async function deletarToken(item) {
        try {
            const info = await removerItem("@info", item);
            defListaTokens(info);
            console.log("Item removido com sucesso");
    
        } catch (error) {
            console.error("Erro ao tentar remover o item:", error);
        }
    };
    
    

    async function adicionarToken(novoItem) {
        const info = [...listaTokens, novoItem];
        await salvarItem("@info", info);
        defListaTokens(info);
        console.log("Item adicionado com sucesso");
    }


    return (
        <View style={styles.conteiner}>
            <View style={styles.conteinerHeader}>

                <View style={styles.logo}>
                    <Ionicons name={'cart-outline'} size={23} color={'#fff'} style={{ paddingRight: 5 }} />
                    <Text style={styles.text}>Listas de Compras</Text>
                </View>

            </View>
            <View style={styles.conteinerInfo}>
                <View style={styles.linha}></View>

                <View style={styles.textos}>
                    <Text style={styles.textBlack} >Total da compra:</Text>
                    <Text style={styles.textBlack} >R$ XX.XX</Text>
                </View>

                <View style={styles.linha}></View>
            </View>

            <View style={styles.conteinerMain}>

                <FlatList
                    style={{ flex: 1, paddingTop: 14 }}
                    data={listaTokens}
                    keyExtractor={(item, index) => String(index)} // Usar o índice do item como chave única
                    renderItem={({ item }) => (
                        <CaixaToken
                            info={item}
                            deletarToken={() => deletarToken(item)}  // Passar a função deletarToken como uma propriedade
                            adicionarToken={adicionarToken} // Remover os parênteses
                        />
                    )}
                />


            </View>

            <View style={styles.conteinerFooter}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name={'caret-up-outline'} size={25} color={'#fff'} />
                </TouchableOpacity>

                <Compras isVisible={modalVisible} onClose={() => setModalVisible(false)} adicionarToken={adicionarToken} />

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    conteinerHeader: {
        flex: 2 / 3,
        backgroundColor: "#7A0300",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 10,
        justifyContent: "space-between",

    },
    logo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

    },
    buttonHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    conteinerInfo: {
        alignItems: "center",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        marginTop: 10,
    },
    conteinerMain: {
        flex: 5,
        backgroundColor: "#fff",
    },
    conteinerFooter: {
        flex: 1 / 2,
        backgroundColor: "#7A0300",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row",
    },
    textos: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
    },
    text: {
        fontSize: 16,
        color: "#fff",
    },
    textBlack: {
        fontSize: 16,
        color: "#000",
    },
    linha: {
        width: "100%",
        height: 2,
        backgroundColor: "#7A0300",

    }
});
