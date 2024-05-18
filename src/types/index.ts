export type Employee = {
  id: number;
  email: string;
  name: string;
  img_url: string;
  contact_number: string;
  branch_name: string;
  role: string;
  status: string;
  dob: string;
};

export type EmployeeDisplay = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  image_url: string;
  address: string;
  contact_number: number;
  gender: string;
  dob: string;
  sectors: {
    id: number;
    image_url: string;
    sector_name: string;
    sector_head: string;
    sector_type: string;
    description: string;
    created_at: string;
  };
  roles: {
    id: number;
    role: string;
  };
};

export type SectorsDisplay = {
  id: number;
  sector_name: string;
  sector_type: string;
  image_url: string;
  description: string;
  created_at: string;
};

export type departments = {
  id: number;
  sector_name: string;
  description: string;
};

export type roles = {
  id: number;
  role: string;
};
export type uoms = {
  id: number;
  role: string;
};

export type allInventoryDisplay = {
  id: number;
  branches: {
    id: number;
    branch_name: string;
    branch_location: string;
  };
  products: {
    id: number;
    name: string;
    description: string;
    image_url: string;
    quantity: number;
    uom: string;
    price: number;
    barcode: string;
    status: string;
    created_at: string;
  }[];
};

export type allMainStocksDisplay = {
  id: number;
  name: string;
  description: string;
  image_url: string;
  stock_quantity: number;
  uoms: {
    id: number;
    unit_name: string;
  };
  supply_categories: {
    id: number;
    name: string;
  };
  price: number;
  barcode: string;
  status: string;
  created_at: string;
};

export type allRestockReportsDisplay = {
  id: number;
  employees: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    image_url: string;
    role: number;
    address: string;
    password: string;
    created_at: string;
    sector: string | any;
  };
  total_price: number;
  restock_report_entries: {
    id: number;
    name: string;
    description: string;
    supply_category: number;
    main_supply_id: number;
    quantity: number;
    price: number;
    created_at: string;
  }[];
  created_at: string;
};
