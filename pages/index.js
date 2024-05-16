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
    FlatList,
    Pressable
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons/'
import Compras from '../components/compra';
import Armazenamento from '../hooks/banco';
import { useIsFocused } from '@react-navigation/native';
import { CaixaToken } from '../components/teste';




export default function Index() {

    const [modalVisible, setModalVisible] = useState(false);
    const [lista, defLista] = useState([]);
    const [total, defTotal] = useState(0)
    const [atualiza, defAtualiza] = useState(false);

    const telaAtiva = useIsFocused();


    const { obterItem, salvarItem, limpar, removerItem, generateSequentialId } = Armazenamento();

    let soma = 0.00;

    useEffect(() => {
        carregar()
    }, [telaAtiva])

    useEffect(() => {
        calcularTotal();
    }, [lista]);

    async function atualizar(){
        carregar();
        calcularTotal();
        console.log("carregou")
    }

    async function carregar() {
        const info = await obterItem("@info");
        defLista(info);}

    async function deletar(item) {
        const id = item.id;
        await removerItem("@info", id);
        carregar()}

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
                    <Text style={styles.textBlack} >R${total}</Text>
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
