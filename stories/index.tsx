import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Table, edgeLookup } from '../src/Table';
import { action } from '@storybook/addon-actions';

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
				renderCellContent: edgeLookup(
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

				renderCellContent: edgeLookup(
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

				renderCellContent: edgeLookup(
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

				renderCellContent: edgeLookup(
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
				renderCellContent: edgeLookup(
					[[0, 0, true], [0, 1, true], [2, 0, true], [2, 3, true]],
					(value) => value ? 'x' : null),
				renderRowContainer: ({ rowIndex, children }: { rowIndex: number, children: React.ReactNode }) => (
					e('tr', 
						{
							style: {
								backgroundColor: rowIndex === -1 ? 'lightgreen' : 'green'
							}
						},
						children)
				),
				renderCellContainer: ({ columnIndex, rowIndex, children }: { columnIndex: number, rowIndex: number, children: React.ReactNode }) => {
					if (rowIndex === -1 && columnIndex === -1) {
						return e('th', 
							{
								style: {
									backgroundColor: 'white',
								}
							},
							children);
					}
					if (rowIndex === -1) {
						return e('th', 
							{
								style: {
									backgroundColor: 'lightblue',
								}
							},
							children);
					}
					if (columnIndex === -1) {
						return e('th', 
							{
								style: {
									backgroundColor: 'lightpink',
								}
							},
							children);
					}
					return e('td', 
						{
							style: {
								backgroundColor: columnIndex % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0)'
							}
						},
						children);
				},
			})
	})

