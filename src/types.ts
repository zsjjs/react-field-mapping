export interface DataTypes {
  key: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [propName: string]: any;
}

export interface OneRelation {
  source?: DataTypes;
  target?: DataTypes;
}

export interface TableTypes {
  title: string;
  key: string;
  width: string;
  align: string;
  render: Element | string | Function;
}

export interface FieldMappingProps {
  className: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any;
  isSort: boolean;
  relation?: OneRelation[];
  source: {
    data: DataTypes[];
    onChange?: (data: DataTypes[]) => {};
    mutiple: boolean;
    columns: TableTypes[];
  };
  target: {
    data: DataTypes[];
    onChange?: (data: DataTypes[]) => {};
    mutiple: boolean;
    columns: TableTypes[];
  };
  onChange?: (relation?: OneRelation[]) => {};
  onDrawStart: (sourceData?: OneRelation, relation?: OneRelation[]) => void;
  onDrawing: (sourceData?: OneRelation, relation?: OneRelation[]) => void;
  onDrawEnd: (sourceData?: OneRelation, targetData?: OneRelation, relation?: OneRelation[]) => void;
  edit: boolean;
  closeIcon?: string;
}

export interface FieldMappingState {
  relation?: OneRelation[];
  currentRelation: OneRelation;
  iconStatus?: OneRelation;
}

export interface ColumnsProps {
  item: DataTypes;
  columns: TableTypes[];
  index: number;
  columnOpt: (item: DataTypes, index: number) => void;
  sorting: boolean;
  type: string;
  edit: boolean;
}

export interface XDataProps {
  iconStatus: OneRelation;
  relation: OneRelation[];
  columns: TableTypes[];
  data: DataTypes[];
  currentRelation: OneRelation;
  isSort: boolean;
  edit: boolean;
  changeData: (oldIndex: number, newIndex: number) => void;
  overActive: (item: DataTypes, type: string, active: string) => void;
}

export interface XDataState {
  sorting: boolean;
  activeKey: string | null;
}

export interface DrawLinesProps {
  sourceData: DataTypes[];
  targetData: DataTypes[];
  sourceMutiple: boolean;
  targetMutiple: boolean;
  onDrawStart: (sourceData?: OneRelation, relation?: OneRelation[]) => void;
  onDrawing: (sourceData?: OneRelation, relation?: OneRelation[]) => void;
  onDrawEnd: (sourceData?: OneRelation, targetData?: OneRelation, relation?: OneRelation[]) => void;
  relation: OneRelation[];
  edit: boolean;
  currentRelation: OneRelation;
  onChange?: (relation?: OneRelation[], isUpdate?: boolean) => void;
  changeIconStatus: (data?: OneRelation) => void;
  closeIcon: string;
}

export interface DrawLinesState {
  sourceData: OneRelation;
  startX: number;
  startY: number;
  drawing: boolean;
  endX: number;
  endY: number;
}

export interface LineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  data: OneRelation;
  edit: boolean;
  toTop: (item: OneRelation) => void;
  currentRelation: OneRelation;
  removeRelation: (item: OneRelation) => void;
  closeIcon: string;
}
