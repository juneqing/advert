export enum FieldTypes {
    String,
    Date,
    Money,
    CheckBox,
    TextArea,
    Number,
    Image,
    Url
}
export interface FormField {
    key: string;
    label: string;
    type?: FieldTypes;
    // 是否可编辑 默认可编辑
    editable?: boolean;
    // 是否可创建 默认可创建
    createable?: boolean;
    // 是否可排序 默认不会以此排序,需要同时指定 desc,
    sortable?: boolean;
    // 默认降序排列 true,false
    desc?: boolean;
    //显示在列表上
    showable?: boolean;
    // 是否是弹出对象,默认为false
    isPopulate?: boolean;

}
export interface ITable {
    // 表单名字
    name: string;
    model: string;
    fields: FormField[];
    query?: { key: string, value: string };
    delable?: boolean;
    createable?: boolean;

    someActions?: { label: string, callback: (items: any[]) => void }[];
    oneActions?: { label: string, callback: (item: Object) => void }[];

}