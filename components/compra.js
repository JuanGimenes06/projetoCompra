import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import Armazenamento from '../hooks/banco';


export default function Compras({ isVisible, onClose, adicionar }) {
    const [prod, setProd] = useState('');
    const [quant, setQuant] = useState('');
    const [val, setVal] = useState('');

    const { obterItem, salvarItem, generateSequentialId } = Armazenamento();




    async function salvar() {
        let ind = await generateSequentialId("@info")
        console.log(ind)
        let info = { id: ind, produto: prod, quantidade: quant, valor: val }

        await adicionar(info);
        alert("salvo com sucesso")
        onClose();
    }

    async function enviar() {
        if (prod === "" || quant === "" || val === "") {
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
                        value={prod}
                        onChangeText={setProd}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Quantidade"
                        value={quant}
                        onChangeText={text => {
                            setQuant(text);
                            // Adicione aqui a lógica para calcular o valor com base na quantidade
                            // e atualizar o estado do valor
                        }}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Valor"
                        value={val}
                        onChangeText={setVal}
                        keyboardType="numeric"
                    />
                </View>
                <Pressable style={styles.adicionarButton} onPress={() => enviar()}>
                    <Text style={styles.buttonText}>Adicionar</Text>
                </Pressable>
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
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    adicionarButton: {
        backgroundColor: '#047A00',
        borderRadius: 8,
        paddingVertical: 12,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});