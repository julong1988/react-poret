interface QuarkValues {
  [prop: string]: any;
}

interface Fn {
  (): void
}

interface QuarkUpdateComponent{
  [prop: string | number]: Fn
}

interface QuarkUpdateComponents {
  [prop: string]: QuarkUpdateComponent
}

interface RootState {
  values: QuarkValues;
  updateComponents: QuarkUpdateComponents
}

interface Quark {
  key: string;
  value: any;
}

interface QuarkMulti {
  quark: Quark;
  value: any;
}