export interface Table {
	rows?: number;
	responsiveLayout?: string;
  globalFilter: any[];
  rowsPerPage: any[];
  selectedRecords: any[];
}