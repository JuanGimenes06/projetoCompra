import React from "react";
import { Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import Armazenamento from "../hooks/banco";

export function CaixaToken({ info, deletarToken }) {
    return (
        <Pressable style={ESTILOS.caixa}>
            <Text style={ESTILOS.text}>
                {info.produto}
            </Text>
            <TouchableOpacity onPress={deletarToken} style={ESTILOS.botao}>
                <Text style={ESTILOS.textBotao}>Deletar</Text>
            </TouchableOpacity>
        </Pressable>
    );
}

const ESTILOS = StyleSheet.create({
    caixa: {
        backgroundColor: "#0f0f0f",
        padding: 14,
        width: "100%",
        marginBottom: 14,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    botao: {
        backgroundColor: "#FFF",
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25
    },
    text: {
        color: "#fff"
    },
    textBotao: {
        color: "#000"
    }
});
