import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import Armazenamento from '../hooks/banco';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';


export default function Compras({ isVisible, onClose, carregar, calcular }) {
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const { salvarItem, generateSequentialId } = Armazenamento();




    async function salvar() {
        let index = await generateSequentialId("@info")
        console.log(index)
        let info = { id: index, produto: produto, quantidade: quantidade, valor: valor }
        await salvarItem("@info", info);
        await carregar();
        await calcular();

        alert("salvo com sucesso")

        onClose();
    }

    async function enviar() {
        if (produto === "" || quantidade === "" || valor === "") {
            alert("Preencha")
        } else {
            salvar()
        }
    }



    


    return (
        <Modal animationType="slide" transparent={true} visible={isVisible} style={styles.conteiner}>
            <View style={styles.fundo}></View>
            <View style={styles.modalContent}>
                <View style={styles.titleContainer}>
                    <Pressable onPress={onClose}>
                        <Ionicons name={'caret-down-outline'} size={25} color={'#fff'} />
                    </Pressable>
                </View>

                <Text style={styles.title1}>Adicionar</Text>
                <Text style={styles.subtitle}>Produtos</Text>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escreva aqui o nome do produto"
                        value={produto}
                        onChangeText={setProduto}
                    />
                </View>

                <View style={styles.quantidadeContainer}>
                    <TextInput
                        style={styles.inputQ}
                        placeholder="Quantidade"
                        value={quantidade}
                        onChangeText={text => {
                            setQuantidade(text);
                            // Adicione aqui a lógica para calcular o valor com base na quantidade
                            // e atualizar o estado do valor
                        }}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.inputV}
                        placeholder="Valor por unidade"
                        value={valor}
                        onChangeText={setValor}
                        keyboardType="numeric"
                    />
                </View>


                <View style={styles.central}>
                    <Pressable onPress={() => enviar()}>
                        <View style={styles.adicionarButton}>
                            <Ionicons  name={'checkmark-outline'} size={30} color={'#000000'} />
                        </View>
                    </Pressable>
                </View>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    conteiner: {
        flex: 1,
    },
    fundo: {
        flex: 1,
    },
    central: {
        justifyContent: "center",
        width: "100%",
    },
    modalContent: {
        flex: 1,
        backgroundColor: '#D24343',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title1: {
        color: '#fff',
        fontSize: 20,

    },
    subtitle: {
        color: '#fff',
        marginBottom: 15,

    },
    inputContainer: {
        marginBottom: 5,
    },
    input: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        elevation: 10,
    },
    adicionarButton: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 60,

    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 18,
    },
    quantidadeContainer: {
        marginBottom: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    inputV: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: "49%",
        paddingHorizontal: 10,
        elevation: 10,

    },
    inputQ: {
        height: 40,
        backgroundColor: '#fff',
        width: "49%",
        borderRadius: 8,
        paddingHorizontal: 10,
        elevation: 10,

    },
    central: {
        justifyContent: "center",
        flexDirection: "row",
        marginTop: 10,
    }
});