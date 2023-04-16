export type ISOLATION_LEVELS =
  | "READ UNCOMMITTED"
  | "READ COMMITTED"
  | "REPEATABLE READ"
  | "SERIALIZABLE";

export type Movie = {
  id?: string;
  name: string;
  year: number;
  rank: number;
  actor1_first_name: string;
  actor1_last_name: string;
  actor2_first_name: string;
  actor2_last_name: string;
  actor3_first_name: string;
  actor3_last_name: string;
};
