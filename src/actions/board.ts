import { NodeType, InPinType, OutPinType, BoardState } from "./../context/main";
export type BoardActions =
    | {
          type: "CREATE_NODE";
          data: {
              node: NodeType;
          };
      }
    | {
          type: "ADD_INPUT_PINS";
          data: {
              pins: InPinType[];
          };
      }
    | {
          type: "ADD_OUTPUT_PINS";
          data: {
              pins: OutPinType[];
          };
      }
    | {
          type: "SELECT_PIN";
          data: {
              pin: string;
          };
      }
    | {
          type: "RESET_SELECTED_PIN";
      }
    | {
          type: "CONNECT_PINS";
          data: {
              input: string;
              output: string;
          };
      }
    | {
          type: "DISCONNECT_PINS";
          data: {
              input: string;
              output: string;
          };
      }
    | {
          type: "UPDATE_INPUT_PIN_POSITION";
          data: {
              pin: string;
              x: number;
              y: number;
          };
      }
    | {
          type: "UPDATE_OUTPUT_PIN_POSITION";
          data: {
              pin: string;
              x: number;
              y: number;
          };
      }
    | {
          type: "UPDATE_NODE_POSITION";
          data: {
              node: string;
              x: number;
              y: number;
          };
      }
    | {
          type: "UPDATE_NODE_DATA";
          data: {
              newData: any;
              node: string;
          };
      }
    | {
          type: "UPDATE_NODE_DATA_PARTIAL";
          data: {
              node: string;
              update: object;
          };
      }
    | {
          type: "LOAD_RECIPE";
          data: {
              state: BoardState;
          };
      }
    | {
          type: "DELETE_NODE";
          data: {
              node: string;
          };
      };
