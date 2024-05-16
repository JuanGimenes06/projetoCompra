import React from "react";
import { Text, StyleSheet, Pressable, View } from "react-native";
import { Ionicons } from '@expo/vector-icons/';

export function CaixaToken({ info, deletar }) {
    return (
        <View style={ESTILOS.container}>
            <Pressable style={ESTILOS.caixa}>
                <Text style={ESTILOS.text}>
                    {info.produto}
                </Text>
                <Pressable onPress={deletar}>
                    <Ionicons name={'close-outline'} size={23} color={'#FF0000'} />
                </Pressable>
            </Pressable>

            <View style={ESTILOS.valorContainer}>
                <Text style={ESTILOS.label}>Valor:</Text>
                <Text style={ESTILOS.valor}>
                    R${info.valor}
                </Text>
            </View>
            <View style={ESTILOS.quantidadeContainer}>
                <Text style={ESTILOS.label}>Quantidade:</Text>
                <Text style={ESTILOS.quantidade}>
                    {info.quantidade}
                </Text>
            </View>
        </View>
    );
}

const ESTILOS = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 16,
    },
    caixa: {
        backgroundColor: "#CACACA",
        height: 75,
        padding: 14,
        width: "55%", // ajuste a largura conforme necessário
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 6,
        marginBottom: 5,
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        color: "#000000"
    },
    quantidadeContainer: {
        flexDirection: "column",
        alignItems: "center", // centraliza os elementos no contêiner
        marginLeft: 25, // ajuste o espaço entre a caixa e o valor conforme necessário
    },
    valorContainer: {
        flexDirection: "column",
        alignItems: "center", // centraliza os elementos no contêiner
        marginLeft: 45, // ajuste o espaço entre a caixa e o valor conforme necessário
    },
    label: {
        fontSize: 12,
        color: "#000000",
        marginBottom: 2, // adicione uma pequena margem inferior para separar a label do valor
    },
    valor: {
        fontSize: 14,
        color: "#000000",
    },
});









