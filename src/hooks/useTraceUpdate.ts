import {
  useEffect,
  useRef,
} from 'react';

/**
 * Helps tracking the props changes made in a react functional component.
 *
 * Prints the name and old/new values of the properties/states variables causing a render (or re-render).
 * For debugging purposes only.
 *
 * @usage You can simply track the props of the components like this:
 *  useRenderingTrace('MyComponent', props);
 *
 * @usage You can also track additional state like this:
 *  const [someState] = useState(null);
 *  useRenderingTrace('MyComponent', { ...props, someState });
 *
 * @param componentName Name of the component to display
 * @param propsAndStates
 * @param level
 *
 * @see https://stackoverflow.com/a/51082563/2391795
 */
const useRenderingTrace = (componentName: string, propsAndStates: any, level: 'debug' | 'info' | 'log' = 'debug') => {
  const prev = useRef(propsAndStates);

  useEffect(() => {
    const changedProps: { [key: string]: { old: any, new: any } } = Object.entries(propsAndStates).reduce((property: any, [key, value]: [string, any]) => {
      if (prev.current[key] !== value) {
        let diffValue = undefined;
        // XXX Issue when one of the value's properties isn't an object/array, runs an infinite loop - See https://github.com/flitbit/diff/issues/173
        // try {
        //   diffValue = diff(prev.current[key], value);
        // } catch (e) {
        //   // Not an object/array, cannot make a diff
        // }
        property[key] = {
          old: prev.current[key],
          new: value,
        };

        if (typeof diffValue !== 'undefined') {
          property[key].diff = diffValue;
        }
      }
      return property;
    }, {});

    if (Object.keys(changedProps).length > 0) {
      console[level](`[${componentName}] Changed props:`, changedProps);
    }

    prev.current = propsAndStates;
  });
};

export default useRenderingTrace;
