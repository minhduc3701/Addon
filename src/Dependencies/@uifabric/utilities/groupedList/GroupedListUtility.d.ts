import { IGroup } from '../../components/GroupedList/GroupedList.types';
/**
 * Takes an array of groups and returns a count of the groups and all descendant groups.
 * @param groups - The array of groups to count.
 */
export declare const GetGroupCount: (groups: IGroup[] | undefined) => number;
