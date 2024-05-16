import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import Armazenamento from '../hooks/banco';


export default function Compras({ isVisible, onClose, carregar }) {
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const { obterItem, salvarItem, generateSequentialId } = Armazenamento();




    async function salvar() {
        let index = await generateSequentialId("@info")
        let info = { id: index, produto: produto, quantidade: quantidade, valor: valor }
        await salvarItem("@info", info);
        carregar()
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
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do produto"
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
                        placeholder="Valor"
                        value={valor}
                        onChangeText={setValor}
                        keyboardType="numeric"
                    />
                </View>
                <View style={styles.adicionarButton}>
                    <Pressable style={styles.adicionarButton} onPress={() => enviar()}>
                        <Text style={styles.buttonText}>Adicionar</Text>
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
    modalContent: {
        flex: 1,
        backgroundColor: '#7A0300',
        borderTopRightRadius: 18,
        borderTopLeftRadius: 18,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
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
    },
    adicionarButton: {
        backgroundColor: '#047A00',
        borderRadius: 8,
        width: "62%",
        paddingVertical: 10,
        marginLeft: 80,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 18,
    },
    quantidadeContainer: {
        marginBottom: 15,
        flexDirection: "row"
    },
    inputV: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: "50%",
        paddingHorizontal: 10,
        marginBottom: 10,
        marginLeft: 15,
    },
    inputQ: {
        height: 40,
        backgroundColor: '#fff',
        width: "45%",
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
})