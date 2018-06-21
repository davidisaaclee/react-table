import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, edgeLookup } from '../src/Table';
import { action } from '@storybook/addon-actions';
import './index.css';

const e = React.createElement;

function defaultRenderHeader(
	titles: string[],
	index: number
): React.ReactNode {
	return e('div', {}, titles[index]);
}

storiesOf('Table', module)
	.add('basic', () => {
		const rows =
			['oscillator', 'delay', 'low-pass filter'];
		const columns =
			['osc output', 'something else',
				'something else', 'something else'];
		return e(Table,
			{
				rowCount: rows.length,
				columnCount: columns.length,
				renderRowHeader: (i: number) => defaultRenderHeader(rows, i),
				renderColumnHeader: (i: number) => defaultRenderHeader(columns, i),
				renderCell: edgeLookup(
					[[0, 0, true], [0, 1, true], [2, 0, true], [2, 3, true]],
					(value) => value ? 'x' : null)
			})
	})
	.add('styled', () => {
		const rows =
			['Oscillator', 'Delay', 'Low-pass filter'];
		const columns =
			['Osc output', 'Something else',
			'Something else', 'Something else'];

		return e(Table,
			{
				rowCount: rows.length,
				columnCount: columns.length,

				renderRowHeader: (i: number) => defaultRenderHeader(rows, i),
				renderColumnHeader: (i: number) => defaultRenderHeader(columns, i),

				renderCell: edgeLookup(
					[[0, 0, true], [0, 1, true], [2, 0, true], [2, 3, true]],
					(value) => e('span',
						{
							style: value
							? {
								backgroundColor: 'black',
								display: 'block',
								margin: '0 auto',
								height: '20px',
								width: '20px',
							}
							: {
								display: 'block',
								margin: '0 auto',
								height: '20px',
								width: '20px',
								border: '1px solid black',
								boxSizing: 'border-box',
							}
						}
					)),
				classNames: {
					matrix: 'styled-routing-matrix',
					header: 'styled-header',
					rowHeaderCell: 'styled-row-header-cell',
					columnHeaderCell: 'styled-column-header-cell',
					crossAxisCell: 'styled-cross-axis-cell',
				}
			});
	})
	.add('interactive cells', () => {
		const rows = ['Oscillator', 'Delay', 'Low-pass filter'];
		const columns = ['Osc output', 'Something else', 'Something else', 'Something else'];

		return e(Table,
			{
				rowCount: rows.length,
				columnCount: columns.length,

				renderRowHeader: (i: number) => defaultRenderHeader(rows, i),
				renderColumnHeader: (i: number) => defaultRenderHeader(columns, i),

				renderCell: edgeLookup(
					[[0, 0, true], [0, 1, true], [2, 0, true], [2, 3, true]],
					(value, rowIndex, columnIndex) => e('span',
						{
							onClick: action(`Toggle ${rowIndex} ${columnIndex}`),
							style: value
							? {
								backgroundColor: 'black',
								display: 'block',
								margin: '0 auto',
								height: '20px',
								width: '20px',
							}
							: {
								display: 'block',
								margin: '0 auto',
								height: '20px',
								width: '20px',
								border: '1px solid black',
								boxSizing: 'border-box',
							}
						}
					)),
				classNames: {
					matrix: 'styled-routing-matrix',
					header: 'styled-header',
					rowHeaderCell: 'styled-row-header-cell',
					columnHeaderCell: 'styled-column-header-cell',
					crossAxisCell: 'styled-cross-axis-cell',
				}
			});
	})
	.add('interactive headers', () => {
		const rows = ['Oscillator', 'Delay', 'Low-pass filter'];
		const columns = ['Osc output', 'Something else', 'Something else', 'Something else'];

		return e(Table,
			{
				rowCount: rows.length,
				columnCount: columns.length,

				renderRowHeader: (i: number) => (
					e('button',
						{
							onClick: action(`clicked row ${rows[i]}`),
						},
						rows[i])
				),
				renderColumnHeader: (i: number) => defaultRenderHeader(columns, i),

				renderCell: edgeLookup(
					[[0, 0, true], [0, 1, true], [2, 0, true], [2, 3, true]],
					(value, rowIndex, columnIndex) => e('span',
						{
							onClick: action(`Toggle ${rowIndex} ${columnIndex}`),
							style: value
							? {
								backgroundColor: 'black',
								display: 'block',
								margin: '0 auto',
								height: '20px',
								width: '20px',
							}
							: {
								display: 'block',
								margin: '0 auto',
								height: '20px',
								width: '20px',
								border: '1px solid black',
								boxSizing: 'border-box',
							}
						}
					)),
				classNames: {
					matrix: 'styled-routing-matrix',
					header: 'styled-header',
					rowHeaderCell: 'styled-row-header-cell',
					columnHeaderCell: 'styled-column-header-cell',
					crossAxisCell: 'styled-cross-axis-cell',
				}
			});
	})
	.add('custom containers', () => {
		const rows =
			['oscillator', 'delay', 'low-pass filter'];
		const columns =
			['osc output', 'something else',
				'something else', 'something else'];
		return e(Table,
			{
				rowCount: rows.length,
				columnCount: columns.length,
				renderRowHeader: (i: number) => defaultRenderHeader(rows, i),
				renderColumnHeader: (i: number) => defaultRenderHeader(columns, i),
				renderCell: edgeLookup(
					[[0, 0, true], [0, 1, true], [2, 0, true], [2, 3, true]],
					(value) => value ? 'x' : null),
				renderRowContainer: ({ rowIndex, children }: { rowIndex: number, children: React.ReactNode }) => (
					e('tr', 
						{
							style: {
								backgroundColor: 'green'
							}
						},
						children)
				),
				renderCellContainer: ({ columnIndex, children }: { columnIndex: number, rowIndex: number, children: React.ReactNode }) => (
					e('td', 
						{
							style: {
								backgroundColor: columnIndex % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0)'
							}
						},
						children)
				),
			})
	})

