import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { RoutingMatrix } from '../src/RoutingMatrix';

const e = React.createElement;

storiesOf('RoutingMatrix', module)
	.add('basic', () => 
		e(RoutingMatrix,
			{
				rows: ['oscillator', 'delay', 'low-pass filter'],
				columns: ['osc output', 'something else', 'something else', 'something else'],
				values: [[0, 0], [0, 1], [2, 0], [2, 3]]
			}))
