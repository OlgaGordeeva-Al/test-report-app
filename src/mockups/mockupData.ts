export interface TableHeader {
  id: string;
  type: string;
  caption: string;
  align?: string;
}

export interface TableCell {
  data: string | number | boolean;
  color?: string;
}

export interface Report {
  header: TableHeader[];
  data: (string | number | boolean | TableCell)[][];
}

export const report1: Report = {
  header: [
    { id: "project_name", type: "string", caption: "Project name" },
    { id: "total_by_project", type: "float", caption: "Total by project" },
    { id: "project_type", type: "string", caption: "Project type", align: "center" },
    { id: "jan", type: "float", caption: "Jan" },
    { id: "feb", type: "float", caption: "Feb" }
  ],
  data: [
    ["Mimesis", 1024.3, "commercial", 2048.2, 4096.0],
    ["Mako", 2345.1, "internal", 3465.3, { data: 12.5, color: "selected" }],
    ["Edelweiss", 54.4, "commercial", 564.8, 4652.3]
  ]
};

export const report2: Report = {
  header: [
    { id: "project_name", type: "string", caption: "Project name" },
    { id: "budget", type: "float", caption: "Budget", align: "center" },
    { id: "status", type: "string", caption: "Status" }
  ],
  data: [
    ["Aurora", 3000, "active"],
    ["Nebula", 1500, { data: "pending", color: "#e88feb" }],
    ["Quantum", 5000, "completed"]
  ]
};

export const report3: Report = {
  header: [
    { id: "project_name", type: "string", caption: "Project name" },
    { id: "budget", type: "float", caption: "Budget" },
    { id: "status", type: "string", caption: "Status", align: "center" }
  ],
  data: [
    ["Ursa", 12000, "true"],
    ["Saturn", 100, { data: "false", color: "#848a86" }],
    ["Venus", 5050, "true"],
    ["March", 500000000, { data: "false", color: "#848a86" }]
  ]
};