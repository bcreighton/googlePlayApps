import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Application from './Application'

describe('Application tests', () => {
  it('renders an application', () => {
    const wrapper = shallow(<Application />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})