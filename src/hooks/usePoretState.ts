import useSetPoretState from './useSetPoretState';
import usePoretValue from './usePoretValue';

export default (quark: Quark): any[] => [usePoretValue(quark), useSetPoretState(quark)]
