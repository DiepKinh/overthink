import * as UserActions from './user';
import * as SettingActions from './setting';
import * as ChuyenKhoaActions from './chuyenkhoa';
import * as BacSiActions from './bacsi';
import * as LichActions from './lich';
import * as TableActions from './table';
import * as IpActions from './ipPrinter';
import * as StoreActions from './store';
import * as OrderHistoryActions from './orderHistory';

export const ActionCreators = Object.assign(
  {},
  UserActions,
  SettingActions,
  ChuyenKhoaActions,
  BacSiActions,
  LichActions,
  TableActions,
  IpActions,
  StoreActions,
  OrderHistoryActions,
);
