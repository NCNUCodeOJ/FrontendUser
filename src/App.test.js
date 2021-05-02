import React from 'react';
import { shallow } from 'enzyme/build'
import App from './App'
import Page404 from 'src/views/pages/page404/Page404.js'
import Register from 'src/views/user/register/Register.js'

jest.mock('react-redux', () => ({
  useSelector: jest.fn().mockImplementation(selector => selector()),
})); // Closing bracket was missing so updated

it('mounts App without crashing', () => {
  const wrapper = shallow(<App/>)
  wrapper.unmount()
})

it('mounts Page404 without crashing', () => {
  const wrapper = shallow(<Page404 />);
  wrapper.unmount()
})

it('mounts Register without crashing', () => {
  const wrapper = shallow(<Register />);
  wrapper.unmount()
})
