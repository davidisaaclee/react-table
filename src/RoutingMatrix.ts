import * as React from 'react';

const e = React.createElement;

export const edgeLookup: <T, EdgeValue>(edges: Array<[number, number, EdgeValue]>, fn: (value: EdgeValue | null, rowIndex: number, columnIndex: number) => T) => ((rowIndex: number, columnIndex: number) => T) =
	(edges, fn) => {
		const valueDict: object = {};

		for (const [row, column, value] of edges) {
			if (valueDict[row] == null) {
				valueDict[row] = {};
			}

			valueDict[row][column] = value;
		}

		return (rowIndex: number, columnIndex: number) => {
			if (valueDict[rowIndex] == null) {
				return fn(null, rowIndex, columnIndex);
			} else {
				return fn(valueDict[rowIndex][columnIndex], rowIndex, columnIndex);
			}
		};
	};

interface ClassNames {
	matrix: string;
	cell: string;
	row: string;
	rowHeaderCell: string;
	columnHeaderCell: string;
	header: string;
	crossAxisCell: string;
}

export const defaultClassNames = {
	matrix: 'routing-matrix',
	row: 'row',
	rowHeaderCell: 'row-header-cell',
	columnHeaderCell: 'column-header-cell',
	header: 'header',
	cell: 'cell',
	crossAxisCell: 'cross-axis-cell',
};

const defaultRenderCell = () => null;

interface OwnProps {
	// A list of row names. The length of this list determines the number of rows.
	rows: Array<string>;

	// A list of column names. The length of this list determines the number of columns.
	columns: Array<string>;

	// A list of [row, column] indices, indicating which cells are filled.
	// values: Array<[number, number]>;

	// Set this value to provide custom classnames for rendered HTML elements.
	classNames?: ClassNames;

	renderCell?: (row: number, column: number) => React.ReactNode;
}

type Props = OwnProps & React.HTMLAttributes<HTMLTableElement>;

export class RoutingMatrix extends React.Component<Props, {}> {

	public render() {
		const {
			rows, columns, classNames: _classNames, renderCell: _renderCell,
			style, ...passedProps
		} = this.props;

		const classNames = _classNames == null
		? defaultClassNames
		: _classNames;

		const renderCell = _renderCell == null
		? defaultRenderCell
		: _renderCell;

		function renderRow(row: string, rowIndex: number) {
			return e('tr',
				{
					key: row + "-" + rowIndex,
					className: classNames.row,
				},
				[
					e('th',
						{
							key: 'row-header-' + row + '-' + rowIndex,
							className: [classNames.header, classNames.rowHeaderCell].join(' '),
						},
						row),
					columns.map((column, columnIndex) =>
						e('td',
							{
								key: column + "-" + columnIndex,
								className: classNames.cell,
							},
							renderCell(rowIndex, columnIndex)
						)
					)
				]
			)
		}

		function renderColumnHeader(column: string, columnIndex: number) {
			return e('th',
				{
					key: 'col-header-' + column + '-' + columnIndex,
					className: [classNames.header, classNames.columnHeaderCell].join(' '),
				},
				e('div',
					{},
					column
				)
			)
		}

		return e('table',
			{
				className: classNames.matrix,
				style,
				...passedProps
			},
			e('tbody',
				{},
				[
					e('tr',
						{
							key: 'column-headers',
							className: classNames.row,
						},
						[
							e('th',
								{
									key: 'cross-axis-cell',
									className: classNames.crossAxisCell,
								},
								null),
							...columns.map(renderColumnHeader)
						]
					),
					...rows.map(renderRow)
				]
			)
		);
	}
}

