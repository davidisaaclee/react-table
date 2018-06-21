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
}

export const defaultClassNames = {
	matrix: 'routing-matrix',
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

	// For header rows, `rowIndex` will be negative
	renderRowContainer?: React.ComponentType<{ rowIndex: number }>;

	// For header cells, `rowIndex` and/or `columnIndex` will be negative
	renderCellContainer?: React.ComponentType<{ columnIndex: number, rowIndex: number }>;
}

export type Props = OwnProps & React.HTMLAttributes<HTMLTableElement>;

const defaultRowContainer: React.StatelessComponent<{ rowIndex: number }> =
	({ rowIndex, children }) => e('tr', {}, children);
const defaultCellContainer: React.StatelessComponent<{ columnIndex: number, rowIndex: number }> =
	({ columnIndex, rowIndex, children }) => ((columnIndex === -1 || rowIndex === -1)
		? e('th', {}, children)
		: e('td', {}, children)
	);


export class Table extends React.Component<Props, any> {
	public render() {
		const {
			rowCount, columnCount, classNames: _classNames,
			renderCell: _renderCell, renderRowHeader, renderColumnHeader,
			renderRowContainer: _renderRowContainer,
			renderCellContainer: _renderCellContainer,
			style, ...passedProps
		} = this.props;

		const classNames = _classNames == null
			? defaultClassNames
			: _classNames;

		const renderCell = _renderCell == null
			? defaultRenderCell
			: _renderCell;

		const renderRowContainer = _renderRowContainer == null
			? defaultRowContainer
			: _renderRowContainer;

		const renderCellContainer = _renderCellContainer == null
			? defaultCellContainer
			: _renderCellContainer;

		function renderRow(rowIndex: number) {
			return e(renderRowContainer,
				{
					key: "row-" + rowIndex,
					rowIndex
				},
				[
					e(renderCellContainer,
						{
							key: 'row-header-' + rowIndex,
							rowIndex,
							columnIndex: -1
						},
						renderRowHeader(rowIndex)),
					range(0, columnCount).map(columnIndex =>
						e(renderCellContainer,
							{
								key: "column-" + columnIndex,
								rowIndex,
								columnIndex
							},
							renderCell(rowIndex, columnIndex)))
				]);
		}

		function renderColumnHeaderContainer(columnIndex: number) {
			return e(renderCellContainer,
				{
					key: 'col-header-' + columnIndex,
					rowIndex: -1,
					columnIndex
				},
				renderColumnHeader(columnIndex));
		}

		return e('table',
			{
				className: classNames.matrix,
				style,
				...passedProps
			},
			e('thead',
				{},
				e(renderRowContainer,
					{ rowIndex: -1 },
					[
						e(renderCellContainer,
							{ 
								key: 'cross-axis-cell',
								rowIndex: -1,
								columnIndex: -1
							},
							null),
						...range(0, columnCount).map(renderColumnHeaderContainer)
					]
				)),
			e('tbody',
				{},
				range(0, rowCount).map(renderRow)));
	}
}

function range(low: number, high: number, step: number = 1): number[] {
	let result = [];
	for (let i = low; i < high; i += step) {
		result.push(i);
	}
	return result;
}

