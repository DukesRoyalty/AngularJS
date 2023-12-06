import { TaskGroup } from './task-group';
import { ProxyGroup } from './proxy-group';
import { Profile } from './profile-form';

export interface StorageItem {
    tasks: TaskGroup[],
    proxies: ProxyGroup[],
    profiles: Profile[]
}