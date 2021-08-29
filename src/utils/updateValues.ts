interface IUpdateValues {
  (store: RootState, quark: Quark, value: any): void
}
const updateValues: IUpdateValues = (store, { key }, value) => {
  store.values[key] = value;
  store.updateComponents[key] = store.updateComponents[key] || {};
  Object.values(store.updateComponents[key]).forEach((cb: any) => cb());
};

export default updateValues;