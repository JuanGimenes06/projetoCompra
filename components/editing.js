import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import Armazenamento from '../hooks/banco';

export default function Edita({ isVisible, onClose, editando, info }) {
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const { obterItem, removerItem, limpar } = Armazenamento();


    
        
    async function editar() {
        if (produto === "" || quantidade === "" || valor === "") {
            alert("Preencha tudo")
        } else {
            const id = info.id;
            await editando(id, produto, quantidade, valor)
            alert("Item editado com sucesso")
            onClose()
        }

    }

    return (
        <Modal animationType='fade' transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title1}>Editar item</Text>
                        {/* RETIRAR DEPOIS A SETINHA PARA CONFIGURAR ESTE MODAL */}
                    </View>

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
                            onChangeText={text => setQuantidade(text)}
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
                    <View style={styles.conteinerButton}>
                        <Pressable onPress={() => editar()}>
                            <View style={styles.adicionarButton} >
                                <Ionicons style={styles.icone} name={'checkmark-outline'} size={30} color={'#000000'} />
                            </View>
                        </Pressable>

                        <Pressable onPress={onClose}>
                            <View style={styles.voltarButton} >
                                <Ionicons style={styles.icone} name={'close-outline'} size={30} color={'#000000'} />
                            </View>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#D24343',
        borderRadius: 18,
        padding: 20,
    },
    titleContainer: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginBottom: 20,
    },
    title1: {
        color: '#fff',
        fontSize: 25,
    },
    subtitle: {
        color: '#fff',
        marginBottom: 15,
    },
    inputContainer: {
        marginBottom: 5,
    },
    conteinerButton: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    input: {
        height: 35,
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
        paddingHorizontal: 40,

    },
    voltarButton: {
        backgroundColor: '#FFD7D7',
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 40,
    },
    icone: {
        textAlign: 'center',
    },
    quantidadeContainer: {
        marginBottom: 15,
        justifyContent: "space-between",
        flexDirection: 'row',
    },
    inputV: {
        height: 35,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '48%',
        paddingHorizontal: 10,
        marginBottom: 10,
        elevation: 10,

    },
    inputQ: {
        height: 35,
        backgroundColor: '#fff',
        width: '48%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        elevation: 10,
    },
});
