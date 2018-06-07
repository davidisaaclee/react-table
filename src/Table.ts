import * as React from 'react';

const e = React.createElement;

export function edgeLookup<T, EdgeValue>(
	edges: Array<[number, number, EdgeValue]>,
	fn: (value: EdgeValue | null, rowIndex: number, columnIndex: number) => T
): ((rowIndex: number, columnIndex: number) => T) {
	const valueDict: { [row: number]: { [column: number]: EdgeValue } } = {};

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

export interface OwnProps {
	// Set this value to provide custom classnames for rendered HTML elements.
	classNames?: ClassNames;

	rowCount: number;
	columnCount: number;

	renderRowHeader: (rowIndex: number) => React.ReactNode;
	renderColumnHeader: (columnIndex: number) => React.ReactNode;

	renderCell?: (row: number, column: number) => React.ReactNode;
}

export type Props = OwnProps & React.HTMLAttributes<HTMLTableElement>;

export class Table extends React.Component<Props, any> {

	public render() {
		const {
			rowCount, columnCount, classNames: _classNames,
			renderCell: _renderCell, renderRowHeader, renderColumnHeader,
			style, ...passedProps
		} = this.props;

		const classNames = _classNames == null
		? defaultClassNames
		: _classNames;

		const renderCell = _renderCell == null
		? defaultRenderCell
		: _renderCell;

		function renderRow(rowIndex: number) {
			return e('tr',
				{
					key: "row-" + rowIndex,
					className: classNames.row,
				},
				[
					e('th',
						{
							key: 'row-header-' + rowIndex,
							className: [classNames.header, classNames.rowHeaderCell].join(' '),
						},
						renderRowHeader(rowIndex)),
					range(0, columnCount).map(columnIndex =>
						e('td',
							{
								key: "column-" + columnIndex,
								className: classNames.cell,
							},
							renderCell(rowIndex, columnIndex)
						)
					)
				]
			)
		}

		function renderColumnHeaderContainer(columnIndex: number) {
			return e('th',
				{
					key: 'col-header-' + columnIndex,
					className: [classNames.header, classNames.columnHeaderCell].join(' '),
				},
				renderColumnHeader(columnIndex))
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
							...range(0, columnCount).map(renderColumnHeaderContainer)
						]
					),
					...range(0, rowCount).map(renderRow)
				]
			)
		);
	}
}

function range(low: number, high: number, step: number = 1): number[] {
	let result = [];
	for (let i = low; i < high; i += step) {
		result.push(i);
	}
	return result;
}

