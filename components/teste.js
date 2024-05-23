import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from '@expo/vector-icons/';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';

export function CaixaToken({ info, deletar }) {

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
                    <Pressable >
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
        fontSize: 10,
        opacity: 0.5,
        color: "#000",
    },
    texto: {
        fontSize: 15,
        color: "#000",
    },
    textoB: {
        fontSize: 10,
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









