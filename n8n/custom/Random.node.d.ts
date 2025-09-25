import { IExecuteFunctions, INodeType, INodeTypeDescription } from "n8n-workflow";
export declare class Random implements INodeType {
    description: INodeTypeDescription;
    execute(this: IExecuteFunctions): Promise<any[][]>;
}
