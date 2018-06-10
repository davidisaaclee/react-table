# react-table
Renders a `<table>` element with row and column headers, using callbacks to render contents of each cell.

## Usage
```jsx
import Table from '@davidisaaclee/react-table';

let columns = ['Capital', 'Abbrieviation'];
let rows = ['Rhode Island', 'New York', 'California'];

let data = {
  'Rhode Island': { capital: 'Providence', abbrieviation: 'RI' },
  'New York': { capital: 'Providence', abbrieviation: 'RI' },
  'California': { capital: 'Sacramento', abbrieviation: 'CA' },
};

<Table
  rowCount={rows.length}
  columnCount={columns.length}

  renderRowHeader={(index) => <b>rows[index]</b>}
  renderColumnHeader={(index) => columns[index]}

  renderCell={(rowIndex, columnIndex) => {
    if (columnIndex === 0) {
      return data[rows[rowIndex]].capital;
    } else if (columnIndex === 1) {
      return data[rows[rowIndex]].population;
    }
  }}
/>
```

## Install
```bash
yarn add @davidisaaclee/table
```

## Develop
```bash
# Build using tsc 
yarn build

# Run Storybook on port 9001
yarn run storybook
```

## Todo
- Update `classNames` prop - currently does not use all specified class names

