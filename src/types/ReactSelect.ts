/**
 * A react-select group
 *
 * @see https://react-select.com/advanced#replacing-builtins
 * @see https://stackoverflow.com/a/52503863/2391795
 * @see https://www.saltycrane.com/cheat-sheets/typescript/react-select/latest/
 */
export type ReactSelectGroup = {
  label: string;
  labelShort?: string;
  options: Array<any>;
}

/**
 * A react-select option must have a label and a value field
 *
 * But those two keys can be changed from within the component using getOptionLabel and getOptionValue
 * @see https://www.saltycrane.com/cheat-sheets/typescript/react-select/latest/
 */
export type ReactSelectDefaultOption = {
  label: string;
  value: string;
}
