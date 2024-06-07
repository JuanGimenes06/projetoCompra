import { StatusBar } from 'expo-status-bar';
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



    const { obterItem, removerItem, limpar, salvarItem, editarItem } = Armazenamento();


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

    const alturaStatusBar = StatusBar.currentHeight




    async function carregar() {
        const info = await obterItem("@info");
        defLista(info);
    }

    useEffect(() => {
        carregar()
        calcularTotal()
    }, []);

    async function calcularTotal() {

        const info = await obterItem("@info");

        if (info.length === 0) {
            defTotal(0)
        }
        else {


            const valores = info.map(objeto => objeto.valor);
            const qtde = info.map(objeto => objeto.quantidade);
            soma = 0;


            for (let i = 0; i < valores.length; i++) {
                soma += valores[i] * qtde[i];

            }
            defTotal(soma);

        }
    }





    async function deletar(item) {
        const id = item.id;
        await removerItem("@info", id);
        carregar()
        calcularTotal()
    }


    async function editar(id, produto, valor, quantidade) {
        const info = await obterItem("@info");
        for (let i = 0; i < info.length; i++) {



            if (info[i].id === id) {

                const item = { produto: produto, valor: Number(valor), quantidade: Number(quantidade) }



                const dadosEditados = await editarItem("@info", id, item)
                defLista(dadosEditados)
                await carregar();
                await calcularTotal()

            }
        }

    }




    return (
        <View style={styles.conteiner} >

            <StatusBar barStyle="white-content" translucent={true} backgroundColor="#D24343" />

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
                            carregar={() => carregar()}
                            calcular={() => calcularTotal()}
                            editando={(id, produto, valor, quantidade) => editar(id, produto, valor, quantidade)}
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
                    calcular={() => calcularTotal()}
                // defAtualiza={defAtualiza}

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
