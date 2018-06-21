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

const defaultRenderCell = () => null;

export interface OwnProps {
	rowCount: number;
	columnCount: number;

	renderRowHeaderContent: (rowIndex: number) => React.ReactNode;
	renderColumnHeaderContent: (columnIndex: number) => React.ReactNode;

	renderCellContent?: (row: number, column: number) => React.ReactNode;

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
			rowCount, columnCount, 
			renderCellContent: _renderCellContent,
			renderRowHeaderContent, renderColumnHeaderContent,
			renderRowContainer: _renderRowContainer,
			renderCellContainer: _renderCellContainer,
			style, ...passedProps
		} = this.props;

		const renderCellContent = _renderCellContent == null
			? defaultRenderCell
			: _renderCellContent;

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
						renderRowHeaderContent(rowIndex)),
					range(0, columnCount).map(columnIndex =>
						e(renderCellContainer,
							{
								key: "column-" + columnIndex,
								rowIndex,
								columnIndex
							},
							renderCellContent(rowIndex, columnIndex)))
				]);
		}

		function renderColumnHeaderContainer(columnIndex: number) {
			return e(renderCellContainer,
				{
					key: 'col-header-' + columnIndex,
					rowIndex: -1,
					columnIndex
				},
				renderColumnHeaderContent(columnIndex));
		}

		return e('table',
			{
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

