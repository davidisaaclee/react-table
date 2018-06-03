import * as React from 'react';

const e = React.createElement;

interface ClassNames {
	matrix: string;
	cell: string;
	row: string;
	rowHeaderCell: string;
	columnHeaderCell: string;
	cellContent: string;
	crossAxisCell: string;
}

export const defaultClassNames = {
	matrix: 'routing-matrix',
	row: 'row',
	rowHeaderCell: 'row-header-cell',
	columnHeaderCell: 'column-header-cell',
	cell: 'cell',
	cellContent: 'cell-content',
	crossAxisCell: 'cross-axis-cell',
};

interface OwnProps {
	// A list of row names. The length of this list determines the number of rows.
	rows: Array<string>;

	// A list of column names. The length of this list determines the number of columns.
	columns: Array<string>;

	// A list of [row, column] indices, indicating which cells are filled.
	values: Array<[number, number]>;

	// Set this value to provide custom classnames for rendered HTML elements.
	classNames?: ClassNames;
}

type Props = OwnProps & React.HTMLAttributes<HTMLTableElement>;

export class RoutingMatrix extends React.Component<Props, {}> {
	public static defaultProps: OwnProps = {
		rows: [],
		columns: [],
		values: [],
		classNames: defaultClassNames,
	};

	public render() {
		const {
			rows, columns, values, classNames: _classNames,
			style, ...passedProps
		} = this.props;

		const classNames = _classNames == null
		? defaultClassNames
		: _classNames;

		const valueDict: object = {};

		for (const value of values) {
			if (valueDict[value[0]] == null) {
				valueDict[value[0]] = {};
			}

			valueDict[value[0]][value[1]] = true;
		}

		function getValue(rowIndex: number, columnIndex: number): boolean {
			if (valueDict[rowIndex] == null) {
				return false;
			} else {
				return valueDict[rowIndex][columnIndex] != null;
			}
		}

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
							className: classNames.rowHeaderCell,
							style: {
								textAlign: 'right',
								border: '1px solid black',
								borderLeft: 'none',
								paddingRight: '0.5em',
							}
						},
						row),
					columns.map((column, columnIndex) =>
						e('td',
							{
								key: column + "-" + columnIndex,
								className: classNames.cell,
								style: {
									border: '1px solid black',
								}
							},
							renderCell(rowIndex, columnIndex))
					)
				]
			)
		}

		function renderColumnHeader(column: string, columnIndex: number) {
			return e('th',
				{
					key: 'col-header-' + column + '-' + columnIndex,
					className: classNames.columnHeaderCell,
					style: {
						border: '1px solid black',
						borderTop: 'none',
						paddingBottom: '0.5em',
					}
				},
				e('div',
					{
						style: {
							transform: 'rotate(180deg)',
							writingMode: 'vertical-rl',
							whiteSpace: 'nowrap'
						}
					},
					column
				)
			)
		}

		const renderCell = (rowIndex: number, columnIndex: number) =>
			e('span',
				{
					className: classNames.cellContent,
					'data-value': getValue(rowIndex, columnIndex),
				},
				getValue(rowIndex, columnIndex) ? '•' : null);

		return e('table',
			{
				className: classNames.matrix,
				style: {
					borderCollapse: 'collapse',
					...style
				},
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

