import * as React from 'react';

const e = React.createElement;

interface OwnProps {
	rows: Array<string>;
	columns: Array<string>;

	// TODO: referring to values of columns/rows makes these ambiguous
	values: Array<[number, number]>;
}

type Props = OwnProps & React.HTMLAttributes<HTMLTableElement>;

export class RoutingMatrix extends React.Component<Props, {}> {
	public render() {
		const {
			rows, columns, values,
			style, ...passedProps
		} = this.props;

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
				{ key: row + "-" + rowIndex },
				[
					e('th',
						{
							key: 'row-header-' + row + '-' + rowIndex,
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

		function renderCell(rowIndex: number, columnIndex: number) {
			return getValue(rowIndex, columnIndex) ? '*' : null;
		}

		return e('table',
			{
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
						{ key: 'column-headers' },
						[
							e('th',
								{ key: 'cross-axis-cell', },
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

