<template>
  <div>
    <select v-model="selectedReport" @change="updateTable">
      <option v-for="(report, index) in reports" :key="index" :value="index">
        Report {{ index + 1 }}
      </option>
    </select>

    <table>
      <thead>
        <tr>
          <th
            v-for="(col, colIndex) in currentReport.header"
            :key="col.id"
            :style="{ textAlign: col.align || 'left', cursor: 'pointer' }"
            @click="sortByColumn(colIndex)"
          >
            {{ col.caption }}
            <span v-if="sortedColumn === colIndex">
              {{ sortOrder === 'asc' ? '▲' : '▼' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in sortedData" :key="rowIndex" :class="rowIndex % 2 === 0 ? 'row-light' : 'row-dark'">
          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            :style="getCellTextStyle(cell, colIndex)"
            class="cell"
          >
            {{ formatCell(cell) }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { report1, report2, report3, Report, TableCell } from '../mockups/mockupData';

const reports = ref<Report[]>([report1, report2, report3]);
const selectedReport = ref<number>(0);
const currentReport = computed(() => reports.value[selectedReport.value]);

const sortedColumn = ref<number | null>(null);
const sortOrder = ref<'asc' | 'desc'>('asc');

const updateTable = (): void => {};

const sortByColumn = (colIndex: number): void => {
  if (sortedColumn.value === colIndex) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortedColumn.value = colIndex;
    sortOrder.value = 'asc';
  }
};

const sortedData = computed(() => {
  if (sortedColumn.value === null) return currentReport.value.data;

  return [...currentReport.value.data].sort((a, b) => {
    const valueA = (typeof a[sortedColumn.value!] === 'object' && a[sortedColumn.value!] !== null) 
      ? (a[sortedColumn.value!] as TableCell).data 
      : a[sortedColumn.value!];

    const valueB = (typeof b[sortedColumn.value!] === 'object' && b[sortedColumn.value!] !== null) 
      ? (b[sortedColumn.value!] as TableCell).data 
      : b[sortedColumn.value!];

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortOrder.value === 'asc' ? valueA - valueB : valueB - valueA;
    }
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortOrder.value === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    }
    if (typeof valueA === 'boolean' && typeof valueB === 'boolean') {
      return sortOrder.value === 'asc' ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
    }
    return 0;
  });
});

const formatCell = (cell: string | number | TableCell): string | number | boolean => 
  (typeof cell === 'object' && cell !== null) ? cell.data : cell;

const getCellTextStyle = (cell: string | number | TableCell, colIndex: number) => {
  const align = (typeof cell === 'number') ? 'right' 
    : (typeof cell === 'string') ? 'left' 
    : (typeof cell === 'boolean') ? 'center' 
    : (typeof (cell as TableCell).data === 'number') ? 'right' 
    : (typeof (cell as TableCell).data === 'string') ? 'left' 
    : 'center';

  return {
    textAlign: currentReport.value.header[colIndex].align || align,
    backgroundColor: (typeof cell === 'object' && cell !== null) ? cell.color : '',
  };
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #d0e7ff; 
}

.row-light {
  background-color: #eaf4ff; 
}

.row-dark {
  background-color: #d0e7ff;
}

.cell {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cell:hover {
  background-color: #cceeff;
  transform: scale(1.02);
}

select {
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #f0f8ff; 
  color: #333;
  font-size: 16px;
  width: 100%;
  max-width: 300px;
}

option {
  padding: 8px;
  font-size: 16px;
}

@media (max-width: 600px) {
  table {
    font-size: 12px;
  }

  select {
    font-size: 14px;
  }
}
</style>
