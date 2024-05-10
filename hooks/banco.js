import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Armazenamento() {

    async function obterItem(chave) {
        try {
            const banco = await AsyncStorage.getItem(chave);
            return JSON.parse(banco) || [];
        }

        catch (erro) {
            alert("Erro ao obter itens", erro)
            return [];
        }
    }

    async function salvarItem(chave, valor) {
        try {
            let banco = await obterItem(chave);
            banco.push(valor);
            await AsyncStorage.setItem(chave, JSON.stringify(banco))

        } catch (erro) {
            alert("Erro ao salvar item", erro)
        }
    }

    

    async function limpar() {
        try {
            await AsyncStorage.clear();
            console.log("Async Storage limpo com sucesso.");
        } catch (error) {
            console.error("Erro ao limpar Async Storage:", error);
        }
    }

    async function removerItem(chave, item) {
        try {
            let banco = await obterItem(chave);
            let bancoAtualizado = banco.filter((token) => {
                return (token !== item)
            })
            await AsyncStorage.setItem(chave, JSON.stringify(bancoAtualizado))
            return bancoAtualizado;

        } catch (erro) {
            alert("Erro ao remover item", erro)
        }
    }

    async function generateSequentialId(chave) {
        try {
            // Obter os dados existentes da chave
            const dadosArmazenados = await AsyncStorage.getItem(chave);
            let objetosExistente = [];

            // Se houver dados, converter para objeto JSON
            if (dadosArmazenados) {
                objetosExistente = JSON.parse(dadosArmazenados);
            }

            // Incrementar o ID baseado no número de objetos existentes
            const novoId = objetosExistente.length + 1;

            return novoId;
        } catch (error) {
            console.error('Erro ao gerar ID sequencial:', error);
            throw error;
        }
    }



    return {
        obterItem,
        salvarItem,
        limpar,
        removerItem,
        generateSequentialId,

    }
}