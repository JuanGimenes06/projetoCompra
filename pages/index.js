// import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons/'
import Compras from '../components/compra';
import Armazenamento from '../hooks/banco';
import { CaixaToken } from '../components/teste';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import Edita from '../components/editing';




export default function Index() {

    const [modalVisible, setModalVisible] = useState(false);
    const [lista, defLista] = useState([]);
    const [total, defTotal] = useState(0);
    const [visible, setVisible] = useState(false)



    const { obterItem, removerItem } = Armazenamento();

    let soma = 0.00;

    // const [fontsLoaded, fontError] = useFonts({
    //     'Inder': require('../assets/fonts/Inder/Inder-Regular.ttf'),
    // });

    // const onLayoutRootView = useCallback(async () => {
    //     if (fontsLoaded || fontError) {
    //         await SplashScreen.hideAsync();
    //         carregar();
    //     }
    // }, [fontsLoaded, fontError]);

    // if (!fontsLoaded && !fontError) {
    //     return null;
    // }




    async function calcularTotal() {
        if (lista.length === 0) {
            defTotal(0.00)
        } else {
            const info = await obterItem("@info");
            defLista(info);

            const valores = lista.map(objeto => objeto.valor);
            const qtde = lista.map(objeto => objeto.quantidade);

            for (let i = 0; i < valores.length; i++) {

                soma += valores[i] * qtde[i];
                defTotal(soma);
            }
        }
    }

    async function carregar() {
        const info = await obterItem("@info");
        defLista(info);
    }

    useEffect(() => {
        carregar()
    }, []);

    useEffect(() => {
        calcularTotal();
    }, [lista]);





    async function deletar(item) {
        const id = item.id;
        await removerItem("@info", id);
        carregar()
    }






    return (
        <View style={styles.conteiner} >

            <View style={styles.conteinerHeader}>
                <View style={styles.logo} >
                    <Ionicons name={'cart-outline'} size={23} color={'#fff'} style={{ paddingRight: 5 }} />
                    <Text style={styles.text}>Listas de Compras</Text>
                </View>
            </View>

            <View style={styles.conteinerInfo}>
                <View style={styles.linha}></View>

                <View style={styles.textos}>
                    <Text style={styles.textBlack} >Total da compra:</Text>
                    <Text style={styles.textBold} >R${total}</Text>
                </View>

                <View style={styles.linha}></View>
            </View>

            <View style={styles.conteinerMain}>

                <FlatList
                    style={{ flex: 1, paddingTop: 14 }}
                    data={lista}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CaixaToken
                            info={item}
                            deletar={() => deletar(item)}


                        />
                    )}
                />


            </View>

            <View style={styles.conteinerFooter}>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Ionicons name={'caret-up-outline'} size={25} color={'#fff'} />
                </TouchableOpacity>

                <Compras
                    isVisible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    carregar={() => carregar()}
                // defAtualiza={defAtualiza}

                />

                <Edita
                    isVisible={visible}
                    onClose={() => setVisible(false)}
                />

            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
        backgroundColor: "#f0f0f0",
    },
    conteinerHeader: {
        flex: 2 / 3,
        backgroundColor: "#D24343",
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
        backgroundColor: "#f0f0f0",
    },
    conteinerFooter: {
        flex: 1 / 2,
        backgroundColor: "#D24343",
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
        // fontFamily: "Inder",
        color: "#fff",
    },
    textBlack: {
        fontSize: 16,
        // fontFamily: "Inder",
        color: "#000",
    },
    textBold: {
        fontSize: 16,
        // fontFamily: "Inder",
        fontWeight: "bold",
        color: "#000",
    },
    linha: {
        width: "100%",
        height: 2,
        backgroundColor: "#D24343",

    }
});
