import {
  IExecuteFunctions,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";
// Removida a importação do 'axios', pois usaremos o helper nativo do n8n

export class Random implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Random",
    name: "random",
    group: ["transform"],
    version: 1,
    description: "Gera um número entre {min} e {max} através da API Random.org",
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
        description: "Menor valor possível (ele mesmo incluído)",
      },
      {
        displayName: "Max",
        name: "max",
        type: "number",
        default: 100,
        description: "Menor valor possível (ele mesmo incluído)",
      },
    ],
  };

  async execute(this: IExecuteFunctions) {
    const items = this.getInputData();
    const returnData: any[] = [];

    for (let i = 0; i < items.length; i++) {
      const min = this.getNodeParameter("min", i) as number;
      const max = this.getNodeParameter("max", i) as number;

      const apiUrl = `https://www.random.org/integers/?num=1&min=${min}&max=${max}&col=1&base=10&format=plain&rnd=new`;

      try {
        // USANDO O HELPER DE REQUISIÇÃO DO N8N (this.helpers.request)
        const responseText = await this.helpers.request({
          method: "GET",
          url: apiUrl,
          json: false,
        });

        // Converte a resposta (string) para um número (int)
        const randomNumber = parseInt(responseText.trim(), 10);

        // Constrói a saída
        returnData.push({
          json: {
            ...items[i].json,
            randomNumber, // Adiciona a nossa resposta (randomNumber)
          },
          pairedItem: {
            item: i,
          },
        });
      } catch (error) {
        this.logger.error("Não foi possível obter um número do Random.org", {
          details: error,
          stack: (error as any).stack,
        });
        throw new Error("Não foi possível obter um número do Random.org");
      }
    }

    // Retorna a lista de itens processados
    return [returnData];
  }
}
