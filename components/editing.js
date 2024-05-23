import React, { useState } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons/';
import Armazenamento from '../hooks/banco';

export default function Edita({ isVisible, onClose, carregar }) {
    const [produto, setProduto] = useState('');
    const [quantidade, setQuantidade] = useState('');
    const [valor, setValor] = useState('');

    const { obterItem, salvarItem, generateSequentialId } = Armazenamento();


    async function editar() {
        
    }

    return (
        <Modal transparent={true} visible={isVisible} onRequestClose={onClose}>
            <View style={styles.overlay}>
                <View style={styles.modalContent}>
                    <View style={styles.titleContainer}>
                        <Pressable onPress={onClose}>
                            <Ionicons name={'caret-down-outline'} size={25} color={'#fff'} />
                        </Pressable>
                        {/* RETIRAR DEPOIS A SETINHA PARA CONFIGURAR ESTE MODAL */}
                    </View>
                    <Text style={styles.title1}>Editar item</Text>
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
                    <View style={styles.adicionarButton}>
                        <Pressable style={styles.adicionarButton} onPress={() => enviar()}>
                            <Ionicons style={styles.icone} name={'checkmark-outline'} size={30} color={'#000000'} />
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
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
    },
    adicionarButton: {
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        width: '42%',
        paddingVertical: 1,
        alignSelf: 'center',
    },
    icone: {
        textAlign: 'center',
    },
    quantidadeContainer: {
        marginBottom: 15,
        flexDirection: 'row',
    },
    inputV: {
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 8,
        width: '50%',
        paddingHorizontal: 10,
        marginBottom: 10,
        marginLeft: 15,
    },
    inputQ: {
        height: 40,
        backgroundColor: '#fff',
        width: '45%',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});
    