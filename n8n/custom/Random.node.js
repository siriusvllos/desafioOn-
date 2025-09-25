"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Random = void 0;
// Removida a importação do 'axios', pois usaremos o helper nativo do n8n
class Random {
    constructor() {
        this.description = {
            displayName: "Random",
            name: "random",
            group: ["transform"],
            version: 1,
            description: "Generates a true random number using Random.org",
            defaults: {
                name: "Random",
            },
            inputs: ["main"],
            outputs: ["main"],
            icon: "file:random.svg",
            properties: [
                {
                    displayName: "Operation",
                    name: "operation",
                    type: "options",
                    noDataExpression: true,
                    options: [
                        {
                            name: "True Random Number Generator",
                            value: "trueRandomNumberGenerator",
                        },
                    ],
                    default: "trueRandomNumberGenerator",
                },
                {
                    displayName: "Min",
                    name: "min",
                    type: "number",
                    default: 1,
                    description: "The minimum value (inclusive).",
                },
                {
                    displayName: "Max",
                    name: "max",
                    type: "number",
                    default: 100,
                    description: "The maximum value (inclusive).",
                },
            ],
        };
    }
    async execute() {
        // 1. Obtém todos os itens de entrada para processamento em loop
        const items = this.getInputData();
        const returnData = [];
        // 2. Itera sobre cada item de entrada para gerar um número aleatório para cada
        for (let i = 0; i < items.length; i++) {
            // Obtém os parâmetros Min e Max, avaliando-os para o item atual (índice i)
            const min = this.getNodeParameter("min", i);
            const max = this.getNodeParameter("max", i);
            // Constrói a URL da API do Random.org com os parâmetros
            const apiUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;
            try {
                // USANDO O HELPER DE REQUISIÇÃO DO N8N (this.helpers.request)
                // Ele lida com a requisição GET, erros de rede/HTTP e proxy,
                // e como a resposta é texto, usamos 'json: false'
                const responseText = await this.helpers.request({
                    method: "GET",
                    url: apiUrl,
                    json: false, // O Random.org retorna apenas um número, não um JSON
                });
                // Converte a resposta de texto (string) para um número inteiro
                const randomNumber = parseInt(responseText.trim(), 10);
                // 3. Constrói o item de saída
                returnData.push({
                    json: {
                        ...items[i].json, // Preserva os dados JSON originais
                        randomNumber, // Adiciona o novo campo
                    },
                    // Associa o item de saída ao item de entrada para manter o rastreamento
                    pairedItem: {
                        item: i,
                    },
                });
            }
            catch (error) {
                // Lógica robusta de registro de erro e lançamento para falhar a execução do nó
                this.logger.error("Failed to get a random number from Random.org.", {
                    details: error,
                    stack: error.stack,
                });
                throw new Error("Failed to get a random number from Random.org.");
            }
        }
        // 4. Retorna a lista de itens processados
        return [returnData];
    }
}
exports.Random = Random;
