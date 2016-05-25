import React from 'react'
import TestUtils from 'react/lib/ReactTestUtils'
import expect from 'expect'
import Root from '../components/Root/Root'

describe('root', () => {
	it('renders without problems', () => {
		var root = TestUtils.renderIntoDocument(<Root/>)
		expect(root).toExist()
	})
})