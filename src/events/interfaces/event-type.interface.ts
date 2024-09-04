export default interface IEventType {
    [key: string]: (interaction: any) => void;
};