export interface Policy {
  code: string;
  name: string;
  registration_date: Date;
  introducer_code: string;
  l: Policy[];
  r: Policy[];
}
