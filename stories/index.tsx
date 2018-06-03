import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { RoutingMatrix } from '../src/RoutingMatrix';
import './index.css';

const e = React.createElement;

storiesOf('RoutingMatrix', module)
	.add('basic', () => 
		e(RoutingMatrix,
			{
				rows: ['oscillator', 'delay', 'low-pass filter'],
				columns: ['osc output', 'something else', 'something else', 'something else'],
				values: [[0, 0], [0, 1], [2, 0], [2, 3]],
			}))
	.add('styled', () => 
		e(RoutingMatrix,
			{
				rows: ['Oscillator', 'Delay', 'Low-pass filter'],
				columns: ['Osc output', 'Something else', 'Something else', 'Something else'],
				values: [[0, 0], [0, 1], [2, 0], [2, 3]],
				classNames: {
					matrix: 'styled-routing-matrix',
					row: 'styled-row',
					header: 'styled-header',
					rowHeaderCell: 'styled-row-header-cell',
					columnHeaderCell: 'styled-column-header-cell',
					cell: 'styled-cell',
					cellContent: 'styled-cell-content',
					crossAxisCell: 'styled-cross-axis-cell',
				}
			}))
	.add('custom cell rendering', () => 
		e(RoutingMatrix,
			{
				rows: ['oscillator', 'delay', 'low-pass filter'],
				columns: ['osc output', 'something else', 'something else', 'something else'],
				values: [[0, 0], [0, 1], [2, 0], [2, 3]],
				renderCell: (value: boolean, row: number, column: number) =>
				e('span',
					{},
					`(${row}, ${column}): ${value}`)
			}))

