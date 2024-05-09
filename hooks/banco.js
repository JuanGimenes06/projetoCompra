import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Armazenamento() {

    async function obterItem(chave) {
        try {
            const tokens = await AsyncStorage.getItem(chave);
            return JSON.parse(tokens) || [];
        }

        catch (erro) {
            alert("Erro ao obter itens", erro)
            return [];
        }
    }

    async function salvarItem(chave, valor) {
        try {
            let tokens = await obterItem(chave);
            tokens.push(valor);
            await AsyncStorage.setItem(chave, JSON.stringify(tokens))

        } catch (erro) {
            alert("Erro ao salvar item", erro)
        }
    }

    async function removerItem(chave, item) {
        try {
            let tokens = await obterItem(chave);
            let tokensAtualizados = tokens.filter((token) => {
                return token.produto !== item.produto; // Usando 'produto' como identificador único
            });
            await AsyncStorage.setItem(chave, JSON.stringify(tokensAtualizados));
            console.log("foi?");
            return tokensAtualizados;
        } catch (erro) {
            alert("Erro ao remover item", erro);
        }
    }
    





    return {
        obterItem,
        salvarItem,
        removerItem,

    }
}