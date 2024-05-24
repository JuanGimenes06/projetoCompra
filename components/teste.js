
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from '@expo/vector-icons/';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import Edita from "./editing";
import React, { useState, useEffect } from 'react';
import Armazenamento from "../hooks/banco";


export function CaixaToken({ info, deletar, carregar, calcular, editando }) {

    const [visible, setVisible] = useState(false)
    const { obterItem, removerItem, salvarItem } = Armazenamento();



    async function cola(id, produto, valor, quantidade){
        await editando(id,produto,valor,quantidade)
    }



    return (
        <View style={ESTILOS.container}>
            <View style={ESTILOS.caixa}>
                <View style={ESTILOS.textos}>
                    <View style={ESTILOS.produto}>
                        <Text style={ESTILOS.mensagem}>Produto:</Text>
                        <Text style={ESTILOS.texto}>{info.produto}</Text>
                    </View>
                    <View style={ESTILOS.valores}>
                        <Text style={ESTILOS.mensagem}>Preço unitário e quantidade:</Text>
                        <Text style={ESTILOS.texto}>R${info.valor}  X{info.quantidade}</Text>
                    </View>
                </View>
                <View style={ESTILOS.botoes}>
                    <Pressable onPress={() => setVisible(true)}>
                        <View style={ESTILOS.botaoEditar}>
                            <Text style={ESTILOS.textoB}>Editar</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={deletar}>
                        <View style={ESTILOS.botaoRemover}>
                            <Text style={ESTILOS.textoB}>Remover</Text>
                        </View>
                    </Pressable>
                </View>
            </View>


            <Edita
                isVisible={visible}
                onClose={() => setVisible(false)}
                editando={(id, produto, quantidade, valor) => cola(id, produto, quantidade, valor)}
                info={info}
            />

        </View>
    );
}

const ESTILOS = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 40,
        marginRight: 40,
        marginBottom: 30,

    },
    caixa: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: "#fff",
        padding: 10,
        borderRadius: 15,
    },
    textos: {
        flexDirection: "column",
    },
    botoes: {
        flexDirection: "column",
        justifyContent: "space-around",
    },
    mensagem: {
        fontSize: 12,
        opacity: 0.5,
        color: "#000",
    },
    texto: {
        fontSize: 17,
        color: "#000",
    },
    textoB: {
        fontSize: 13,
        color: "#000",
    },
    botaoEditar: {
        backgroundColor: "#f0f0f0",
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 10,
        alignItems: "center",
    },
    botaoRemover: {
        backgroundColor: "#FFD7D7",
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 2,
        paddingBottom: 2,
        borderRadius: 10,
        alignItems: "center",
    }
});









